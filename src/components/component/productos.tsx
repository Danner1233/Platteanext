"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Producto {
  IdProducto: string;
  NombreProducto: string;
  DescripcionProducto: string;
  PrecioProducto: number;
  FotoProductoURL: string;
}

export function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/producto`); // Actualiza esta URL según tu API
        if (response.ok) {
          let data: Producto[] = await response.json();

          // Mezclar los productos antes de guardarlos en el estado
          data = mezclarArray(data);
          setProductos(data);
        } else {
          throw new Error("Error al obtener los productos");
        }
      } catch (error) {
        console.error(error);
        setError("Error al obtener los productos");
      }
    };

    fetchProductos();
  }, []);

  // Función para mezclar un array usando Fisher-Yates (mezcla aleatoria)
  function mezclarArray(array: Producto[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Función para truncar el texto con puntos suspensivos
  const truncarTexto = (texto: string, maxLength: number) => {
    return texto.length > maxLength
      ? texto.substring(0, maxLength) + "..."
      : texto;
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-5">Productos</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productos.map((producto) => (
          <Link key={producto.IdProducto} href={`/product/${producto.IdProducto}`} prefetch={false}>
            <div className="relative flex flex-col overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={producto.FotoProductoURL}
                  alt={producto.NombreProducto}
                  width={500}
                  height={400}
                  className="object-cover w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-col justify-between p-4 bg-background h-full">
                <div className="flex-1">
                  {/* Limitar la altura del contenedor del nombre para que sea uniforme */}
                  <h3 className="text-xl font-bold mb-2 truncate">{truncarTexto(producto.NombreProducto, 50)}</h3>
                  {/* Limitar la altura del contenedor de la descripción para que sea uniforme */}
                  <p className="text-sm text-muted-foreground h-16 overflow-hidden overflow-ellipsis">
                    {truncarTexto(producto.DescripcionProducto, 100)}
                  </p>
                </div>
                <h4 className="text-lg font-semibold md:text-xl mt-2">${producto.PrecioProducto}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
