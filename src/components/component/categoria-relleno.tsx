"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import NextCrypto from 'next-crypto';

interface Tienda {
  IdTienda: string;
  NombreTienda: string;
  DescripcionTienda: string;
  DireccionTienda: string;
  MiniaturaTienda: string;
  CiudadTienda: string;
}

interface Categoria {
  IdCategoria: number;
  NombreCategoria: string;
  FotoCategoria: string | null;
}

export function CategoriaRelleno() {
  const params = useParams();
  const router = useRouter();
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [nombreCategoria, setNombreCategoria] = useState<string>("");
  const [encryptedTiendas, setEncryptedTiendas] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string>("");
  const encryptedCategoriaId = params.IdCategoria as string;
  const crypto = new NextCrypto('secret key'); // Cambia 'secret key' por tu clave real

  useEffect(() => {
    const fetchTiendas = async () => {
      console.log("encryptedCategoriaId:", encryptedCategoriaId);

      if (!encryptedCategoriaId) {
        setError("No se proporcionó un ID de categoría.");
        return;
      }

      try {
        // Decodificar y desencriptar el ID de la categoría
        const safeIdCategoria = encryptedCategoriaId.replace(/_/g, '/').replace(/-/g, '+');
        const decodedId = decodeURIComponent(safeIdCategoria);
        const decryptedId = await crypto.decrypt(decodedId);
        console.log("ID desencriptado:", decryptedId);

        // Fetch tiendas por categoría
        const tiendasResponse = await fetch(`${process.env.SERVER_URL}/api/tienda/obtenerPorCategoria/${decryptedId}`);
        if (!tiendasResponse.ok) {
          throw new Error(`Error al obtener tiendas. Status: ${tiendasResponse.status}`);
        }
        const tiendasData: Tienda[] = await tiendasResponse.json();
        setTiendas(tiendasData);

        // Encriptar los IDs de las tiendas
        const encryptedIds = await Promise.all(
          tiendasData.map(async (tienda) => {
            const encryptedId = await crypto.encrypt(tienda.IdTienda);
            return {
              id: tienda.IdTienda,
              encryptedId: encryptedId.replace(/\//g, '_').replace(/\+/g, '-'),
            };
          })
        );

        const encryptedTiendasObj = encryptedIds.reduce((acc, { id, encryptedId }) => {
          acc[id] = encryptedId;
          return acc;
        }, {} as { [key: string]: string });

        setEncryptedTiendas(encryptedTiendasObj);

        // Fetch detalles de la categoría
        const categoriaResponse = await fetch(`${process.env.SERVER_URL}/api/categoria/${decryptedId}`);
        if (!categoriaResponse.ok) {
          throw new Error(`Error al obtener la categoría. Status: ${categoriaResponse.status}`);
        }
        const categoriaData: Categoria = await categoriaResponse.json();
        setNombreCategoria(categoriaData.NombreCategoria);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos.");
      }
    };

    fetchTiendas();
  }, [encryptedCategoriaId]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Categoría: {nombreCategoria || "Cargando..."}
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tiendas.map((tienda) => (
          <Link
            key={tienda.IdTienda}
            href={`/shop/${encryptedTiendas[tienda.IdTienda] || ''}`} // Enlace encriptado
            prefetch={false}
          >
            <div className="relative flex flex-col overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={`${process.env.SERVER_URL}/${tienda.MiniaturaTienda}`}
                  alt={tienda.NombreTienda}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col justify-between p-4 bg-background h-full">
                <h3 className="text-xl font-bold mb-2 truncate">{tienda.NombreTienda}</h3>
                <p className="text-sm text-muted-foreground h-16 overflow-hidden">
                  {tienda.DescripcionTienda}
                </p>
                <p className="text-sm mt-2">{tienda.DireccionTienda}</p>
                <p className="text-sm">{tienda.CiudadTienda}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
