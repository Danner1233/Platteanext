import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Producto {
  IdProducto: string;
  NombreProducto: string;
  PromedioCalificacion: string;  // Asegúrate de que este campo existe si lo vas a usar
  PrecioProducto: string;       // Asegúrate de que este campo existe si lo vas a usar
  FotoProductoURL: string;
}

export function ProductosDestacados() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/productosdestacados/`);

        if (response.ok) {
          const data: Producto[] = await response.json();
          setProductos(data);
          setIsLoaded(true);
        } else {
          throw new Error("Error fetching products");
        }
      } catch (error) {
        console.error(error);
        setError("Error al obtener los productos");
      }
    };

    fetchProductos();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!isLoaded) return <p>Cargando...</p>;

  return (
    <section className="mt-5 p-4 md:p-1">
  <div className="container mx-auto px-4 md:px-6 lg:px-7">
    <h2 className="text-3xl font-bold mb-6 text-center">Productos Destacados</h2>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    {productos.map((producto) => (
          <div key={producto.IdProducto} className="relative overflow-hidden rounded-lg group">
            <Link href={`/product/${producto.IdProducto}`} className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">Ver producto</span>
            </Link>
            <img
              src={producto.FotoProductoURL || "/placeholder.svg"}
              alt={producto.NombreProducto}
              width={400}
              height={300}
              className="object-cover w-full h-60"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold md:text-xl">{producto.NombreProducto}</h3>
              <p className="text-sm text-muted-foreground">Calificación: {producto.PromedioCalificacion}</p>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold md:text-lg">${producto.PrecioProducto}</h4>
                <Button size="sm" className="bg-plattea1 text-plattea2">Comprar</Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
</section>

  );
}
