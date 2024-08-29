"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  IdPersona: string;
}

interface Tienda {
  IdTienda: string;
  NombreTienda: string;
  DescripcionTienda: string;
  DireccionTienda: string;
  MiniaturaTiendaURL: string;
  CiudadTienda: string;
}

export function ProductosPerfil() {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.IdPersona;

        const response = await fetch(`http://localhost:4000/api/persona/tienda/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid max-w-5xl items-center justify-center gap-4 px-4 md:gap-8 md:px-6 lg:grid-cols-1 lg:text-left xl:max-w-6xl xl:gap-10">
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mis Tiendas</h2>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {tiendas.map((tienda) => (
            <Link key={tienda.IdTienda} href={`/shop/${tienda.IdTienda}`}>
            <div key={tienda.IdTienda} className="relative group overflow-hidden rounded-lg">
              <Image
                src={tienda.MiniaturaTiendaURL || "/placeholder.svg"}
                width={400}
                height={400}
                alt={tienda.NombreTienda}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                style={{ aspectRatio: "400/400", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold mb-2">{tienda.NombreTienda}</h3>
                <p className="text-sm">{tienda.DescripcionTienda}</p>
              </div>
            </div>
            </Link>
            
          ))}
          <div className="relative group overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg"
              width={400}
              height={400}
              alt="Agregar Tienda"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              style={{ aspectRatio: "400/400", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white opacity-100 transition-opacity duration-300">
              <Link
                href="#"
                className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/80"
                prefetch={false}
              >
                +
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
