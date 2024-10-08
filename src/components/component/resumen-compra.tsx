"use client";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NextCrypto from 'next-crypto';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

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
  const [total, setTotal] = useState(0);
  const params = useParams();
  const encryptedIdPedido = params.IdPedido as string;
  const crypto = new NextCrypto('secret key'); // Usa una clave secreta segura
  const router = useRouter(); // Para redirección después de la compra

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
        setTotal(totalCompra);
      } catch (error) {
        console.error('Error al obtener productos:', error);
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

      const response = await axios.post("http://localhost:4000/api/confirmarpedido", {
        IdPedido: decryptedId,
        Total: total.toFixed(2),
        IdPersona: IdPersona,
      });

      if (response.status === 200) {
        alert('Compra confirmada con éxito');
        router.push("/"); // Redirige a la página principal
      } else {
        alert('Hubo un problema al confirmar la compra');
      }
    } catch (error) {
      console.error('Error al confirmar la compra:', error);
      alert('Error al confirmar la compra');
    }
  };

  return (
    <div className="bg-background p-6 md:p-8 lg:p-10">
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
                <TableCell className="hidden md:table-cell">${producto.PrecioProducto}</TableCell>
                <TableCell className="hidden md:table-cell">
                  ${producto.cantidad * parseFloat(producto.PrecioProducto)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between mt-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">${total.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Button onClick={handleConfirmarCompra} className="self-center">
          Confirmar compra
        </Button>
      </div>
    </div>
  );
}
