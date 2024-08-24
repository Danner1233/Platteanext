/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/cSq92g4cbJU
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Caudex } from 'next/font/google'
import { Prata } from 'next/font/google'

caudex({
  subsets: ['latin'],
  display: 'swap',
})

prata({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function AgregarTienda() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">Agregar Nueva Tienda</h1>
      <form className="grid gap-6 sm:gap-8 md:gap-10">
        <div className="grid gap-2">
          <Label htmlFor="image">Imagen de la Tienda</Label>
          <div className="flex items-center gap-4">
            <Input id="image" type="file" />
            <div className="flex items-center gap-2">
              <img
                id="image-preview"
                src="/placeholder.svg"
                alt="Image Preview"
                width={100}
                height={100}
                className="rounded-md"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
              <span className="text-sm text-muted-foreground">Vista previa de la imagen</span>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre de la Tienda</Label>
          <Input id="name" placeholder="Ingresa el nombre de la tienda" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Categoría de la Tienda</Label>
          {/* Se elimina el id aquí */}
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ropa">Ropa</SelectItem>
              <SelectItem value="electronica">Electrónica</SelectItem>
              <SelectItem value="comida">Comida</SelectItem>
              <SelectItem value="otros">Otros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Descripción de la Tienda</Label>
          <Textarea id="description" placeholder="Ingresa la descripción de la tienda" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-2">
            <Label htmlFor="street">Calle</Label>
            <Input id="street" placeholder="Ingresa la calle" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" placeholder="Ingresa la ciudad" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">Estado</Label>
            <Input id="state" placeholder="Ingresa el estado" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="zipcode">Código Postal</Label>
            <Input id="zipcode" placeholder="Ingresa el código postal" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hours">Horarios de Atención</Label>
          <Input id="hours" placeholder="Ingresa los horarios de atención" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Número de Teléfono</Label>
          <Input id="phone" placeholder="Ingresa el número de teléfono" />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          Guardar Tienda
        </Button>
      </form>
    </div>
  )
}