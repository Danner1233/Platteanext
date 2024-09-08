
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Link from "next/link"

export function CarruselTiendas() {
  return (
    <section className="py-12 px-4 md:px-6">
      <div className="container mx-auto px-4 md:px-6 lg:px-7">
        <h2 className="text-2xl font-bold mb-6">Explora nuestras categorías</h2>
        <Carousel
          className="w-full"
          autoplay={true}
          infinite={true}
          autoplayInterval={3000}
        >
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="p-4">
                <Link href="/categoriamoda" className="block rounded-lg overflow-hidden group" prefetch={false}>
                  <img
                    src="/moda.jpg"
                    alt="Moda"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:opacity-50 transition-opacity"
                    style={{ aspectRatio: "300/200", objectFit: "cover" }}
                  />
                  <div className="bg-background p-4">
                    <h3 className="text-lg font-semibold">Moda</h3>
                    <p className="text-muted-foreground group-hover:underline transition-colors">Ver más</p>
                  </div>
                </Link>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3 lg:basis-1/3">
              <div className="p-4">
                <Link href="/categoriaelectrodomesticos" className="block rounded-lg overflow-hidden group" prefetch={false}>
                  <img
                    src="/electrodomesticos.jpg"
                    alt="Electrodomésticos"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:opacity-50 transition-opacity"
                    style={{ aspectRatio: "300/200", objectFit: "cover" }}
                  />
                  <div className="bg-background p-4">
                    <h3 className="text-lg font-semibold">Electrodomésticos</h3>
                    <p className="text-muted-foreground group-hover:underline transition-colors">Ver más</p>
                  </div>
                </Link>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3 lg:basis-1/3">
              <div className="p-4">
                <Link href="/categoriahogar" className="block rounded-lg overflow-hidden group" prefetch={false}>
                  <img
                    src="/hogar.jpg"
                    alt="Hogar"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:opacity-50 transition-opacity"
                    style={{ aspectRatio: "300/200", objectFit: "cover" }}
                  />
                  <div className="bg-background p-4">
                    <h3 className="text-lg font-semibold">Hogar</h3>
                    <p className="text-muted-foreground group-hover:underline transition-colors">Ver más</p>
                  </div>
                </Link>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3 lg:basis-1/3">
              <div className="p-4">
                <Link href="/categoriadeportes" className="block rounded-lg overflow-hidden group" prefetch={false}>
                  <img
                    src="/deportes.jpg"
                    alt="Deportes"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:opacity-50 transition-opacity"
                    style={{ aspectRatio: "300/200", objectFit: "cover" }}
                  />
                  <div className="bg-background p-4">
                    <h3 className="text-lg font-semibold">Deportes</h3>
                    <p className="text-muted-foreground group-hover:underline transition-colors">Ver más</p>
                  </div>
                </Link>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3 lg:basis-1/3">
              <div className="p-4">
                <Link href="/categoriajuguetes" className="block rounded-lg overflow-hidden group" prefetch={false}>
                  <img
                    src="/juguetes.jpg"
                    alt="Juguetes"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:opacity-50 transition-opacity"
                    style={{ aspectRatio: "300/200", objectFit: "cover" }}
                  />
                  <div className="bg-background p-4">
                    <h3 className="text-lg font-semibold">Juguetes</h3>
                    <p className="text-muted-foreground group-hover:underline transition-colors">Ver más</p>
                  </div>
                </Link>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3 lg:basis-1/3">
              <div className="p-4">
                <Link href="/categoriabelleza" className="block rounded-lg overflow-hidden group" prefetch={false}>
                  <img
                    src="/belleza.jpg"
                    alt="Belleza"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:opacity-50 transition-opacity"
                    style={{ aspectRatio: "300/200", objectFit: "cover" }}
                  />
                  <div className="bg-background p-4">
                    <h3 className="text-lg font-semibold">Belleza</h3>
                    <p className="text-muted-foreground group-hover:underline transition-colors">Ver más</p>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>

  )
}
