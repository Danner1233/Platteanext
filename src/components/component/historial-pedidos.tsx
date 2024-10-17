"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import {jwtDecode} from "jwt-decode"; // Asegúrate de tener instalada esta librería

interface Articulo {
  nombre: string;
  cantidad: number;
  // No es necesario incluir precio aquí ya que no lo estás usando
}

interface Pedido {
  IdPedido: number;
  IdPersonaFK: number;
  Direccion: string;
  Ciudad: string;
  FechaPedido: string; // Cambiado a FechaPedido
  Total: string; // Cambiado a Total
  articulos?: Articulo[]; // Opcional si no tienes artículos
}

interface DecodedToken {
  IdPersona: string;
}

export function HistorialPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("token"); // Asumiendo que el JWT está en el local storage
        console.log("Token:", token); // Log del token

        if (!token) {
          throw new Error("No hay token disponible.");
        }

        const decoded: DecodedToken = jwtDecode(token); // Decodificar el JWT
        const idPersona = decoded.IdPersona; // Obtener el IdPersona
        console.log("IdPersona:", idPersona); // Log del IdPersona

        const response = await fetch(`http://localhost:4000/api/pedidopersona/${idPersona}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en los headers
          },
        });

        console.log("Response:", response); // Log de la respuesta

        if (!response.ok) {
          throw new Error("Error al obtener los pedidos");
        }

        const data: Pedido[] = await response.json(); // Tipar la respuesta
        console.log("Datos de pedidos:", data); // Log de los datos de pedidos
        setPedidos(data);
      } catch (error) {
        console.error("Error en fetchPedidos:", error); // Log del error
        setError("Error al cargar los pedidos");
      }
    };

    fetchPedidos();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full">
      <Card className="h-full">
        <CardHeader className="px-7 md:px-10">
          <Link href="#" className="font-medium" prefetch={false}>
            Historial de Pedidos
          </Link>
          <CardDescription>
            <Link href="#" className="font-medium" prefetch={false}>
              Todos tus pedidos realizados.
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          <Table className="h-full w-full">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Link href="#" className="font-medium" prefetch={false}>
                    Fecha del Pedido
                  </Link>
                </TableHead>
                <TableHead>
                  <Link href="#" className="font-medium" prefetch={false}>
                    Número de Pedido
                  </Link>
                </TableHead>
                <TableHead>
                  <Link href="#" className="font-medium" prefetch={false}>
                    Artículos
                  </Link>
                </TableHead>
                <TableHead className="text-right">
                  <Link href="#" className="font-medium" prefetch={false}>
                    Total
                  </Link>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow key={pedido.IdPedido} className="cursor-pointer">
                  <TableCell>
                    <Link href="/historial" className="font-medium" prefetch={false}>
                      {new Date(pedido.FechaPedido).toLocaleDateString()} {/* Cambiado a FechaPedido */}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href="/historial" className="font-medium" prefetch={false}>
                      {pedido.IdPedido} {/* Cambiado a IdPedido */}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href="/historial" className="font-medium" prefetch={false}>
                      {pedido.articulos && Array.isArray(pedido.articulos) 
                        ? pedido.articulos.map(articulo => `${articulo.nombre} x ${articulo.cantidad}`).join(", ")
                        : "No hay artículos"}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href="/historial" className="font-medium" prefetch={false}>
                      ${parseFloat(pedido.Total).toFixed(2)} {/* Convertir Total a número y formatear */}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
