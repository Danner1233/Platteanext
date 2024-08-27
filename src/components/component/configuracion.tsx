"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function Configuracion() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Implementa la lógica para manejar la foto aquí (ej. subir al servidor o previsualizar)
      console.log("Archivo seleccionado:", file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10 dark:bg-background dark:text-foreground">
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
              <Label htmlFor="profile-picture">Foto de Perfil</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" onClick={handleChangePhotoClick}>
                  Cambiar Foto
                </Button>
                {/* Hidden file input */}
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
              <Label htmlFor="language">Idioma</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Ubicación</Label>
              <Input id="location" type="text" defaultValue="Ciudad, País" />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Input id="description" type="text" defaultValue="Una breve descripción sobre ti" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button className="bg-plattea1">Guardar Cambios</Button>
      </div>
    </div>
  );
}
