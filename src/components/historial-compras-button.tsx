"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Tipos
type ProductoVendido = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
};

type Comprador = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaCompra: string;
};

type Tienda = {
  id: number;
  nombre: string;
  productos: ProductoVendido[];
  compradores: Comprador[];
};

// Datos de ejemplo (en un caso real, estos datos vendrían de una API o base de datos)
const tiendas: Tienda[] = [
  {
    id: 1,
    nombre: "Tienda Central",
    productos: [
      { id: 1, nombre: "Camiseta", cantidad: 50, precio: 19.99 },
      { id: 2, nombre: "Pantalón", cantidad: 30, precio: 39.99 },
    ],
    compradores: [
      {
        id: 1,
        nombre: "Juan Pérez",
        email: "juan@example.com",
        telefono: "+1234567890",
        direccion: "Calle 123, Ciudad A",
        fechaCompra: "2023-05-15",
      },
      {
        id: 2,
        nombre: "María García",
        email: "maria@example.com",
        telefono: "+1987654321",
        direccion: "Avenida 456, Ciudad B",
        fechaCompra: "2023-05-16",
      },
    ],
  },
  // Puedes agregar más tiendas aquí si lo deseas
];

function CompradorItem({
  comprador,
  tiendaNombre,
  onSelect,
}: {
  comprador: Comprador;
  tiendaNombre: string;
  onSelect: () => void;
}) {
  return (
    <li
      className="p-4 hover:bg-gray-100 cursor-pointer transition-colors"
      onClick={onSelect}
    >
      <div className="flex justify-between">
        <div className="text-sm font-medium text-gray-900">
          {comprador.nombre}
        </div>
        <div className="text-sm text-gray-500">{tiendaNombre}</div>
      </div>
      <div className="mt-1 text-sm text-gray-500">
        Fecha de compra: {comprador.fechaCompra}
      </div>
    </li>
  );
}

export function HistorialComprasButtonComponent() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [selectedTienda, setSelectedTienda] = React.useState<Tienda | null>(
    null
  );
  const [selectedComprador, setSelectedComprador] =
    React.useState<Comprador | null>(null);

  const handleCompradorSelect = (tienda: Tienda, comprador: Comprador) => {
    setSelectedTienda(tienda);
    setSelectedComprador(comprador);
  };

  const handleCloseModal = () => {
    setSelectedTienda(null);
    setSelectedComprador(null);
  };

  return (
    <>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Historial de Compras</Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0 w-[300px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Compradores</h2>
            </div>
            <ScrollArea className="flex-1">
              <ul className="divide-y divide-gray-200">
                {tiendas.flatMap((tienda) =>
                  tienda.compradores.map((comprador) => (
                    <CompradorItem
                      key={comprador.id}
                      comprador={comprador}
                      tiendaNombre={tienda.nombre}
                      onSelect={() => handleCompradorSelect(tienda, comprador)}
                    />
                  ))
                )}
              </ul>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog
        open={selectedTienda !== null && selectedComprador !== null}
        onOpenChange={handleCloseModal}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedTienda?.nombre} - Detalles de Compra
            </DialogTitle>
          </DialogHeader>
          {selectedTienda && selectedComprador && (
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Datos del Comprador
                  </h3>
                  <p>
                    <strong>Nombre:</strong> {selectedComprador.nombre}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedComprador.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {selectedComprador.telefono}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {selectedComprador.direccion}
                  </p>
                  <p>
                    <strong>Fecha de Compra:</strong>{" "}
                    {selectedComprador.fechaCompra}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Resumen de Compra
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTienda.productos.map((producto) => (
                        <TableRow key={producto.id}>
                          <TableCell>{producto.nombre}</TableCell>
                          <TableCell className="text-right">
                            {producto.cantidad}
                          </TableCell>
                          <TableCell className="text-right">
                            ${(producto.cantidad * producto.precio).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 text-right font-semibold">
                    Total: $
                    {selectedTienda.productos
                      .reduce(
                        (sum, producto) =>
                          sum + producto.cantidad * producto.precio,
                        0
                      )
                      .toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
