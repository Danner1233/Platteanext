
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AgregarTienda() {
  return (
    <Card className="m-12">
      <CardHeader>
        <CardTitle>Agregar nueva tienda</CardTitle>
        <CardDescription>Completa los siguientes campos para agregar una nueva tienda.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Categoría de tienda</Label>
            <Select id="category">
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Moda</SelectItem>
                <SelectItem value="2">Electrodometicos</SelectItem>
                <SelectItem value="3">Hogar</SelectItem>
                <SelectItem value="4">Deportes</SelectItem>
                <SelectItem value="5">Juguetes</SelectItem>
                <SelectItem value="6">Belleza</SelectItem>
                <SelectItem value="7">Electrónica</SelectItem>
                <SelectItem value="8">Libros</SelectItem>
                <SelectItem value="9">Alimentos</SelectItem>
                <SelectItem value="10">Salud</SelectItem>
                <SelectItem value="11">Oficina</SelectItem>
                <SelectItem value="12">Jardín</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción de la tienda</Label>
            <Textarea id="description" placeholder="Escribe una descripción de la tienda" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Dirección de la tienda</Label>
            <Input id="address" placeholder="Ingresa la dirección de la tienda" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">Ciudad de la tienda</Label>
              <Input id="city" placeholder="Ingresa la ciudad de la tienda" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number">Número de la tienda</Label>
              <Input id="number" placeholder="Ingresa el número de la tienda" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="banner">Banner de la tienda</Label>
              <img
                src="/placeholder.svg"
                alt="Banner de la tienda"
                width={800}
                height={200}
                className="w-full rounded-md"
                style={{ aspectRatio: "800/200", objectFit: "cover" }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnail">Miniatura de la tienda</Label>
              <img
                src="/placeholder.svg"
                alt="Miniatura de la tienda"
                width={200}
                height={200}
                className="rounded-md"
                style={{ aspectRatio: "200/200", objectFit: "cover" }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Agregar tienda</Button>
      </CardFooter>
    </Card>
  )
}
