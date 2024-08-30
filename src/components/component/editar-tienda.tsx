/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/sDuJ1DqMhnO
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export function EditarTienda() {
  return (
    <div className="flex justify-center">
      <div className="absolute left-4 pt-8">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Volver atrás
        </Link>
      </div>
      <Card className="w-full max-w-xl mt-8 mb-8">
        <CardHeader>
          <CardTitle>Editar Tienda</CardTitle>
          <CardDescription>
            Actualiza la información de tu tienda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre de la Tienda</Label>
              <Input id="name" placeholder="Ingresa el nombre de la tienda" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoría</Label>
              <Select id="category">
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electrónicos</SelectItem>
                  <SelectItem value="clothing">Ropa</SelectItem>
                  <SelectItem value="home-decor">
                    Decoración del Hogar
                  </SelectItem>
                  <SelectItem value="sports">Deportes</SelectItem>
                  <SelectItem value="beauty">Belleza</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Ingresa la descripción de la tienda"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                placeholder="Ingresa la dirección de la tienda"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Ingresa la ciudad" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  placeholder="Ingresa el número de teléfono"
                  type="tel"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="banner">Banner</Label>
              <div className="flex items-center gap-2">
                <img
                  src="/placeholder.svg"
                  alt="Banner"
                  width={200}
                  height={100}
                  className="rounded-md"
                  style={{ aspectRatio: "200/100", objectFit: "cover" }}
                />
                <Input id="banner" type="file" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnail">Miniatura</Label>
              <div className="flex items-center gap-2">
                <img
                  src="/placeholder.svg"
                  alt="Miniatura"
                  width={100}
                  height={100}
                  className="rounded-md"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <Input id="thumbnail" type="file" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Guardar Cambios</Button>
        </CardFooter>
      </Card>
    </div>
  );
}