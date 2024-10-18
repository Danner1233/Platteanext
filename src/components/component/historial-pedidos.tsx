import { useEffect, useState } from "react";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { jwtDecode } from "jwt-decode";

interface Articulo {
  nombre: string;
  cantidad: number;
  precio: number;
  imagen: string; // Asegúrate de que esta propiedad esté en el objeto artículo
}

interface Pedido {
  IdPedido: number;
  IdPersonaFK: number;
  Direccion: string;
  Ciudad: string;
  FechaPedido: string; 
  Total: string; 
  articulos?: string; // Cambiado a string para reflejar el resultado de GROUP_CONCAT
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
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No hay token disponible.");
        }

        const decoded: DecodedToken = jwtDecode(token);
        const idPersona = decoded.IdPersona;

        const response = await fetch(`http://localhost:4000/api/pedidopersona/${idPersona}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los pedidos");
        }

        const data: Pedido[] = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error en fetchPedidos:", error);
        setError("Error al cargar los pedidos");
      }
    };

    fetchPedidos();
  }, []);

  if (error) return <p>Error: {error}</p>;

  
  const formatPrice = (precio: string) => {
    // Convertir el precio a número y formatearlo con puntos de miles
    const numero = Number(precio);
    return new Intl.NumberFormat('es-ES').format(numero);
  };

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
                <TableHead>Fecha del Pedido</TableHead>
                <TableHead>Número de Pedido</TableHead>
                <TableHead>Artículos</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
  {pedidos.map((pedido) => (
    <TableRow key={pedido.IdPedido} className="cursor-pointer">
      <TableCell>
        <Link href={`/historial/${pedido.IdPedido}`} className="font-medium" prefetch={false}>
          {new Date(pedido.FechaPedido).toLocaleDateString()}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/historial/${pedido.IdPedido}`} className="font-medium" prefetch={false}>
          {pedido.IdPedido}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/historial/${pedido.IdPedido}`} className="font-medium" prefetch={false}>
          {pedido.articulos || "No hay artículos"}
        </Link>
      </TableCell>
      <TableCell className="text-right">
        <Link href={`/historial/${pedido.IdPedido}`} className="font-medium" prefetch={false}>
          ${formatPrice(parseFloat(pedido.Total).toFixed(2))}
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
