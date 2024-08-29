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
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]">
        <Image
          src={tienda?.BannerTiendaURL || '/default-banner.jpg'} // Usar una URL por defecto si no se encuentra la imagen
          alt="Banner Image"
          layout="fill" // Ocupar todo el contenedor
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ aspectRatio: "1920/720", objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col items-center justify-center py-11 md:py-10 lg:py-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">{tienda?.NombreTienda || '/default-banner.jpg'}</h1>
      </div>
    </section>

  );
}
