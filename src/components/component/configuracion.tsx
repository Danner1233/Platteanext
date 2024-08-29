"use client";

import { useRef, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";

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
  TelefonoPersona?: string;
}

export function Configuracion() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.IdPersona;

        const response = await fetch(
          `http://localhost:4000/api/persona/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data: Profile = await response.json();
          setProfile(data);
          setNombre(data.NombrePersona);
          setApellido(data.ApellidoPersona);
          setCorreo(data.CorreoPersona);
          setCiudad(data.CiudadPersona);
          setDescripcion(data.DescripcionPersona);
          setDireccion(data.DireccionPersona);
          setTelefono(data.TelefonoPersona || ""); // Asignar el número de celular
        } else {
          throw new Error("Error fetching profile");
        }
      } catch (error) {
        console.error(error);
        setError("Error al cargar el perfil");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setHasChanges(
        nombre !== profile.NombrePersona ||
          apellido !== profile.ApellidoPersona ||
          correo !== profile.CorreoPersona ||
          ciudad !== profile.CiudadPersona ||
          descripcion !== profile.DescripcionPersona ||
          direccion !== profile.DireccionPersona ||
          file !== null
      );
    }
  }, [nombre, apellido, correo, ciudad, descripcion, direccion, file, profile]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
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
      formData.append("TelefonoPersona", telefono);
      if (file) {
        formData.append("FotoPersona", file);
      }

      const response = await fetch(
        `http://localhost:4000/api/persona/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        window.location.reload(); // Consider using a more elegant solution for updating UI
      } else {
        throw new Error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al actualizar el perfil");
    }
  };

  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "/placeholder.svg?height=400&width=1200",
    "/placeholder.svg?height=400&width=1200",
    "/placeholder.svg?height=400&width=1200",
  ];

  const handleNextImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        images[imageIndex] = URL.createObjectURL(file);
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    };
    fileInput.click();
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-9">
      <div className="w-full max-w-4xl mx-auto p-6 md:p-10 dark:bg-background dark:text-foreground">
        <h1 className="text-3xl font-bold mb-6">Configuración de Perfil</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">Nombre</Label>
                  <Input
                    id="first-name"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last-name">Apellido</Label>
                  <Input
                    id="last-name"
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Ciudad</Label>
                <Input
                  id="location"
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="descripcion">Descripción</Label>
                <textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={4}
                  className="w-full p-2 border rounded-md resize-none"
                />
              </div>
              <div>
                <Label htmlFor="profile-picture">Foto de Perfil</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={profile?.FotoPersonaURL || "/placeholder-user.jpg"}
                      alt="Profile Picture"
                    />
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
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
                <Label htmlFor="banner-picture p-2">Cambiar banner</Label>
                <div className="relative p-3">
                  <img
                    src={images[imageIndex]}
                    alt="Banner"
                    width={1200}
                    height={400}
                    className="w-full aspect-[3/1] object-cover"
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={handleNextImage}
                    variant="outline"
                  >
                    Cambiar imagen
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Contacto</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefono">Número de Celular</Label>
                <Input
                  id="telefono"
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
              <h2 className="text-2xl font-bold mb-4">Preferencias</h2>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            className="bg-plattea1"
            onClick={handleSaveChanges}
            disabled={!hasChanges}
          >
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
