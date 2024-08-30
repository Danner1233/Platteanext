import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface Tienda {
  IdTienda: string;
  NombreTienda: string;
  DescripcionTienda: string;
  DireccionTienda: string;
  CiudadTienda: string;
  TelefonoTienda: string;
  MiniaturaTiendaURL: string;
  BannerTiendaURL: string;
  IdCategoriaFK: string;
}

export function EditarTienda() {
  const params = useParams();
  const idTienda = params.IdTienda as string;

  const [tienda, setTienda] = useState<Tienda | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (idTienda) {
      const fetchTienda = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/tienda/${idTienda}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: Tienda = await response.json();
          setTienda(data);
        } catch (error: any) {
          setError(error.message || 'An unexpected error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchTienda();
    }
  }, [idTienda]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch(`http://localhost:4000/api/tienda/${idTienda}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la tienda');
      }

      alert('Tienda actualizada correctamente');
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-center">
      <div className="absolute left-4 pt-8">
        <Link
          href={`/shop/${idTienda}`}
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Volver atrás
        </Link>
      </div>
      <Card className="w-full max-w-xl mt-8 mb-8">
        <CardHeader>
          <CardTitle>Editar Tienda</CardTitle>
          <CardDescription>Actualiza la información de tu tienda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="nombreTienda">Nombre de la Tienda</Label>
              <Input
                id="nombreTienda"
                name="NombreTienda"
                defaultValue={tienda?.NombreTienda}
                placeholder="Ingresa el nombre de la tienda"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descripcionTienda">Descripción</Label>
              <Textarea
                id="descripcionTienda"
                name="DescripcionTienda"
                defaultValue={tienda?.DescripcionTienda}
                placeholder="Ingresa la descripción de la tienda"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="direccionTienda">Dirección</Label>
              <Input
                id="direccionTienda"
                name="DireccionTienda"
                defaultValue={tienda?.DireccionTienda}
                placeholder="Ingresa la dirección de la tienda"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ciudadTienda">Ciudad</Label>
              <Input
                id="ciudadTienda"
                name="CiudadTienda"
                defaultValue={tienda?.CiudadTienda}
                placeholder="Ingresa la ciudad"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefonoTienda">Teléfono</Label>
              <Input
                id="telefonoTienda"
                name="TelefonoTienda"
                defaultValue={tienda?.TelefonoTienda}
                placeholder="Ingresa el teléfono de la tienda"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="idCategoriaFK">Categoría</Label>
              <Input
                id="idCategoriaFK"
                name="IdCategoriaFK"
                defaultValue={tienda?.IdCategoriaFK}
                placeholder="Ingresa la categoría de la tienda"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bannerTienda">Banner de la Tienda</Label>
              <div className="flex items-center gap-2">
                <img
                  src={tienda?.BannerTiendaURL || "/placeholder.svg"}
                  alt="Banner de la tienda"
                  width={200}
                  height={100}
                  className="rounded-md"
                  style={{ aspectRatio: "200/100", objectFit: "cover" }}
                />
                <Input id="bannerTienda" name="BannerTienda" type="file" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="miniaturaTienda">Miniatura de la Tienda</Label>
              <div className="flex items-center gap-2">
                <img
                  src={tienda?.MiniaturaTiendaURL || "/placeholder.svg"}
                  alt="Miniatura de la tienda"
                  width={100}
                  height={100}
                  className="rounded-md"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <Input id="miniaturaTienda" name="MiniaturaTienda" type="file" />
              </div>
            </div>
            <Button className="ml-auto bg-blue-500 text-white">Guardar Cambios</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="button" className="ml-4 bg-red-500 text-white" onClick={() => console.log('Eliminar Tienda')}>Eliminar Tienda</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
