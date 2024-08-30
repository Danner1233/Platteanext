"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
interface Tienda {
  IdTienda: string;
  NombreTienda: string;
  DescripcionTienda: string;
  DireccionTienda: string;
  MiniaturaTiendaURL: string;
  CiudadTienda: string;
}


export function CategoriaBelleza() {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/tienda/belleza`);
        if (response.ok) {
          const data: Tienda[] = await response.json();
          setTiendas(data);
        } else {
          throw new Error("Error fetching tiendas");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch tiendas data.");
      }
    };

    fetchTiendas();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Belleza</h2>
        <div>
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-5">Tiendas</h2>
          </div>
          <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 md:p-6">
            {tiendas.map((tienda) => (
              <Link key={tienda.IdTienda} href={`/tiendas/${tienda.IdTienda}`}>
                <div className="relative overflow-hidden rounded-lg group">
                  <Link href={`/shop/${tienda.IdTienda}`} className="absolute inset-0 z-10" prefetch={false}>
                    <span className="sr-only">Ver tienda</span>
                  </Link>
                  <img
                    src={tienda.MiniaturaTiendaURL}
                    alt={tienda.NombreTienda}
                    width={400}
                    height={300}
                    className="object-cover w-full h-60"
                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                  />
                  <div className="p-4 bg-background">
                    <h3 className="text-lg font-semibold md:text-xl">{tienda.NombreTienda}</h3>
                    <p className="text-sm text-muted-foreground">Ciudad: {tienda.CiudadTienda}</p>
                    <p className="text-sm text-muted-foreground">Direccion: {tienda.DireccionTienda}</p>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </div>

      </div>
    </section>
  )
}
