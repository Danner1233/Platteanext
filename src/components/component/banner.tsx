"use client";
import Image from "next/image";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Tienda {
  NombreTienda: string;
  BannerTiendaURL: string;
}

export function Banner() {
  const params = useParams();
  const idTienda = params.IdTienda;

  const [tienda, setTienda] = useState<Tienda | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (idTienda) {
      const fetchTienda = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/tienda/${idTienda}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: Tienda = await response.json();
          setTienda(data);
        } catch (error: any) {
          setError(error.message || 'An unexpected error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchTienda();
    }
  }, [idTienda]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-full">
      <div className="relative w-full h-64"> {/* Ajusta la altura según lo que consideres apropiado */}
        <Image
          src={tienda?.BannerTiendaURL || '/default-banner.jpg'} // Usar una URL por defecto si no se encuentra la imagen
          alt="Banner Image"
          layout="fill" // Ocupar todo el contenedor
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ aspectRatio: "16/9", objectFit: "cover" }} // Ajusta la proporción según sea necesario
        />
      </div>
      <div className="flex flex-col items-center justify-center py-6 md:py-8 lg:py-10">
        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">{tienda?.NombreTienda || 'Nombre de Tienda'}</h1>
      </div>
    </section>
  );
}
