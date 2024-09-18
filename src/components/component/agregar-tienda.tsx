"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NextCrypto from "next-crypto";
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

  const router = useRouter();
  const crypto = new NextCrypto("secret key");

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

    // Añadir console.log para depuración
    console.log("Enviando formulario:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await fetch("http://localhost:4000/api/tienda/persona/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("Respuesta del servidor:", response);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Datos de respuesta:", responseData);

        const tiendaId = responseData.idTienda;
        if (!tiendaId) {
          alert("No se recibió el id de la tienda");
          return;
        }

        const encryptedId = await crypto.encrypt(tiendaId);
        const safeId = encodeURIComponent(encryptedId.replace(/\//g, "_").replace(/\+/g, "-"));

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
    <Card className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Agregar Tienda</CardTitle>
        <CardDescription>Ingresa los detalles de tu tienda.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nombre de la Tienda
              </Label>
              <Input
                id="name"
                placeholder="Tienda de Ropa"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Categoría
              </Label>
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
              <Label htmlFor="description" className="text-sm font-medium">
                Descripción
              </Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Describe tu tienda..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Dirección
                </Label>
                <Input
                  id="address"
                  placeholder="Av. Principal 123"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  Ciudad
                </Label>
                <Input id="city" placeholder="Bogotá" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Teléfono
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(+57) 456-7890"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="banner" className="text-sm font-medium">
                Banner de la Tienda
              </Label>
              <div className="flex items-center">
                <Input
                  id="banner"
                  type="file"
                  onChange={(e) => handleImageChange(e, "banner")}
                />
                {previewBanner && (
                  <div className="ml-4 w-32 h-16 overflow-hidden rounded-md">
                    <img
                      src={previewBanner}
                      alt="Banner Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnail" className="text-sm font-medium">
                Miniatura de la Tienda
              </Label>
              <div className="flex items-center">
                <Input
                  id="thumbnail"
                  type="file"
                  onChange={(e) => handleImageChange(e, "miniatura")}
                />
                {previewMiniatura && (
                  <div className="ml-4 w-32 h-16 overflow-hidden rounded-md">
                    <img
                      src={previewMiniatura}
                      alt="Miniatura Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <CardFooter>
            <div className="flex justify-end">
              <Button type="submit">Agregar Tienda</Button>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
