"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NextCrypto from 'next-crypto'; // Asegúrate de tener esta importación
import { useEffect, useState, JSX, SVGProps } from "react";
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
  const [filteredTiendas, setFilteredTiendas] = useState<Tienda[]>([]);
  const [search, setSearch] = useState('');
  const [encryptedIds, setEncryptedIds] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string>("");
  const crypto = new NextCrypto('secret key');

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/tienda`);
        if (response.ok) {
          const data: Tienda[] = await response.json();
          setTiendas(data);
          setFilteredTiendas(data);

          // Encriptar IDs
          const encrypted = await Promise.all(data.map(async (tienda) => {
            const encryptedId = await crypto.encrypt(tienda.IdTienda);
            const safeEncryptedId = encryptedId.replace(/\//g, '_').replace(/\+/g, '-');
            console.log(`Original ID: ${tienda.IdTienda}, Encrypted ID: ${safeEncryptedId}`); // Console log para verificar
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

  useEffect(() => {
    const filtered = tiendas.filter((tienda) =>
      tienda.NombreTienda.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTiendas(filtered);
  }, [search, tiendas]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-7">
      <h2 className="text-2xl font-bold mb-5">Tiendas</h2>
      <Busqueda search={search} setSearch={setSearch} />
      <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 md:p-6">
        {filteredTiendas.map((tienda) => (
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

function Busqueda({ search, setSearch }: { search: string; setSearch: (value: string) => void }) {
  return (
    <div className="flex w-full max-w-md m-8">
      <Input
        type="search"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 h-10 px-4 py-2 text-sm rounded-l-md border border-r-0 border-input focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="h-10 px-3 rounded-r-md border border-input focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <SearchIcon className="w-5 h-5 text-muted-foreground" />
      </Button>
    </div>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
