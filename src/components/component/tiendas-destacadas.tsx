import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

export function TiendasDestacadas() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid max-w-8xl items-center justify-center gap-4 px-4 text-center md:gap-8 md:px-6 lg:grid-cols-2 lg:text-left xl:max-w-9xl xl:gap-10">
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-5xl">Featured Stores</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out our top featured stores.
            </p>
          </div>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="bg-muted rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Store 1"
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Store 1</h3>
                  <p className="text-muted-foreground">Description of Store 1</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="bg-muted rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Store 2"
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Store 2</h3>
                  <p className="text-muted-foreground">Description of Store 2</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="bg-muted rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Store 3"
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Store 3</h3>
                  <p className="text-muted-foreground">Description of Store 3</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="bg-muted rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Store 4"
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Store 4</h3>
                  <p className="text-muted-foreground">Description of Store 4</p>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
