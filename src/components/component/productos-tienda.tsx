import NextCrypto from 'next-crypto';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Producto {
  IdProducto: string;
  NombreProducto: string;
  DescripcionProducto: string;
  StockProducto: string;
  PrecioProducto: string;
  FotoProductoURL: string;
}

export function ProductosTienda() {
  const params = useParams();
  const encryptedIdTienda = params.IdTienda as string; // Asegúrate de que sea una cadena
  const crypto = new NextCrypto('secret key');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [encryptedIds, setEncryptedIds] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Reemplazar caracteres en el ID encriptado antes de decodificar
        const safeIdTienda = encryptedIdTienda.replace(/_/g, '/').replace(/-/g, '+');
        // Desencriptar el ID de la tienda
        const decryptedId = await crypto.decrypt(decodeURIComponent(safeIdTienda));

        // Fetch productos usando el ID desencriptado
        const response = await fetch(`http://localhost:4000/api/tienda/producto/${decryptedId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Producto[] = await response.json();
        setProductos(data);

        // Encriptar IDs de productos para usar en los enlaces
        const encrypted = await Promise.all(data.map(async (producto) => {
          const encryptedId = await crypto.encrypt(producto.IdProducto);
          // Reemplazar caracteres problemáticos en el ID encriptado
          const safeId = encryptedId.replace(/\//g, '_').replace(/\+/g, '-');
          return { id: producto.IdProducto, encryptedId: safeId };
        }));

        setEncryptedIds(encrypted.reduce<{ [key: string]: string }>((acc, { id, encryptedId }) => {
          acc[id] = encryptedId;
          return acc;
        }, {}));
      } catch (error: any) {
        setError(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (encryptedIdTienda) {
      fetchProductos();
    }
  }, [ encryptedIdTienda]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-4 md:px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Productos de la Tienda</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div key={producto.IdProducto} className="relative overflow-hidden rounded-lg group">
            <Link
              href={`/product/${encryptedIds[producto.IdProducto] || ''}`}
              className="absolute inset-0 z-10"
              prefetch={false}
            >
              <span className="sr-only">View</span>
            </Link>
            <Image
              src={producto.FotoProductoURL || "/placeholder.svg"}
              alt={producto.NombreProducto}
              width={400}
              height={400}
              className="object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
              quality={100}
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold">{producto.NombreProducto}</h3>
              <p className="text-sm text-muted-foreground">{producto.DescripcionProducto}</p>
              <h4 className="text-base font-semibold">${producto.PrecioProducto}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
