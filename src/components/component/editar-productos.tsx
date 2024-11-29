import NextCrypto from 'next-crypto';
import { SVGProps, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { AgregarProducto } from './agregar-producto';
import { ProductoEditar } from './producto-editar';
import { HistorialComprasButtonComponent } from '../historial-compras-button';
interface Producto {
  IdProducto: string;
  NombreProducto: string;
  DescripcionProducto: string;
  StockProducto: string;
  PrecioProducto: string;
  FotoProducto: string;
}

// Componente de Alerta
const Alert = ({ message, onClose }: { message: string, onClose: () => void }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 300); // Duración de la animación antes de ocultar el alert
    }, 3000); // Tiempo que se muestra el alert

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 bg-platteaGreenv2 text-white p-4 rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out ${isExiting ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => {
              setIsVisible(false);
              onClose();
            }, 300);
          }}
          className="text-white ml-2"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

// Componente de Confirmación
const ConfirmDeleteAlert = ({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
      <h2 className="text-lg font-semibold">¿Estás seguro de que deseas eliminar este producto?</h2>
      <div className="mt-4 flex justify-end">
        <Button onClick={onCancel} className="mr-2">Cancelar</Button>
        <Button onClick={onConfirm} variant="destructive">Eliminar</Button>
      </div>
    </div>
  );
};

export function EditarProductos() {
  const params = useParams();
  const router = useRouter();
  const encryptedIdTienda = params.IdTienda as string;
  const crypto = new NextCrypto('secret key');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [encryptedProductLinks, setEncryptedProductLinks] = useState<Map<string, string>>(new Map());
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Para manejar el mensaje de la alerta
  const [confirmDelete, setConfirmDelete] = useState<{ id: string | null }>({ id: null }); // Para manejar confirmación de eliminación

  const fetchProductos = async () => {
    if (encryptedIdTienda) {
      try {
        const safeIdTienda = encryptedIdTienda.replace(/_/g, '/').replace(/-/g, '+');
        const decryptedId = await crypto.decrypt(decodeURIComponent(safeIdTienda));

        const response = await fetch(`${process.env.SERVER_URL}/api/tienda/producto/${decryptedId}`);
        if (response.status === 404) {
          setProductos([]);
          return;
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Producto[] = await response.json();
        setProductos(data);

        // Encriptar IDs de productos para los enlaces
        const productLinks = new Map<string, string>();
        for (const producto of data) {
          const encryptedId = await crypto.encrypt(producto.IdProducto);
          const safeId = encryptedId.replace(/\//g, '_').replace(/\+/g, '-');
          productLinks.set(producto.IdProducto, safeId);
        }
        setEncryptedProductLinks(productLinks);
      } catch (error: any) {
        setError(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProductos(); // Llamar a la función de fetch al cargar el componente
  }, [encryptedIdTienda]);

  const truncarTexto = (texto: string, maxLength: number) => {
    return texto.length > maxLength
      ? texto.substring(0, maxLength) + "..."
      : texto;
  };

  const formatPrice = (precio: string) => {
    const numero = Number(precio);
    return new Intl.NumberFormat('es-ES').format(numero);
  };

  const handleDelete = async (idProducto: string) => {
    setConfirmDelete({ id: idProducto });
  };

  const confirmDeleteProduct = async () => {
    if (confirmDelete.id) {
      try {
        // Desencriptar el ID antes de eliminar
        const safeIdProducto = confirmDelete.id.replace(/_/g, '/').replace(/-/g, '+');
        const decryptedId = await crypto.decrypt(decodeURIComponent(safeIdProducto));

        if (!decryptedId) {
          throw new Error('El ID desencriptado es nulo o inválido');
        }

        // Llamar a la API para eliminar el producto
        const response = await fetch(`${process.env.SERVER_URL}/api/producto/${decryptedId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error('Error al eliminar el producto: ' + (errorData.message || 'Error desconocido'));
        }

        // Mostrar alerta de éxito
        setAlertMessage('Producto eliminado con éxito');

        // Recargar la lista de productos tras eliminar
        fetchProductos();
      } catch (error: any) {
        console.error('Error al eliminar el producto:', error);
        setAlertMessage('Error al eliminar el producto. Intenta nuevamente más tarde.');
      } finally {
        setConfirmDelete({ id: null }); // Resetear confirmación
      }
    }
  };

  const cancelDelete = () => {
    setConfirmDelete({ id: null });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />} {/* Mostrar alerta */}
      {confirmDelete.id && (
        <ConfirmDeleteAlert
          onConfirm={confirmDeleteProduct}
          onCancel={cancelDelete}
        />
      )}

      <div className="left-4 pt-8 pb-8">
        <Button
          onClick={() => router.back()}
          className="inline-flex h-10 ml-4 items-center justify-center rounded-md border border-input bg-accent text-accent-foreground px-4 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-10 hover:bg-gray-200"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Volver atrás
        </Button>
        <div className="relative mb-6">
          <div className="relative mb-1">
            <div className="flex justify-end gap-4 pr-4">
              <AgregarProducto />
              <HistorialComprasButtonComponent />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6 ml-4">Administración de Productos</h1>

      {productos.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 ml-4 mr-4">
          {productos.map((producto) => {
            const encryptedIdProducto = encryptedProductLinks.get(producto.IdProducto) || '';

            return (
              <div key={producto.IdProducto} className="bg-card rounded-lg overflow-hidden shadow-sm">
                <div className="relative group">
                  <img
                    src={`${process.env.SERVER_URL}/${producto.FotoProducto}` || "/placeholder.svg"}
                    alt={`Imagen de ${producto.NombreProducto}`}
                    width={600}
                    height={400}
                    className="w-full h-[200px] object-cover"
                    style={{ aspectRatio: "600/400", objectFit: "cover" }}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <ProductoEditar
                      encryptedIdProducto={encryptedIdProducto}
                      onProductoActualizado={fetchProductos} // Callback para actualizar productos
                    />
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(encryptedIdProducto)}>
                      <TrashIcon className="w-5 h-5" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </div>
                <div className="p-4 grid gap-2">
                  <h3 className="font-semibold text-lg">{truncarTexto(producto.NombreProducto, 25)}</h3>
                  <p className="text-sm text-muted-foreground">{truncarTexto(producto.DescripcionProducto, 100)}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">${formatPrice(producto.PrecioProducto)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="ml-4">No hay productos disponibles.</p>
      )}
    </div>
  );
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M19 7l-.867 12.142A2 2 0 0116.139 21H7.861a2 2 0 01-1.994-1.858L5 7m5 4v6m4-6v6M10 4h4m-6 0h8m-4-1v1"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}