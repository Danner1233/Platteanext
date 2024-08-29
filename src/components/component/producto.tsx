"use client"

import Image from "next/image";
import { useParams } from 'next/navigation';
import { useState, useEffect, JSX, SVGProps, SetStateAction } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface Producto {
  IdProducto: string;
  NombreProducto:  string;
  DescripcionProducto: string;
  PrecioProducto: string;
  FotoProductoURL: string;
}
export function Producto() {
  const params = useParams(); 
  const idProducto = params.IdProducto; 

  const [producto, setProducto] = useState<Producto | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(`http://localhost:4000/api/producto/${idProducto}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: Producto = await response.json();
          setProducto(data);
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
  if (!producto) return <p>Cargando...</p>;

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
              alt="Banner Producto"
              width={768}
              height={768}
              className="w-full h-full object-cover "
              style={{ aspectRatio: "768/192", objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{producto.NombreProducto}</h2>
            <p className="text-muted-foreground">{producto.DescripcionProducto}</p>
            <h3 className="text-3xl font-bold">${producto.PrecioProducto}</h3>
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
  )
}