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
import { PencilIcon, TrashIcon } from "lucide-react";

// Interfaces
interface Profile {
  FotoPersonaURL: string;
  NombrePersona: string;
  ApellidoPersona: string;
  CorreoPersona: string;
  DescripcionPersona: string;
  TelefonoPersona?: string;
  bannerPersonaURL?: string;
  idRolFK: number;
}

interface Tienda {
  IdTienda: string;
  NombreTienda: string;
  DescripcionTienda: string;
  DireccionTienda: string;
  MiniaturaTiendaURL: string;
  CiudadTienda: string;
}

interface Categoria {
  IdCategoria: number;
  NombreCategoria: string;
  FotoCategoria: string;
}

export function Administrador() {
  const [personas, setPersonas] = useState<Profile[]>([]);
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [newCategoria, setNewCategoria] = useState<{ Nombre: string; Foto: File | null }>({ Nombre: "", Foto: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personasResponse = await axios.get("http://localhost:4000/api/persona/");
        setPersonas(personasResponse.data);

        const tiendasResponse = await axios.get("http://localhost:4000/api/tienda/");
        setTiendas(tiendasResponse.data);

        const categoriasResponse = await axios.get("http://localhost:4000/api/categoria/");
        setCategorias(categoriasResponse.data);
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
        setPersonas((prev) => prev.filter((persona) => persona.CorreoPersona !== correo));
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  const handleDeleteCategoria = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/categoria/${id}`);
        setCategorias((prev) => prev.filter((categoria) => categoria.IdCategoria !== id));
      } catch (error) {
        console.error("Error al eliminar la categoría:", error);
      }
    }
  };

  const handleOpenModal = (categoria?: Categoria) => {
    if (categoria) {
      setSelectedCategoria(categoria);
      setNewCategoria({ Nombre: categoria.NombreCategoria, Foto: null });
    } else {
      setSelectedCategoria(null);
      setNewCategoria({ Nombre: "", Foto: null });
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategoria(null);
    setNewCategoria({ Nombre: "", Foto: null });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewCategoria({ ...newCategoria, Foto: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("NombreCategoria", newCategoria.Nombre);
    if (newCategoria.Foto) {
      formData.append("FotoCategoria", newCategoria.Foto);
    }

    try {
      if (selectedCategoria) {
        // Editar categoría existente
        await axios.put(`http://localhost:4000/api/categoria/${selectedCategoria.IdCategoria}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Actualizar la lista de categorías
        setCategorias((prev) =>
          prev.map((categoria) =>
            categoria.IdCategoria === selectedCategoria.IdCategoria
              ? { ...categoria, NombreCategoria: newCategoria.Nombre, FotoCategoria: newCategoria.Foto ? URL.createObjectURL(newCategoria.Foto) : categoria.FotoCategoria }
              : categoria
          )
        );
      } else {
        // Crear nueva categoría
        await axios.post("http://localhost:4000/api/categoria/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Refrescar la lista de categorías
        const categoriasResponse = await axios.get("http://localhost:4000/api/categoria/");
        setCategorias(categoriasResponse.data);
      }
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    } finally {
      handleModalClose();
    }
  };

  const truncarTexto = (texto: string, maxLength: number) => {
    return texto.length > maxLength ? texto.substring(0, maxLength) + "..." : texto;
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
      <div className="flex flex-col sm:gap-4 sm:py-4 w-full max-w-6xl">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Buscar usuarios o tiendas..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
          <Tabs defaultValue="users">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="users">Usuarios</TabsTrigger>
                <TabsTrigger value="stores">Tiendas</TabsTrigger>
                <TabsTrigger value="category">Categorías</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Usuarios</CardTitle>
                  <CardDescription>
                    Administra todos los usuarios y su información.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-y-auto max-h-60">
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
                        {personas
                          .filter((persona) =>
                            `${persona.NombrePersona} ${persona.ApellidoPersona}`
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((persona) => (
                            <TableRow key={persona.CorreoPersona}>
                              <TableCell className="font-medium">
                                {persona.NombrePersona} {persona.ApellidoPersona}
                              </TableCell>
                              <TableCell>{persona.CorreoPersona}</TableCell>
                              <TableCell>
                                {persona.DescripcionPersona || "NULL"}
                              </TableCell>
                              <TableCell>{persona.TelefonoPersona}</TableCell>
                              <TableCell>
                                {persona.idRolFK === 1 ? "Administrador" : "Cliente"}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  onClick={() => handleDeleteUser(persona.CorreoPersona)}
                                >
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

            <TabsContent value="stores">
              <Card>
                <CardHeader>
                  <CardTitle>Tiendas</CardTitle>
                  <CardDescription>
                    Administra todas las tiendas y su información.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-y-auto max-h-60">
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
                        {tiendas
                          .filter((tienda) =>
                            tienda.NombreTienda.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((tienda) => (
                            <TableRow key={tienda.IdTienda}>
                              <TableCell className="font-medium">
                                {tienda.NombreTienda}
                              </TableCell>
                              <TableCell>
                                {truncarTexto(tienda.DescripcionTienda, 150)}
                              </TableCell>
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

            <TabsContent value="category">
              <Card>
                <CardHeader>
                  <CardTitle>Categorías</CardTitle>
                  <CardDescription>
                    Administra todas las categorías de las tiendas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Button onClick={() => handleOpenModal()}>
                      Agregar Categoría
                    </Button>
                  </div>
                  <div className="overflow-y-auto max-h-60">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Foto</TableHead>
                          <TableHead>Editar</TableHead>
                          <TableHead>Eliminar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categorias.map((categoria) => (
                          <TableRow key={categoria.IdCategoria}>
                            <TableCell>{categoria.IdCategoria}</TableCell>
                            <TableCell className="font-medium">
                              {categoria.NombreCategoria}
                            </TableCell>
                            <TableCell>
                              <img
                                src={categoria.FotoCategoria}
                                alt={categoria.NombreCategoria}
                                className="h-16 w-16 object-cover"
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                onClick={() => handleOpenModal(categoria)}
                              >
                                <PencilIcon className="w-4 h-4" aria-hidden="true" />
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                onClick={() => handleDeleteCategoria(categoria.IdCategoria)}
                              >
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

        {/* Modal para agregar/editar categoría */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold">
                {selectedCategoria ? "Editar Categoría" : "Agregar Categoría"}
              </h2>
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="Nombre de la categoría"
                  value={newCategoria.Nombre}
                  onChange={(e) =>
                    setNewCategoria({ ...newCategoria, Nombre: e.target.value })
                  }
                  className="mt-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2"
                />
                {newCategoria.Foto && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(newCategoria.Foto)}
                      alt="Vista previa"
                      className="h-32 w-32 object-cover"
                    />
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={handleModalClose}
                    className="mr-2"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {selectedCategoria ? "Guardar Cambios" : "Agregar"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
