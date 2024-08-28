import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX, SVGProps } from "react";

export function EditarProductos() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Administración de Productos</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="bg-card rounded-lg overflow-hidden shadow-sm">
          <div className="relative group">
            <img
              src="/placeholder.svg"
              alt="Imagen del Producto"
              width={600}
              height={400}
              className="w-full h-[200px] object-cover"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Link href="/editarproducto">
                <Button size="icon" variant="ghost">
                  <FilePenIcon className="w-5 h-5" />
                  <span className="sr-only">Editar</span>
                </Button>
              </Link>
              <Button size="icon" variant="ghost">
                <TrashIcon className="w-5 h-5" />
                <span className="sr-only">Eliminar</span>
              </Button>
            </div>
          </div>
          <div className="p-4 grid gap-2">
            <h3 className="font-semibold text-lg">Nombre del Producto</h3>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">$99.99</span>
              <div />
            </div>
          </div>
        </div>
        
      </div>
      <div className="m-4 p-2">
          <Link href="/agregarproducto">
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
            Agregar Producto
          </button>
          </Link>
        </div>
    </div>
  );
}

function FilePenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
