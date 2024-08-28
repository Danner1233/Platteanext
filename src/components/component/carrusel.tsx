import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Link from "next/link";
import { JSX, SVGProps } from "react";

export function Carrusel() {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-7">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="relative">
                  <img
                    src="/placeholder.svg"
                    width={1200}
                    height={600}
                    alt="Producto 1"
                    className="h-[500px] w-full object-cover" // Altura aumentada
                  />
                  <Link
                    href="#"
                    className="bg-plattea1 text-plattea2 absolute bottom-4 right-4 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none"
                    prefetch={false}
                  >
                    Ver más
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative">
                  <img
                    src="/bannerinicio2.jpg"
                    width={1200}
                    height={600}
                    alt="Producto 2"
                    className="h-[500px] w-full object-cover" // Altura aumentada
                  />
                  <Link
                    href="#"
                    className="bg-plattea1 text-plattea2 absolute bottom-4 right-4 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none"
                    prefetch={false}
                  >
                    Ver más
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative">
                  <img
                    src="/bannerinicio3.avif"
                    width={1200}
                    height={600}
                    alt="Producto 3"
                    className="h-[500px] w-full object-cover" // Altura aumentada
                  />
                  <Link
                    href="#"
                    className="bg-plattea1 text-plattea2 absolute bottom-4 right-4 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none"
                    prefetch={false}
                  >
                    Ver más
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground focus:outline-none">
              <ChevronLeftIcon className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground focus:outline-none">
              <ChevronRightIcon className="h-6 w-6" />
            </CarouselNext>
            <div className="mt-8 flex justify-center" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ChevronLeftIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
