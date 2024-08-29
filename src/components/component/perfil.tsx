"use client";

import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Producto {
  IdProducto: string;
  NombreProducto: string;
  DescripcionProducto: string;
  StockProducto: string;
  PrecioProducto: string;
  FotoProductoURL: string;
  DireccionPersona: string;
  tiendas: any[];
}

export function ProductosTienda() {
  const router = useRouter();
  const { IdTienda } = router.query;

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (IdTienda && typeof IdTienda === 'string') { // Verifica que IdTienda sea una cadena
      const fetchProductos = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/tienda/producto/${IdTienda}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: Producto[] = await response.json();
          setProductos(data);
        } catch (error: any) {
          setError(error.message || 'An unexpected error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchProductos();
    }
  }, [IdTienda]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 py-12">
      {productos.map((producto) => (
        <div key={producto.IdProducto} className="relative overflow-hidden rounded-lg group">
          <Link href={`/producto/${producto.IdProducto}`} className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img
            src={producto.FotoProductoURL || "/placeholder.svg"}
            alt={producto.NombreProducto}
            width={400}
            height={400}
            className="object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-semibold">{producto.NombreProducto}</h3>
            <p className="text-sm text-muted-foreground">{producto.DescripcionProducto}</p>
            <h4 className="text-base font-semibold">${producto.PrecioProducto}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
