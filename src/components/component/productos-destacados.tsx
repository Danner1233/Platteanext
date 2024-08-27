import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ProductosDestacados() {
  return (
    <section className="mt-5 p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Productos Destacados</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-lg group">
          <Link href="/product" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">Ver producto</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Producto 1"
            width={400}
            height={300}
            className="object-cover w-full h-60"
            style={{ aspectRatio: "400/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-semibold md:text-xl">Reloj de Bolsillo Vintage</h3>
            <p className="text-sm text-muted-foreground">Encanto antiguo</p>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold md:text-lg">$79.99</h4>
              <Button size="sm" className="bg-plattea1 text-plattea2">Comprar</Button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg group">
          <Link href="/product" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">Ver producto</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Producto 2"
            width={400}
            height={300}
            className="object-cover w-full h-60"
            style={{ aspectRatio: "400/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-semibold md:text-xl">Audífonos Inalámbricos</h3>
            <p className="text-sm text-muted-foreground">Audio cristalino</p>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold md:text-lg">$69.99</h4>
              <Button size="sm" className="bg-plattea1 text-plattea2">Comprar</Button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg group">
          <Link href="/product" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">Ver producto</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Producto 3"
            width={400}
            height={300}
            className="object-cover w-full h-60"
            style={{ aspectRatio: "400/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-semibold md:text-xl">Bolso Cruzado de Cuero</h3>
            <p className="text-sm text-muted-foreground">Elegante y práctico</p>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold md:text-lg">$49.99</h4>
              <Button size="sm" className="bg-plattea1 text-plattea2">Comprar</Button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg group">
          <Link href="/product" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">Ver producto</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Producto 4"
            width={400}
            height={300}
            className="object-cover w-full h-60"
            style={{ aspectRatio: "400/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-semibold md:text-xl">Gafas de Sol Elegantes</h3>
            <p className="text-sm text-muted-foreground">Protección UV</p>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold md:text-lg">$29.99</h4>
              <Button size="sm" className="bg-plattea1 text-plattea2">Comprar</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
