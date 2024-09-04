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

  const [miniatura, setMiniatura] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);

  const [previewMiniatura, setPreviewMiniatura] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  const router = useRouter(); // Hook de Next.js para la redirección

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "miniatura" | "banner"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "miniatura") {
        setMiniatura(file);
        setPreviewMiniatura(URL.createObjectURL(file));
      } else if (type === "banner") {
        setBanner(file);
        setPreviewBanner(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró el token de autenticación.");
      return;
    }

    const formData = new FormData();

    const decoded: DecodedToken = jwtDecode(token);
    const userId = decoded.IdPersona;

    formData.append("IdPersona", userId);
    formData.append("NombreTienda", nombre);
    formData.append("IdCategoriaFK", categoria);
    formData.append("DescripcionTienda", descripcion);
    formData.append("DireccionTienda", direccion);
    formData.append("CiudadTienda", ciudad);
    formData.append("TelefonoTienda", telefono);

    if (miniatura) formData.append("MiniaturaTienda", miniatura);
    if (banner) formData.append("BannerTienda", banner);

    try {
      const response = await fetch(
        "http://localhost:4000/api/tienda/persona/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const tiendaId = responseData.idTienda; // Asegúrate de que el backend retorne el ID en `idTienda`
        alert("Tienda creada correctamente");
        router.push(`/administracioncubiculo/${tiendaId}`);
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

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">Agregar Nueva Tienda</h1>
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
              <SelectItem value="1">Moda</SelectItem>
              <SelectItem value="2">Electrodomésticos</SelectItem>
              <SelectItem value="3">Hogar</SelectItem>
              <SelectItem value="4">Deportes</SelectItem>
              <SelectItem value="5">Juguetes</SelectItem>
              <SelectItem value="6">Belleza</SelectItem>
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
                {previewBanner ? (
                  <img
                    src={previewBanner}
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
                    Sube tu Banner
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Sube una imagen para personalizar el banner de tu tienda.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[200px]:flex-row">
                  <label
                    htmlFor="banner-upload"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                  >
                    Cargar imagen de banner
                    <input
                      id="banner-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleImageChange(e, "banner")}
                    />
                  </label>
                  {banner && (
                    <Button
                      variant="outline"
                      className="h-10 flex items-center justify-center"
                      onClick={() => setBanner(null)}
                    >
                      Eliminar imagen
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#f5f5f5] py-12 md:py-24 lg:py-30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="relative aspect-[3/1] overflow-hidden rounded-xl">
                {previewMiniatura ? (
                  <img
                    src={previewMiniatura}
                    alt="Miniatura"
                    width={600}
                    height={200}
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: "600/200", objectFit: "cover" }}
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
                    Sube tu Miniatura
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Sube una imagen para la miniatura de tu tienda.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[200px]:flex-row">
                  <label
                    htmlFor="miniatura-upload"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                  >
                    Cargar imagen de miniatura
                    <input
                      id="miniatura-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleImageChange(e, "miniatura")}
                    />
                  </label>
                  {miniatura && (
                    <Button
                      variant="outline"
                      className="h-10 flex items-center justify-center"
                      onClick={() => setMiniatura(null)}
                    >
                      Eliminar imagen
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button type="submit">Crear Tienda</Button>
      </form>
    </div>
  );
}
