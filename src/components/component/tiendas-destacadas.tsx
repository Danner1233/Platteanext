import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

interface Tienda {
  IdTienda: string;
  NombreTienda: string;
  DescripcionTienda: string;
  DireccionTienda: string;
  MiniaturaTiendaURL: string;
  CiudadTienda: string;
  CalificacionTienda: number;  // Asegúrate de incluir este campo en la interfaz
}

export function TiendasDestacadas() {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/tiendadestacadas/');  // Ajusta la ruta según tu configuración
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Tienda[] = await response.json();
        setTiendas(data);
      } catch (error) {
        console.error('Error fetching top 4 stores:', error);
      }
    };

    fetchTiendas();
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid max-w-8xl items-center justify-center gap-4 px-4 text-center md:gap-8 md:px-6 lg:grid-cols-2 lg:text-left xl:max-w-9xl xl:gap-10">
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-5xl">Tiendas destacadas</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Esta son las tiendas destacadas.
            </p>
          </div>
        </div>
        <Carousel className="w-full"
        autoplay={true}
        autoplayInterval={4000}
        infinite={true}>
          <CarouselContent>
            {tiendas.map((tienda, index) => (
              <CarouselItem key={tienda.IdTienda}>
                <div className="bg-muted rounded-lg overflow-hidden">
                  <img
                    src={tienda.MiniaturaTiendaURL || "/placeholder.svg"}
                    alt={`Store ${index + 1}`}
                    className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
                    style={{ aspectRatio: "500/400", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{tienda.NombreTienda}</h3>
                    <p className="text-muted-foreground">{tienda.DireccionTienda}, {tienda.CiudadTienda}</p>
  
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
