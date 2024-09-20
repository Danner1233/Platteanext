"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import axios from 'axios';
import NextCrypto from 'next-crypto';

// Interfaz para el producto
interface Producto {
  IdProducto: number;
  NombreProducto: string;
  DescripcionProducto: string;
  PrecioProducto: string;
  FotoProductoURL: string;
}

// Interfaz para las props del componente
interface ProductosProductoProps {
  encryptedIdProducto: string; // Define el tipo como string
}

export function ProductosProducto({ encryptedIdProducto }: ProductosProductoProps) {
  const [productosSimilares, setProductosSimilares] = useState<Producto[]>([]);
  const crypto = new NextCrypto('secret key');

  useEffect(() => {
    const fetchProductosSimilares = async () => {
      try {
        const safeIdProducto = encryptedIdProducto.replace(/_/g, '/').replace(/-/g, '+');
        const decodedId = decodeURIComponent(safeIdProducto);
        const decryptedId = await crypto.decrypt(decodedId);

        const response = await axios.get(`http://localhost:4000/api/productos-similares/${decryptedId}`);
        const productos = Array.isArray(response.data) ? response.data : [];
        setProductosSimilares(productos);
      } catch (error) {
        console.error('Error al obtener productos similares:', error);
      }
    };

    if (encryptedIdProducto) {
      fetchProductosSimilares();
    }
  }, [encryptedIdProducto]);

  const truncarTexto = (texto: string, maxLength: number) => {
    return texto.length > maxLength
      ? texto.substring(0, maxLength) + "..."
      : texto;
  };

  return (
    <div className="w-full mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Productos Similares</h2>
      <Carousel
        autoplay={true}
        className="w-full"
        infinite={true}
        autoplayInterval={3000}
      >
        <CarouselContent className="-ml-4">
          {productosSimilares.length > 0 ? (
            productosSimilares.map((producto: Producto) => (
              <CarouselItem key={producto.IdProducto} className="pl-4 w-full sm:basis-2/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"> {/* Ajustes de tamaño responsivo */}
                <Card className="h-full">
                  <CardContent className="flex flex-col p-0">
                    <div className="relative pt-[80%] w-full">
                      <Link href={`/producto/${producto.IdProducto}`} className="absolute inset-0 z-10" prefetch={false}>
                        <span className="sr-only">Ver</span>
                      </Link>
                      <img 
                        src={producto.FotoProductoURL || "/placeholder.svg"} 
                        alt={producto.NombreProducto} 
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{producto.NombreProducto}</h3>
                      <p className="text-sm text-gray-600 mb-2 flex-grow line-clamp-3">{truncarTexto(producto.DescripcionProducto, 121)}</p>
                      <p className="text-lg font-bold text-primary">{producto.PrecioProducto}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            <div>No hay productos similares disponibles.</div>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
