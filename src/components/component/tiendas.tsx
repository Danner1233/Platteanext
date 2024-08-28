"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Tienda {
  IdTienda: string;
  NombreTienda: string;
  DescripcionTienda: string;
  DireccionTienda: string;
  MiniaturaTiendaURL: string;
  CiudadTienda: string;
  
}

export function Tiendas() {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(`http://localhost:4000/api/tienda`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          console.log(response)
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
    <div>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Tiendas</h2>
      </div>
      <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 md:p-6">
        {tiendas.map((tienda) => (
          <div key={tienda.IdTienda} className="relative overflow-hidden rounded-lg group">
            <Link href={`/shop/${tienda.IdTienda}`} className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">Ver tienda</span>
            </Link>
            <Image
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
              <p className="text-sm text-muted-foreground">Ubicación: {tienda.DireccionTienda}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
