"use client";

import NextCrypto from 'next-crypto'; // Asegúrate de tener esta importación
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

export function Tiendas() {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [encryptedIds, setEncryptedIds] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string>("");
  const crypto = new NextCrypto('secret key'); // Reemplaza 'secret key' con tu clave secreta

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/tienda`);
        if (response.ok) {
          const data: Tienda[] = await response.json();
          setTiendas(data);

          // Encriptar IDs
          const encrypted = await Promise.all(data.map(async (tienda) => {
            const encryptedId = await crypto.encrypt(tienda.IdTienda);
            // Reemplazar caracteres en el ID encriptado
            const safeEncryptedId = encryptedId.replace(/\//g, '_').replace(/\+/g, '-');
            return {
              id: tienda.IdTienda,
              encryptedId: safeEncryptedId
            };
          }));

          setEncryptedIds(encrypted.reduce<{ [key: string]: string }>((acc, { id, encryptedId }) => {
            acc[id] = encryptedId;
            return acc;
          }, {}));
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
      <div className="container mx-auto px-4 md:px-6 lg:px-7">
        <h2 className="text-2xl font-bold mb-5">Tiendas</h2>
      </div>
      <section className="container mx-auto px-4 md:px-6 lg:px-7 grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 md:p-6">
        {tiendas.map((tienda) => (
          <Link key={tienda.IdTienda} href={`/shop/${encryptedIds[tienda.IdTienda] || ''}`}>
            <div className="relative overflow-hidden rounded-lg group">
              <div className="absolute inset-0 z-10">
                <span className="sr-only">Ver tienda</span>
              </div>
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
                <p className="text-sm text-muted-foreground">Dirección: {tienda.DireccionTienda}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
