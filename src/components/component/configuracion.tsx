"use client";

import { useRef, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
=======
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  IdPersona: string;
}

interface Profile {
  FotoPersonaURL: string;
  NombrePersona: string;
  ApellidoPersona: string;
  CorreoPersona: string;
  CiudadPersona: string;
  DescripcionPersona: string;
  DireccionPersona: string;
}
>>>>>>> 3a9f0ac9c05342d7fcbc8d8b6f088658924a12c3

export function Configuracion() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.IdPersona;

        const response = await fetch(`http://localhost:4000/api/persona/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data: Profile = await response.json();
          setProfile(data);
          setNombre(data.NombrePersona);
          setApellido(data.ApellidoPersona);
          setCorreo(data.CorreoPersona);
          setCiudad(data.CiudadPersona);
          setDescripcion(data.DescripcionPersona);
          setDireccion(data.DireccionPersona);
        } else {
          throw new Error("Error fetching profile");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
<<<<<<< HEAD
      const file = event.target.files[0];
      console.log("Archivo seleccionado:", file);
=======
      setFile(event.target.files[0]);
>>>>>>> 3a9f0ac9c05342d7fcbc8d8b6f088658924a12c3
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const decoded: DecodedToken = jwtDecode(token);
      const userId = decoded.IdPersona;

      const formData = new FormData();
      formData.append("NombrePersona", nombre);
      formData.append("ApellidoPersona", apellido);
      formData.append("CorreoPersona", correo);
      formData.append("CiudadPersona", ciudad);
      formData.append("DescripcionPersona", descripcion);
      formData.append("DireccionPersona", direccion);
      if (file) {
        formData.append("FotoPersona", file);
      }

      const response = await fetch(`http://localhost:4000/api/persona/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        // Maneja la respuesta exitosa
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        alert("Perfil actualizado con éxito");
        // Refresca la página
        window.location.reload();
      } else {
        // Maneja errores del servidor
        throw new Error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al actualizar el perfil");
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-9">
      <div className="w-full max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-lg shadow-md dark:bg-background dark:text-foreground">
        <h1 className="text-3xl font-bold mb-6">Configuración de Perfil</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">Nombre</Label>
                  <Input id="first-name" type="text" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="last-name">Apellido</Label>
                  <Input id="last-name" type="text" defaultValue="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="direccion" type="text" defaultValue="Dirección" />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Input id="description" type="text" defaultValue="Una breve descripción sobre ti" />
              </div>
              <div>
                <Label htmlFor="profile-picture">Foto de Perfil</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" onClick={handleChangePhotoClick}>
                    Cambiar Foto
                  </Button>
                  <input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" defaultValue="********" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Preferencias</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="theme">Tema</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Ubicación</Label>
                <Input id="location" type="text" defaultValue="Ciudad, País" />
=======
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10 dark:bg-background dark:text-foreground">
      <h1 className="text-3xl font-bold mb-6">Configuración de Perfil</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name">Nombre</Label>
                <Input id="first-name" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="last-name">Apellido</Label>
                <Input id="last-name" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="profile-picture">Foto de Perfil</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile?.FotoPersonaURL || "/placeholder-user.jpg"} alt="Profile Picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" onClick={handleChangePhotoClick}>
                  Cambiar Foto
                </Button>
                <input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
>>>>>>> 3a9f0ac9c05342d7fcbc8d8b6f088658924a12c3
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <div className="mt-8 flex justify-end">
          <Button className="bg-plattea1">Guardar Cambios</Button>
        </div>
      </div>
=======
        <div>
          <h2 className="text-2xl font-bold mb-4">Preferencias</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Ciudad</Label>
              <Input id="location" type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Input id="description" type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="direccion">Dirección</Label>
              <Input id="direccion" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button className="bg-plattea1" onClick={handleSaveChanges}>
          Guardar Cambios
        </Button>
      </div>
>>>>>>> 3a9f0ac9c05342d7fcbc8d8b6f088658924a12c3
    </div>
  );
}
