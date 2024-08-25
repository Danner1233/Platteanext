import { Button } from "@/components/ui/button";

export function ComprarTienda() {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="grid gap-1 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Nuestros Planes de Suscripción
            </h1>
            <p className="text-muted-foreground text-lg">
              Elige el plan que mejor se adapte a tus necesidades.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="bg-primary text-primary-foreground py-4 px-6 text-center">
              <h3 className="text-2xl font-bold">Básico</h3>
              <p className="text-4xl font-bold">10 Productos</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-lg">
                El plan básico incluye 10 productos seleccionados cuidadosamente
                para satisfacer tus necesidades.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Suscribirse
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="bg-secondary text-secondary-foreground py-4 px-6 text-center">
              <h3 className="text-2xl font-bold">Intermedio</h3>
              <p className="text-4xl font-bold">30 Productos</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-lg">
                El plan intermedio incluye 30 productos seleccionados
                cuidadosamente para satisfacer tus necesidades.
              </p>
              <Button
                variant="secondary"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                Suscribirse
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="bg-muted text-muted-foreground py-4 px-6 text-center">
              <h3 className="text-2xl font-bold">Premium</h3>
              <p className="text-4xl font-bold">50 Productos</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-lg">
                El plan premium incluye 50 productos seleccionados
                cuidadosamente para satisfacer tus necesidades.
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
