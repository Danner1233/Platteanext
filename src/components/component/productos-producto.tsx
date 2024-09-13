"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
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
        console.log('Fetching productos similares...');
        const safeIdProducto = encryptedIdProducto.replace(/_/g, '/').replace(/-/g, '+');
        const decodedId = decodeURIComponent(safeIdProducto);
        const decryptedId = await crypto.decrypt(decodedId);

        console.log('ID desencriptado:', decryptedId);

        const response = await axios.get(`http://localhost:4000/api/productos-similares/${decryptedId}`);
        console.log('Response data:', response);
        console.log('Response data (solo data):', response.data);
        console.log('Response data (es array):', Array.isArray(response.data));

        // Asignar productos similares
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

  return (
    <section className="w-full py-12">
      <div className="container mx-auto grid gap-6 md:gap-8 px-4 md:px-6">
        <h2 className="text-2xl font-bold">Productos Similares</h2>
        <Carousel autoplay={true} autoplayInterval={3000} infinite={true}>
          <CarouselContent className="flex gap-4">
            {productosSimilares.length > 0 ? (
              productosSimilares.map((producto: Producto, index: number) => (
                <CarouselItem key={`${producto.IdProducto}-${index}`} className="flex-shrink-0 md:basis-1/3 lg:basis-1/4">
                  <div className="grid gap-4">
                    <div className="relative group">
                      <Link href={`/producto/${producto.IdProducto}`} className="absolute inset-0 z-10" prefetch={false}>
                        <span className="sr-only">Ver</span>
                      </Link>
                      <img
                        src={producto.FotoProductoURL || "/placeholder.svg"}
                        alt={producto.NombreProducto}
                        width={250}
                        height={250}
                        className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                      />
                      <div className="p-2">
                        <h3 className="font-semibold text-sm">{producto.NombreProducto}</h3>
                        <p className="text-xs leading-none">{producto.DescripcionProducto}</p>
                        <div className="text-xl font-bold">${producto.PrecioProducto}</div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full text-xs py-1">
                      Agregar al carrito
                    </Button>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <div>No hay productos similares disponibles.</div>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
