"use client";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NextCrypto from 'next-crypto';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Separator } from "@/components/ui/separator";

interface Producto {
  IdProducto: string;
  NombreProducto: string;
  DescripcionProducto: string;
  PrecioProducto: string;
  FotoProductoURL: string;
  NombreTienda: string;
  PromedioCalificacion: number;
  cantidad: number; // Incluye este campo según el JSON original
}

interface JWTDecoded {
  IdPersona: number;
}

export function ResumenCompra() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Estado de la alerta
  const params = useParams();
  const encryptedIdPedido = params.IdPedido as string;
  const crypto = new NextCrypto('secret key'); // Usa una clave secreta segura
  const router = useRouter(); // Para redirección después de la compra

  const Alert = ({ message, onClose }: { message: string, onClose: () => void }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          onClose(); // Llamar a la función onClose después de que la alerta se oculte
        }, 300); // Esperar que termine la animación antes de remover el alert
      }, 3000);

      return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) return null;

    return (
      <div
        className={`fixed top-4 right-4 bg-platteaGreenv2 text-white p-4 rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out ${
          isExiting ? 'animate-fade-out' : 'animate-fade-in'
        }`}
      >
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button
            onClick={() => {
              setIsExiting(true);
              setTimeout(() => {
                setIsVisible(false);
                onClose();
              }, 300);
            }}
            className="text-white ml-2"
          >
            &times; {/* Este es el carácter para la X */}
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Reemplazar caracteres en el ID encriptado antes de decodificar
        const safeIdPedido = encryptedIdPedido.replace(/_/g, '/').replace(/-/g, '+');
        // Decodificar el ID encriptado
        const decodedId = decodeURIComponent(safeIdPedido);
        // Desencriptar el ID del pedido
        const decryptedId = await crypto.decrypt(decodedId);
        const response = await fetch(`http://localhost:4000/api/pedido/${decryptedId}`);
        const data: Producto[] = await response.json();
        setProductos(data);

        // Calcular el total de la compra
        const totalCompra = data.reduce(
          (acc, producto) => acc + producto.cantidad * parseFloat(producto.PrecioProducto),
          0
        );

      } catch (error) {
        console.error('Error al obtener productos:', error);
        setAlertMessage('Error al obtener los productos'); // Mostrar alerta de error
      }
    };

    if (encryptedIdPedido) {
      fetchProductos();
    }
  }, [encryptedIdPedido]);

  const handleConfirmarCompra = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken: JWTDecoded = jwtDecode(token);
      const IdPersona = decodedToken.IdPersona;
      const safeIdPedido = encryptedIdPedido.replace(/_/g, '/').replace(/-/g, '+');
      const decodedId = decodeURIComponent(safeIdPedido);
      const decryptedId = await crypto.decrypt(decodedId);
      console.log(total.toFixed(2))
      const response = await axios.post("http://localhost:4000/api/confirmarpedido", {
        IdPedido: decryptedId,
        Total: total.toFixed(2),
        IdPersona: IdPersona,
      });

      if (response.status === 200) {
        setAlertMessage('Compra confirmada con éxito');
        setTimeout(() => {
          router.push("/"); // Redirige a la página principal
        }, 3000); // Esperar antes de redirigir
      } else {
        setAlertMessage('Hubo un problema al confirmar la compra');
      }
    } catch (error) {
      console.error('Error al confirmar la compra:', error);
      setAlertMessage('Error al confirmar la compra');
    }
  };

  const subtotal = productos.reduce(
    (acc, item) => acc + parseFloat(item.PrecioProducto) * item.cantidad,
    0
  );
  const shipping = 15000 * productos.length;
  const total = subtotal + shipping;

  const isEmpty = productos.length === 0;

  const formatPrice = (precio: string) => {
    const numero = Number(precio);
    return new Intl.NumberFormat("es-ES").format(numero);
  };
  return (
    <div className="bg-background p-6 md:p-8 lg:p-10">
      {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
      <h1 className="mb-6 text-2xl font-bold">Resumen de la compra</h1>
      <div className="overflow-hidden rounded-lg border">
      
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead className="hidden md:table-cell">Precio unitario</TableHead>
              <TableHead className="hidden md:table-cell">Precio total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.IdProducto}>
                <TableCell className="hidden w-[100px] sm:table-cell">
                  <img src={producto.FotoProductoURL} alt={producto.NombreProducto} className="w-[100px] h-[100px] object-cover rounded" />
                </TableCell>
                <TableCell>{producto.NombreProducto}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell className="hidden md:table-cell">${formatPrice(producto.PrecioProducto)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  ${formatPrice(producto.cantidad * parseFloat(producto.PrecioProducto))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between mt-6">
        <Card className="w-full md:w-1/3">
        <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${formatPrice(subtotal.toFixed(2))}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span className="font-medium">${formatPrice(shipping.toFixed(2))}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${formatPrice(total.toFixed(2))}</span>
            </div>
        </Card>
        <Button onClick={handleConfirmarCompra} className="self-center">
          Confirmar compra
        </Button>
      </div>
    </div>
  );
}
