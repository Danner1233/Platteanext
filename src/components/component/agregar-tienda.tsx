

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
          <Label htmlFor="image">Imagen de la miniatura</Label>
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
          <Label htmlFor="image">Imagen del banner</Label>
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
            <Label htmlFor="street">Direccion</Label>
            <Input id="street" placeholder="Ingresa la calle" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" placeholder="Ingresa la ciudad" />
          </div>

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
