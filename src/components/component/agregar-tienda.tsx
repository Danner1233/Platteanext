"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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

      const response = await fetch("http://localhost:4000/api/tienda/persona/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevaTienda),
      });

      if (response.ok) {
        alert("Tienda creada correctamente");
        router.push("/administracioncubiculo"); // Redirecciona a la página deseada
      } else {
        const errorData = await response.json();
        console.error('Detalles del error:', errorData);
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
        <Button type="submit" className="w-full sm:w-auto">
          Crear tienda
        </Button>
      </form>
    </div>
  );
}
