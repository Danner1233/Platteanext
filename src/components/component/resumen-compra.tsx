"use client";


import { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const productos = [
  { id: 1, nombre: 'Producto 1', cantidad: 2, precioUnitario: 19.99, imagen: '/placeholder.svg' },
  { id: 2, nombre: 'Producto 2', cantidad: 1, precioUnitario: 29.99, imagen: '/placeholder.svg' },
  { id: 3, nombre: 'Producto 3', cantidad: 3, precioUnitario: 9.99, imagen: '/placeholder.svg' },
];

export function ResumenCompra() {
  const [total, setTotal] = useState(
    productos.reduce((acc, producto) => acc + (producto.cantidad * producto.precioUnitario), 0)
  );

  const handleConfirmarCompra = async () => {
    try {
      // Aquí realizarás una solicitud POST al backend para confirmar la compra.
      // Reemplaza la URL con la ruta adecuada de tu backend.
      const response = await fetch('/api/confirmar-compra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productos, total }),
      });

      if (response.ok) {
        // Manejo de éxito
        alert('Compra confirmada con éxito');
        // Redirigir o realizar alguna acción adicional
      } else {
        // Manejo de error
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
              <TableRow key={producto.id}>
                <TableCell className="hidden sm:table-cell">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    width={80}
                    height={80}
                    className="aspect-square rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{producto.nombre}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell className="hidden md:table-cell">${producto.precioUnitario.toFixed(2)}</TableCell>
                <TableCell className="hidden md:table-cell">${(producto.cantidad * producto.precioUnitario).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total a pagar</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">${total.toFixed(2)}</CardContent>
        </Card>
      </div>
      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={handleConfirmarCompra}>Confirmar compra</Button>
      </div>
    </div>
  );
}
