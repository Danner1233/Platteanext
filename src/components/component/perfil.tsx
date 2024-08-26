"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  IdPersona: string;
}

interface Profile {
  FotoPersonaURL: string;
  NombrePersona: string;
  Ubicacion: string;
  Descripcion: string;
  tiendas: any[];
}

export function Perfil() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string>("");

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
        console.log(response);
        if (response.ok) {
          const data: Profile = await response.json();
          setProfile(data);
          console.log(data);
        } else {
          throw new Error("Error fetching profile");
        }
      } catch (error) {
        console.error(error);
      }
    };
      
    fetchProfile();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 md:px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-background rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.FotoPersonaURL || "/placeholder-user.jpg"} alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{profile?.NombrePersona || "Nombre Usuario"}</h2>
              <p className="text-muted-foreground">{profile?.Ubicacion || "Ubicación desconocida"}</p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">
            {profile?.Descripcion || "Descripción no disponible"}
          </p>
        </div>
        <div className="bg-background rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Mis Tiendas</h2>
          <div className="grid gap-4">
            {profile?.tiendas?.map((tienda: any) => (
              <div key={tienda.IdTienda} className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-semibold">{tienda.NombreTienda}</h3>
                <p className="text-muted-foreground">{tienda.DescripcionTienda}</p>
                <p className="text-muted-foreground">Ubicación: {tienda.DireccionTienda}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}