import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface Producto {
  IdProducto: number;
  NombreProducto: string;
  PrecioProducto: number;
  cantidad: number;
  FotoProductoURL?: string;
}

interface HistorialProps {
  idPedido: string | string[]; // Asegúrate de que el tipo sea correcto
}

export function Historial({ idPedido }: HistorialProps) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (idPedido) {
      const fetchProductos = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/pedido/${idPedido}`);
          if (!response.ok) {
            throw new Error("Error al obtener los productos del pedido");
          }
          const data: Producto[] = await response.json();
          setProductos(data);
        } catch (error) {
          console.error("Error en fetchProductos:", error);
          setError("Error al cargar los productos del pedido");
        }
      };

      fetchProductos();
    } else {
      console.log("idPedido no está definido");
    }
  }, [idPedido]);

  if (error) return <p>Error: {error}</p>;

  const formatPrice = (precio: string) => {
    // Convertir el precio a número y formatearlo con puntos de miles
    const numero = Number(precio);
    return new Intl.NumberFormat('es-ES').format(numero);
  };

  return (
    <Card className="m-12">
      <CardHeader>
        <CardTitle>Historial de compras</CardTitle>
        <CardDescription>Detalles de tus compras anteriores.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Imagen</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.IdProducto}>
                <TableCell className="hidden sm:table-cell">
                  <img
                    src={producto.FotoProductoURL || "/placeholder.svg"}
                    alt={producto.NombreProducto}
                    width={64}
                    height={64}
                    className="aspect-square rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{producto.NombreProducto}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell>${formatPrice((producto.PrecioProducto * producto.cantidad).toFixed(2))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center">
          <div className="text-muted-foreground">Total de la compra:</div>
          <div className="font-medium">${formatPrice(productos.reduce((total, producto) => total + (producto.PrecioProducto * producto.cantidad), 0).toFixed(2))}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
