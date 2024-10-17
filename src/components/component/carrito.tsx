"use client";

import { JSX, SVGProps, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { LoadingAnimation } from "@/components/component/loading-animation";

interface DecodedToken {
  IdPersona: string;
}

interface ProductoProps {
  onhandleRemoveItem: () => void; // Prop para manejar la eliminación de ítems
}

export function Carrito({ onhandleRemoveItem }: ProductoProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartUpdated, setCartUpdated] = useState(false);
  
  // Estado para controlar las actualizaciones del carrito
  const formatPrice = (precio: string) => {
    // Convertir el precio a número y formatearlo con puntos de miles
    const numero = Number(precio);
    return new Intl.NumberFormat('es-ES').format(numero);
  };
  useEffect(() => {
    async function fetchCarrito() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.IdPersona;

        const response = await fetch(`http://localhost:4000/api/carrito/${userId}`);
        const data = await response.json();
        setItems(Object.values(data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching carrito:", error);
        setLoading(false);
      }
    }

    fetchCarrito();
  }, [cartUpdated]); // Dependencia del estado cartUpdated

  const handleQuantityChange = async (index: number, value: number) => {
    const updatedItems = [...items];
    const maxStock = updatedItems[index].StockProducto;

    if (value > 0 && value <= maxStock) {
      updatedItems[index].cantidad = value;
      setItems(updatedItems);

      const token = localStorage.getItem("token");
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.IdPersona;

        try {
          const response = await fetch(`http://localhost:4000/api/carrito/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              IdPersonaFK: userId,
              IdProductoFK: updatedItems[index].IdProducto,
              Cantidad: value,
            }),
          });

          if (!response.ok) {
            throw new Error("Error al actualizar la cantidad");
          }
          onhandleRemoveItem(); // Llama a la función para manejar la actualización del carrito
        } catch (error) {
          console.error("Error al actualizar la cantidad:", error);
        }
      }
    } else if (value > maxStock) {
      alert(`La cantidad máxima disponible para este producto es ${maxStock}`);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/carrito/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setItems(items.filter((item) => item.IdDetalleCarrito !== itemId));
        onhandleRemoveItem(); // Llama a la función para manejar la actualización del carrito
      } else {
        console.error("Error removing item:", await response.json());
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const subtotal = items.reduce(
    (acc, item) => acc + parseFloat(item.PrecioProducto) * item.cantidad,
    0
  );
  const shipping = 5;
  const total = subtotal + shipping;

  const isEmpty = items.length === 0;

  if (loading) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  const handleProceedToPayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isEmpty) {
      e.preventDefault();
      alert("Tu carrito está vacío. Añade productos antes de proceder al pago.");
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 sm:px-2 lg:px-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Carrito de compras</h1>
      </header>
      <div className="grid md:grid-cols-[1fr_300px] gap-8 sm:grid-cols-1 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-lg transition-shadow hover:shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18v18H3z" className="opacity-0" />
                <path d="M5 8h14l-1.5 8H6.5L5 8z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="20" r="2" />
                <circle cx="16" cy="20" r="2" />
              </svg>
              <p className="text-xl font-semibold text-gray-800 mb-2">¡Oh no! No hay productos en el carrito</p>
              <p className="text-sm text-gray-600 mb-4">Explora nuestra tienda y agrega algunos productos.</p>
              <Link href="/products">
                <Button className="mt-4 bg-plattea1 text-white rounded-lg shadow transition-transform transform hover:scale-105 hover:bg-plattea1">
                  Ir a Comprar
                </Button>
              </Link>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={item.IdProducto}
                className="grid grid-cols-[80px_1fr_80px] items-center gap-4 border-b pb-4 sm:grid-cols-[60px_1fr_60px] lg:grid-cols-[100px_1fr_100px]"
              >
                <img
                  src={item.FotoProductoURL}
                  alt={item.NombreProducto}
                  width={80}
                  height={80}
                  className="rounded-md object-cover sm:w-[60px] sm:h-[60px] lg:w-[100px] lg:h-[100px]"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div>
                  <h3 className="font-medium">{item.NombreProducto}</h3>
                  <p className="text-sm text-muted-foreground">{item.NombreTienda}</p>
                  <p className="text-sm text-muted-foreground">$ {formatPrice(item.PrecioProducto)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleQuantityChange(index, item.cantidad - 1)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <input
                    type="number"
                    value={item.cantidad}
                    min="1"
                    className="w-12 text-center border rounded appearance-none -moz-appearance-textfield"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value > 0) {
                        handleQuantityChange(index, value);
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value > 0) {
                        handleQuantityChange(index, value);
                      } else {
                        handleQuantityChange(index, 1); // Reset to 1 if invalid
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleQuantityChange(index, item.cantidad + 1)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleRemoveItem(item.IdDetalleCarrito)}
                  >
                    <RemoveIcon className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        {!isEmpty && (
          <div className="bg-muted/40 rounded-md p-6 space-y-4 sm:mt-4 lg:mt-0">
            <Separator />
            <div className="flex justify-between font-medium">
              <span className="text-xl" >Total</span >
              <span className="text-xl">${formatPrice(total.toFixed(2))}</span>
            </div>
            < Separator />
            <Link href="/agregartarjeta">
              <Button
                onClick={handleProceedToPayment}
                className={`w-full mt-2 bg-plattea1 text-white rounded-lg shadow transition-transform transform hover:scale-105 hover:bg-plattea1 ${
                  isEmpty ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isEmpty} // Deshabilitar el botón si está vacío
              >
                Proceder al pago
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


function MinusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12 5v14m7-7H5" />
    </svg>
  );
}

function RemoveIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M21 4H8l-1 1H3v2h2l1 13h12l1-13h2V5h-2l-1-1zM8 2h8v2H8z" />
    </svg>
  );
}
