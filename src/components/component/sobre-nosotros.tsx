/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/4lj1sP81GLH
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"

export function SobreNosotros() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 lg:px-8 xl:px-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Sobre Plattea
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Plattea es una tienda de comida saludable y orgánica que se fundó en 2015 con la misión de brindar a
                  la comunidad opciones nutritivas y deliciosas. Nuestro enfoque se basa en la calidad de los
                  ingredientes, la sostenibilidad y el servicio excepcional.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/about.jpg"
                width={550}
                height={310}
                alt="Sobre Plattea"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Nuestra Historia</h2>
                  <p className="text-muted-foreground sm:text-base md:text-lg lg:text-xl">
                    Plattea nació de la pasión de un grupo de amigos por la alimentación saludable y sostenible. Después
                    de años experimentando en sus cocinas, decidieron compartir sus creaciones con la comunidad local.
                    Desde entonces, hemos crecido para convertirnos en un destino favorito para aquellos que buscan
                    opciones nutritivas y deliciosas.
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Nuestros Valores</h2>
                  <ul className="list-disc space-y-2 pl-6 text-muted-foreground sm:text-base md:text-lg lg:text-xl">
                    <li>Calidad e integridad de los ingredientes</li>
                    <li>Sostenibilidad y responsabilidad ambiental</li>
                    <li>Servicio al cliente excepcional</li>
                    <li>Innovación y mejora continua</li>
                    <li>Conexión con la comunidad local</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
