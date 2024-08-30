import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function ProductosProducto() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto grid gap-6 md:gap-8 px-4 md:px-6">
        <h2 className="text-2xl font-bold">Productos Similares</h2>
        <Carousel
        autoplay={true}
        autoplayInterval={3000}
        infinite={true}>
          <CarouselContent className="flex gap-4">
            {/* Adjust the basis to make products smaller */}
            <CarouselItem className="flex-shrink-0 md:basis-1/3 lg:basis-1/4">
              <div className="grid gap-4">
                <div className="relative group">
                  <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                    <span className="sr-only">View</span>
                  </Link>
                  <img
                    src="/placeholder.svg"
                    alt="Producto 1"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  />
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">Producto 1</h3>
                    <p className="text-xs leading-none">Descripción del producto 1</p>
                    <div className="text-xl font-bold">$99.99</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs py-1">
                  Agregar al carrito
                </Button>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 md:basis-1/3 lg:basis-1/4">
              <div className="grid gap-4">
                <div className="relative group">
                  <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                    <span className="sr-only">View</span>
                  </Link>
                  <img
                    src="/placeholder.svg"
                    alt="Producto 2"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  />
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">Producto 2</h3>
                    <p className="text-xs leading-none">Descripción del producto 2</p>
                    <div className="text-xl font-bold">$79.99</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs py-1">
                  Agregar al carrito
                </Button>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 md:basis-1/3 lg:basis-1/4">
              <div className="grid gap-4">
                <div className="relative group">
                  <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                    <span className="sr-only">View</span>
                  </Link>
                  <img
                    src="/placeholder.svg"
                    alt="Producto 3"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  />
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">Producto 3</h3>
                    <p className="text-xs leading-none">Descripción del producto 3</p>
                    <div className="text-xl font-bold">$49.99</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs py-1">
                  Agregar al carrito
                </Button>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 md:basis-1/3 lg:basis-1/4">
              <div className="grid gap-4">
                <div className="relative group">
                  <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                    <span className="sr-only">View</span>
                  </Link>
                  <img
                    src="/placeholder.svg"
                    alt="Producto 4"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  />
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">Producto 4</h3>
                    <p className="text-xs leading-none">Descripción del producto 4</p>
                    <div className="text-xl font-bold">$29.99</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs py-1">
                  Agregar al carrito
                </Button>
              </div>
            </CarouselItem>
            {/* Add more CarouselItem components as needed */}
            <CarouselItem className="flex-shrink-0 md:basis-1/3 lg:basis-1/4">
              <div className="grid gap-4">
                <div className="relative group">
                  <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                    <span className="sr-only">View</span>
                  </Link>
                  <img
                    src="/placeholder.svg"
                    alt="Producto 4"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  />
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">Producto 4</h3>
                    <p className="text-xs leading-none">Descripción del producto 4</p>
                    <div className="text-xl font-bold">$29.99</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs py-1">
                  Agregar al carrito
                </Button>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 md:basis-1/3 lg:basis-1/4">
              <div className="grid gap-4">
                <div className="relative group">
                  <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                    <span className="sr-only">View</span>
                  </Link>
                  <img
                    src="/placeholder.svg"
                    alt="Producto 4"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  />
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">Producto 4</h3>
                    <p className="text-xs leading-none">Descripción del producto 4</p>
                    <div className="text-xl font-bold">$29.99</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs py-1">
                  Agregar al carrito
                </Button>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 md:basis-1/3 lg:basis-1/4">
              <div className="grid gap-4">
                <div className="relative group">
                  <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                    <span className="sr-only">View</span>
                  </Link>
                  <img
                    src="/placeholder.svg"
                    alt="Producto 4"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  />
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">Producto 4</h3>
                    <p className="text-xs leading-none">Descripción del producto 4</p>
                    <div className="text-xl font-bold">$29.99</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs py-1">
                  Agregar al carrito
                </Button>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
