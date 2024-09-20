"use client";

import { SVGProps, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios"; // Asegúrate de tener axios instalado

// Interfaces
interface Profile {
  FotoPersonaURL: string;
  NombrePersona: string;
  ApellidoPersona: string;
  CorreoPersona: string;
  DescripcionPersona: string;
  TelefonoPersona?: string;
  bannerPersonaURL?: string;
  idRolFK: number; // Asegúrate de incluir el rol
}

interface Tienda {
  IdTienda: string;
  NombreTienda: string;
  DescripcionTienda: string;
  DireccionTienda: string;
  MiniaturaTiendaURL: string;
  CiudadTienda: string;
}

export function Administrador() {
  const [personas, setPersonas] = useState<Profile[]>([]);
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personasResponse = await axios.get('http://localhost:4000/api/persona/');
        setPersonas(personasResponse.data);

        const tiendasResponse = await axios.get('http://localhost:4000/api/tienda/');
        setTiendas(tiendasResponse.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (correo: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/persona/${correo}`);
        // Actualiza el estado local para eliminar al usuario de la lista
        setPersonas((prev) => prev.filter((persona) => persona.CorreoPersona !== correo));
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  const truncarTexto = (texto: string, maxLength: number) => {
    return texto.length > maxLength
      ? texto.substring(0, maxLength) + "..."
      : texto;
  };

  // Filtrar usuarios y tiendas basados en el término de búsqueda
  const filteredPersonas = personas.filter((persona) =>
    `${persona.NombrePersona} ${persona.ApellidoPersona}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTiendas = tiendas.filter((tienda) =>
    tienda.NombreTienda.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
      <div className="flex flex-col sm:gap-4 sm:py-4 w-full max-w-6xl">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative flex-1">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar usuarios o tiendas..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado del término de búsqueda
            />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
          <Tabs defaultValue="users">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="users">Usuarios</TabsTrigger>
                <TabsTrigger value="stores">Tiendas</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="users">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Usuarios</CardTitle>
                  <CardDescription>
                    Administra todos los usuarios y su informacion.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-y-auto max-h-60"> {/* Contenedor con scroll */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Correo</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Teléfono</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Eliminar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPersonas.map((persona) => (
                          <TableRow key={persona.CorreoPersona}>
                            <TableCell className="font-medium">
                              {persona.NombrePersona} {persona.ApellidoPersona}
                            </TableCell>
                            <TableCell>{persona.CorreoPersona}</TableCell>
                            <TableCell>{persona.DescripcionPersona ? persona.DescripcionPersona : " NULL"}</TableCell>
                            <TableCell>{persona.TelefonoPersona}</TableCell>
                            <TableCell>
                              {persona.idRolFK === 1 ? "Administrador" : "Cliente"}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" onClick={() => handleDeleteUser(persona.CorreoPersona)}>
                                <TrashIcon className="w-4 h-4" aria-hidden="true" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TIENDA */}
            <TabsContent value="stores">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Tiendas</CardTitle>
                  <CardDescription>
                    Administra todas las tiendas y su información.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-y-auto max-h-60"> {/* Contenedor con scroll */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Dirección</TableHead>
                          <TableHead>Ciudad</TableHead>
                          <TableHead>Eliminar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTiendas.map((tienda) => (
                          <TableRow key={tienda.IdTienda}>
                            <TableCell className="font-medium">{tienda.NombreTienda}</TableCell>
                            <TableCell>{truncarTexto(tienda.DescripcionTienda, 150)}</TableCell>
                            <TableCell>{tienda.DireccionTienda}</TableCell>
                            <TableCell>{tienda.CiudadTienda}</TableCell>
                            <TableCell>
                              <Button variant="ghost">
                                <TrashIcon className="w-4 h-4" aria-hidden="true" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M10 11v6M14 11v6M5 6v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6" />
    </svg>
  );
}
