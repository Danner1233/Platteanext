
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Cambiarclave() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Cambiar contraseña</h1>
            <p className="text-muted-foreground">Ingresa tu nueva contraseña.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nueva contraseña</Label>
              <Input id="password" type="password" placeholder="Ingresa tu nueva contraseña" required />
            </div>
            <Button type="submit" className="w-full">
              Cambiar
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Paisaje natural"
          width="1200"
          height="800"
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1200/800", objectFit: "cover" }}
        />
      </div>
    </div>
  )
}
