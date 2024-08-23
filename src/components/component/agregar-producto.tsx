/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/2O6HlIafith
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'
import { Rubik } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

rubik({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"

export function AgregarProducto() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Agregar nuevo producto</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Llena el formulario para crear un nuevo producto.
          </p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-foreground">
                Nombre del producto
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-muted-foreground/10 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-foreground">
                Descripción del producto
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-muted-foreground/10 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Ingresa la descripción del producto..."
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-foreground">
                Precio
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-muted-foreground/10 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-foreground">
                Categoría
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-muted-foreground/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="electronics">Electrónica</option>
                  <option value="clothing">Ropa</option>
                  <option value="home">Hogar</option>
                  <option value="sports">Deportes</option>
                  <option value="beauty">Belleza</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="images" className="block text-sm font-medium leading-6 text-foreground">
                Imágenes del producto
              </label>
              <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-muted-foreground/20 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-foreground"
                    >
                      <span>Subir un archivo</span>
                      <input id="images" name="images" type="file" multiple className="sr-only" />
                    </label>
                    <p className="pl-1">o arrastra y suelta</p>
                  </div>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF hasta 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              Guardar producto
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
