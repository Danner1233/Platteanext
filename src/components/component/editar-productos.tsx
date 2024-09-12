import NextCrypto from 'next-crypto';
import { SVGProps, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { AgregarProducto } from './agregar-producto';

interface Producto {
  IdProducto: string;
  NombreProducto: string;
  DescripcionProducto: string;
  StockProducto: string;
  PrecioProducto: string;
  FotoProductoURL: string;
}

export function EditarProductos() {
  const params = useParams();
  const router = useRouter();
  const encryptedIdTienda = params.IdTienda as string;
  const crypto = new NextCrypto('secret key');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (encryptedIdTienda) {
      const fetchProductos = async () => {
        try {
          const safeIdTienda = encryptedIdTienda.replace(/_/g, '/').replace(/-/g, '+');
          const decryptedId = await crypto.decrypt(decodeURIComponent(safeIdTienda));

          const response = await fetch(`http://localhost:4000/api/tienda/producto/${decryptedId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: Producto[] = await response.json();
          setProductos(data);
        } catch (error: any) {
          setError(error.message || 'An unexpected error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchProductos();
    }
  }, [encryptedIdTienda]);

  useEffect(() => {
    if (productoSeleccionado) {
      // Logic to handle selected product in a form (e.g., pre-filling form fields)
    }
  }, [productoSeleccionado]);

  // Función para truncar el texto con puntos suspensivos
  const truncarTexto = (texto: string, maxLength: number) => {
    return texto.length > maxLength
      ? texto.substring(0, maxLength) + "..."
      : texto;
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = async (idProducto: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmed) return;

    try {
      const encryptedId = await crypto.encrypt(idProducto);
      const safeId = encryptedId.replace(/\//g, '_').replace(/\+/g, '-');

      const response = await fetch(`http://localhost:4000/api/producto/${idProducto}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }

      setProductos((prevProductos) => prevProductos.filter(producto => producto.IdProducto !== idProducto));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <div className="left-4 pt-8 pb-8">
        <Button onClick={() => router.back()} className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-accent text-accent-foreground px-4 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-10">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Volver atrás
        </Button>
        <div className="relative">
          <div className="absolute right-10">
            <AgregarProducto />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6">Administración de Productos</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.IdProducto} className="bg-card rounded-lg overflow-hidden shadow-sm">
              <div className="relative group">
                <img
                  src={producto.FotoProductoURL || "/placeholder.svg"}
                  alt={`Imagen de ${producto.NombreProducto}`}
                  width={600}
                  height={400}
                  className="w-full h-[200px] object-cover"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Link href={`/editarproducto/${producto.IdProducto}`}>
                    <Button size="icon" variant="ghost" onClick={() => setProductoSeleccionado(producto)}>
                      <FilePenIcon className="w-5 h-5" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </Link>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(producto.IdProducto)}>
                    <TrashIcon className="w-5 h-5" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </div>
              <div className="p-4 grid gap-2">
                <h3 className="font-semibold text-lg">{truncarTexto(producto.NombreProducto, 25)}</h3>
                <p className="text-sm text-muted-foreground"> {truncarTexto(producto.DescripcionProducto, 100)}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">${producto.PrecioProducto}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles. Puedes agregar uno nuevo a continuación.</p>
        )}
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
