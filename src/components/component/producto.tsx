"use client"

import { useState, useEffect, JSX, SVGProps, SetStateAction } from "react";
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Producto {
  IdProducto: string;
  NombreProducto: string;
  DescripcionProducto: string;
  PrecioProducto: string;
  FotoProductoURL: string;
  NombreTienda: string;
}

export function Producto() {
  const params = useParams();
  const idProducto = params.IdProducto;

  const [producto, setProducto] = useState<Producto | null>(null);
  const [rating, setRating] = useState(3);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        

        const response = await fetch(`http://localhost:4000/api/producto/${idProducto}`, {

        });

        if (response.ok) {
          const data: Producto = await response.json();
          setProducto(data);
          setIsLoaded(true);
        } else {
          throw new Error("Error fetching product");
        }
      } catch (error) {
        console.error(error);
        setError("Error al obtener el producto");
      }
    };

    fetchProducto();
  }, [idProducto]);

  if (error) return <p>Error: {error}</p>;
  if (!isLoaded || !producto) return <p>Cargando...</p>;

  const handleRatingChange = (value: SetStateAction<number>) => {
    setRating(value);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-background shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Detalles del Producto</h1>
        </div>
      </header>
      <div className="flex items-center justify-center px-4 md:px-6 py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src={producto.FotoProductoURL}
              alt="Product Image"
              width={600}
              height={600}
              className="w-full rounded-lg"
              style={{ aspectRatio: "600/600", objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{producto.NombreProducto}</h2>
            <p className="text-muted-foreground">{producto.NombreTienda}</p>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-5 h-5 cursor-pointer ${star <= rating ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </div>
            <p className="text-muted-foreground">{producto.DescripcionProducto}</p>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h3 className="text-3xl font-bold">${producto.PrecioProducto}</h3>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button>Añadir al carrito</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
