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
  }, [encryptedIdTienda]);

  const truncarTexto = (texto: string, maxLength: number) => {
    return texto.length > maxLength
      ? texto.substring(0, maxLength) + "..."
      : texto;
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">agrega un producto pulsando en el boton de la caja :)</p>;

  return (
    <div className="px-4 md:px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center">Productos de la Tienda</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div key={producto.IdProducto} className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group">
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
              className="object-cover w-full h-64 group-hover:opacity-75 transition-opacity"
              quality={100}
            />
            <div className="p-4 flex flex-col justify-between h-full">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 truncate">{truncarTexto(producto.NombreProducto, 50)}</h3>
                <p className="text-sm text-gray-600 h-20 overflow-hidden overflow-ellipsis">{truncarTexto(producto.DescripcionProducto, 100)}</p>
              </div>
              <h4 className="text-lg font-semibold mt-2">${producto.PrecioProducto}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
