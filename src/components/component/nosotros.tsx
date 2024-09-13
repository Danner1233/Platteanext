import { SVGProps } from "react"


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
                John es el fundador y CEO de nuestra empresa. Tiene más de 10 años de experiencia en el sector.
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
                Jane es la CTO de nuestra empresa. Tiene una amplia experiencia en desarrollo de software.
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
                Michael es el CMO de nuestra empresa. Tiene una trayectoria exitosa en marketing digital.
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
                Maria es la COO de nuestra empresa. Tiene una amplia experiencia en operaciones y gestión.
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
              <h3 className="text-lg font-semibold text-foreground mb-2">Trabajo en Equipo</h3>
              <p className="text-muted-foreground">
              Trabajar en equipo en la creación de nuestra primera página web potencia la colaboración y la innovación, combinando habilidades y perspectivas diversas para lograr resultados excepcionales.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <BoltIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Excelencia</h3>
              <p className="text-muted-foreground">
                Nos esforzamos por brindar un servicio excepcional a nuestros clientes y mantener altos estándares de
                calidad.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">Que es Plattea?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-card p-9 rounded-lg shadow-md">

              <p className="text-black">Fuimos galardonados como la mejor empresa del año en 2022.</p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}

function AwardIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  )
}


function BoltIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
  )
}


function BriefcaseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function HandshakeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  )
}


function RocketIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
  )
}


function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
  )
}
