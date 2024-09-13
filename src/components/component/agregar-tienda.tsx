"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import NextCrypto from 'next-crypto';
import { jwtDecode } from "jwt-decode";

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
  const crypto = new NextCrypto('secret key'); // Asegúrate de usar la misma clave que en el backend

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

        // Encriptar el ID de la tienda
        const encryptedId = await crypto.encrypt(tiendaId);
        const safeId = encodeURIComponent(encryptedId.replace(/\//g, '_').replace(/\+/g, '-'));

        alert("Tienda creada correctamente");
        router.push(`/shop/${safeId}`);
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
    <Card className="m-12">
      <CardHeader>
        <CardTitle>Agregar nueva tienda</CardTitle>
        <CardDescription>Completa los siguientes campos para agregar una nueva tienda.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre de la tienda</Label>
            <Input
              id="name"
              placeholder="Ingresa el nombre de la tienda"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Categoría de la tienda</Label>
            <Select id="category" onValueChange={setCategoria}>
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
            <Textarea
              id="description"
              placeholder="Escribe una descripción de la tienda"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Dirección de la tienda</Label>
            <Input
              id="address"
              placeholder="Ingresa la dirección de la tienda"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">Ciudad de la tienda</Label>
              <Input
                id="city"
                placeholder="Ingresa la ciudad de la tienda"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Número de teléfono</Label>
              <Input
                id="phone"
                placeholder="Ingresa el número de teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="banner">Banner de la tienda</Label>
              <div className="relative aspect-[16/5] overflow-hidden rounded-md">
                {previewBanner ? (
                  <img
                    src={previewBanner}
                    alt="Banner"
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: "16/5" }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                )}
              </div>
              <label
                htmlFor="banner-upload"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
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
                  onClick={() => {
                    setBanner(null);
                    setPreviewBanner(null);
                  }}
                >
                  Eliminar banner
                </Button>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnail">Miniatura de la tienda</Label>
              <div className="relative aspect-[16/9] overflow-hidden rounded-md">
                {previewMiniatura ? (
                  <img
                    src={previewMiniatura}
                    alt="Miniatura"
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: "16/9" }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                )}
              </div>
              <label
                htmlFor="thumbnail-upload"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
              >
                Cargar imagen de miniatura
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleImageChange(e, "miniatura")}
                />
              </label>
              {miniatura && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setMiniatura(null);
                    setPreviewMiniatura(null);
                  }}
                >
                  Eliminar miniatura
                </Button>
              )}
            </div>
          </div>
          <CardFooter>
            <Button type="submit" className="w-full">
              Agregar tienda
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
