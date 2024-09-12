import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import NextCrypto from 'next-crypto';
import { JSX, SVGProps } from "react";

interface Producto {
  IdProducto: string;
  NombreProducto: string;
  DescripcionProducto: string;
  PrecioProducto: number;
  FotoProductoURL: string;
  StockProducto: number;
  IdCategoriaFK: number;
  IdTiendaFK: number;
}

export function EditarProducto() {
  const params = useParams();
  const encryptedIdProducto = params.IdProducto as string; // Asegúrate de que sea una cadena
  const [producto, setProducto] = useState<Producto | null>(null);
  const crypto = new NextCrypto('secret key');

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        // Reemplazar caracteres en el ID encriptado antes de decodificar
        const safeIdProducto = encryptedIdProducto.replace(/_/g, '/').replace(/-/g, '+');
        const decodedId = decodeURIComponent(safeIdProducto);
        const decrypted = await crypto.decrypt(decodedId);

        // Fetch el producto con el ID desencriptado
        const response = await fetch(`http://localhost:4000/api/producto/${decrypted}`);
        if (response.ok) {
          const data = await response.json();
          setProducto(data[0]); // Asigna el primer objeto del array a producto
        } else {
          throw new Error("Error fetching product");
        }
      } catch (error) {
        console.error("Error en fetchProducto:", error);
      }
    };

    if (encryptedIdProducto) {
      fetchProducto();
    }
  }, [encryptedIdProducto]);

  

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Editar producto</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Edite en este formulario el producto</p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-foreground">Nombre del producto</label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  defaultValue={producto.NombreProducto}
                  className="block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-muted-foreground/10 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-foreground">Descripción del producto</label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={producto.DescripcionProducto}
                  className="block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-muted-foreground/10 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Ingresa la descripción del producto..."
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-foreground">Precio</label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  min={0}
                  step={0.01}
                  defaultValue={producto.PrecioProducto}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-muted-foreground/10 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-foreground">Categoría</label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue={producto.IdCategoriaFK}
                  className="block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-muted-foreground/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="1">Moda</option>
                  <option value="2">Electrodomésticos</option>
                  <option value="3">Hogar</option>
                  <option value="4">Deportes</option>
                  <option value="5">Juguetes</option>
                  <option value="6">Belleza</option>
                  <option value="7">Electrónica</option>
                  <option value="8">Libros</option>
                  <option value="9">Comida</option>
                  <option value="10">Salud</option>
                  <option value="11">Oficina</option>
                  <option value="12">Jardín</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="images" className="block text-sm font-medium leading-6 text-foreground">Imágenes del producto</label>
              <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-muted-foreground/20 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <img src={producto.FotoProductoURL} alt="Producto" className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-foreground"
                    >
                      <span>Subir un archivo</span>
                      <input id="images" name="images" type="file" multiple className="sr-only" />
                    </label>
                    <p className="pl-1">o arrastra y suelta</p>
                  </div>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF hasta 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">Guardar producto</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
