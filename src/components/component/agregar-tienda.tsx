"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { jwtDecode } from "jwt-decode";
import { ImageIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface DecodedToken {
  IdPersona: string;
}

export function AgregarTienda() {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");

  const router = useRouter(); // Hook de Next.js para la redirección

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró el token de autenticación.");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const userId = decoded.IdPersona;

      const nuevaTienda = {
        IdPersona: userId,
        NombreTienda: nombre,
        IdCategoriaFK: categoria,
        DescripcionTienda: descripcion,
        DireccionTienda: direccion,
        CiudadTienda: ciudad,
        TelefonoTienda: telefono, // Asegúrate de que este campo sea aceptado por el backend
      };

      const response = await fetch(
        "http://localhost:4000/api/tienda/persona/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nuevaTienda),
        }
      );

      if (response.ok) {
        alert("Tienda creada correctamente");
        router.push("/administracioncubiculo"); // Redirecciona a la página deseada
      } else {
        const errorData = await response.json();
        console.error("Detalles del error:", errorData);
        alert(`Error al crear la tienda: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al crear la tienda:", error);
      alert("Hubo un error al crear la tienda. Inténtalo de nuevo más tarde.");
    }
  };
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleConfirmImage = () => {
    console.log("Imagen confirmada:", selectedImage);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
        Agregar Nueva Tienda
      </h1>
      <form className="grid gap-6 sm:gap-8 md:gap-10" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre de la Tienda</Label>
          <Input
            id="name"
            placeholder="Ingresa el nombre de la tienda"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Categoría de la Tienda</Label>
          <Select onValueChange={setCategoria}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Ropa</SelectItem>
              <SelectItem value="2">Electrónica</SelectItem>
              <SelectItem value="3">Comida</SelectItem>
              <SelectItem value="4">Otros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Descripción de la Tienda</Label>
          <Textarea
            id="description"
            placeholder="Ingresa la descripción de la tienda"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-2">
            <Label htmlFor="street">Dirección</Label>
            <Input
              id="street"
              placeholder="Ingresa la calle"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              placeholder="Ingresa la ciudad"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Número de Teléfono</Label>
          <Input
            id="phone"
            placeholder="Ingresa el número de teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="w-full bg-[#f5f5f5] py-12 md:py-24 lg:py-30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="relative aspect-[3/1] overflow-hidden rounded-xl">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Banner"
                    width={1200}
                    height={400}
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: "1200/400", objectFit: "cover" }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Sube tu Imagen
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Sube una imagen para personalizar el banner de tu sitio web.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[200px]:flex-row">
                  <label
                    htmlFor="image-upload"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                  >
                    Cargar imagen
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  {selectedImage && (
                    <Button onClick={handleConfirmImage}>
                      Confirmar imagen
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Card className="m-7">
              <CardHeader>
                <CardTitle>Editar foto de tienda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <img
                    src="/placeholder.svg"
                    alt="Foto de la tienda"
                    width={400}
                    height={300}
                    className="rounded-md object-cover"
                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="image">Cargar imagen</Label>
                  <Input id="image" type="file" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Guardar</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          Crear tienda
        </Button>
      </form>
    </div>
  );
}
