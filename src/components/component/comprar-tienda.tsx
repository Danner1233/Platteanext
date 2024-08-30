import { Button } from "@/components/ui/button";

export function ComprarTienda() {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Nuestros Planes de Suscripción
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Elige el plan que mejor se adapte a tus necesidades.
          </p>
        </div>

        {/* Subscription Cards Section */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Basic Plan */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg flex flex-col">
            <div className="bg-primary text-primary-foreground py-4 px-6 text-center">
              <h3 className="text-2xl font-bold">Básico</h3>
              <p className="text-4xl font-bold">10 Productos</p>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-lg mb-4">
                El plan básico incluye 10 productos seleccionados cuidadosamente para satisfacer tus necesidades.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Suscribirse
              </Button>
            </div>
          </div>

          {/* Intermediate Plan */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg flex flex-col">
            <div className="bg-secondary text-secondary-foreground py-4 px-6 text-center">
              <h3 className="text-2xl font-bold">Intermedio</h3>
              <p className="text-4xl font-bold">30 Productos</p>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-lg mb-4">
                El plan intermedio incluye 30 productos seleccionados cuidadosamente para satisfacer tus necesidades.
              </p>
              <Button
                variant="secondary"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                Suscribirse
              </Button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg flex flex-col">
            <div className="bg-muted text-muted-foreground py-4 px-6 text-center">
              <h3 className="text-2xl font-bold">Premium</h3>
              <p className="text-4xl font-bold">50 Productos</p>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-lg mb-4">
                El plan premium incluye 50 productos seleccionados cuidadosamente para satisfacer tus necesidades.
              </p>
              <Button
                variant="default"
                className="w-full bg-muted hover:bg-muted/90 text-muted-foreground"
              >
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
