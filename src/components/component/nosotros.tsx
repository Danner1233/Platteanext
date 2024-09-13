import { SVGProps } from "react";

// Componente que describe qué es Plattea
function QueEsPlattea() {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-foreground mb-4">¿Qué es Plattea?</h3>
      <p className="text-muted-foreground mb-4">
        Plattea es una plataforma de e-commerce innovadora que facilita la venta de productos para aquellos que buscan una manera accesible y eficiente de comercializar sus artículos. Diseñada para ser intuitiva y fácil de usar, nuestra tienda virtual permite a los usuarios crear y gestionar sus propias tiendas en línea sin complicaciones técnicas.
      </p>
      <p className="text-muted-foreground mb-4">
        Nuestra plataforma ofrece una variedad de herramientas para ayudar a los vendedores a optimizar su presencia en línea. Esto incluye opciones avanzadas de personalización de tiendas. Además, brindamos análisis detallados de rendimiento para que los vendedores puedan seguir el éxito de sus productos y ajustar sus estrategias en consecuencia.
      </p>
      <p className="text-muted-foreground">
        Únete a nosotros y forma parte de una comunidad dinámica que está redefiniendo el comercio electrónico. Con Plattea, la venta de productos nunca ha sido tan sencilla y accesible. ¡Descubre cómo nuestra plataforma puede ayudarte a transformar tu idea en un negocio próspero!
      </p>
    </div>
  );
}

// Componente de íconos
function RocketIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BoltIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

// Componente principal
export function Nosotros() {
  return (
    <div className="w-full">
      <section className="w-full bg-[url('/nosotros.jpeg')] bg-cover bg-center py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">Sobre Nosotros</h1>
          <p className="text-xl text-plattea2">Conozca a nuestro equipo y nuestros valores</p>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="/placeholder.svg"
                  width={64}
                  height={64}
                  alt="John Doe"
                  className="rounded-full mr-4"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Alexix Orostegui</h3>
                </div>
              </div>
              <p className="text-muted-foreground">
                
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="/placeholder.svg"
                  width={64}
                  height={64}
                  alt="Jane Smith"
                  className="rounded-full mr-4"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Andres Suarez</h3>
                </div>
              </div>
              <p className="text-muted-foreground">
                
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="/placeholder.svg"
                  width={64}
                  height={64}
                  alt="Michael Johnson"
                  className="rounded-full mr-4"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Carlos Martinez</h3>
                </div>
              </div>
              <p className="text-muted-foreground">
                
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="/placeholder.svg"
                  width={64}
                  height={64}
                  alt="Maria Gonzalez"
                  className="rounded-full mr-4"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Danner Arias</h3>
                </div>
              </div>
              <p className="text-muted-foreground">
                
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <RocketIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Innovación</h3>
              <p className="text-muted-foreground">
                La creación de nuestra primera página web representa un salto en la innovación, demostrando cómo la tecnología puede transformar ideas en realidades tangibles.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <UsersIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Compromiso</h3>
              <p className="text-muted-foreground">
                Nuestro equipo está comprometido con el éxito de cada cliente, proporcionando soporte continuo y soluciones personalizadas para cada necesidad.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <BoltIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Eficiencia</h3>
              <p className="text-muted-foreground">
                Trabajamos para ofrecer soluciones rápidas y efectivas, asegurando que nuestros procesos sean lo más eficientes posible para maximizar resultados.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <QueEsPlattea />
        </div>
      </section>
    </div>
  );
}
