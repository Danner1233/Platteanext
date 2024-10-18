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

  const formatPrice = (precio: string) => {
    const numero = Number(precio);
    return new Intl.NumberFormat("es-ES").format(numero);
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
  }, [cartUpdated]);

  const handleQuantityChange = (index: number, value: string) => {
    const updatedItems = [...items];
    const maxStock = updatedItems[index].StockProducto;
    const numericValue = parseInt(value, 10);
  
    // Verificar si el valor es un número
    if (!isNaN(numericValue) && numericValue > 0) {
      if (numericValue <= maxStock) {
        // Si la cantidad es menor o igual al stock, establecer el valor
        updatedItems[index].cantidad = numericValue;
      } else {
        // Si la cantidad es mayor al stock, alertar al usuario
        alert(`La cantidad máxima disponible para este producto es ${maxStock}`);
        updatedItems[index].cantidad = maxStock; // Ajustar a la cantidad máxima
      }
      setItems(updatedItems);
    } else if (value === "") {
      // Si el campo está vacío, establecer la cantidad a vacío
      updatedItems[index].cantidad = "";
      setItems(updatedItems);
    }
  };
  

  const handleQuantityBlur = async (index: number) => {
    const updatedItems = [...items];
    const value = updatedItems[index].cantidad;
    const maxStock = updatedItems[index].StockProducto;
  
    if (value === "" || value <= 0) {
      updatedItems[index].cantidad = 1; // Establecer valor mínimo de 1 si está vacío
    } else {
      const numericValue = parseInt(value, 10);
      // Ajustar al stock si la cantidad excede el stock disponible
      if (numericValue > maxStock) {
        alert(`La cantidad máxima disponible para este producto es ${maxStock}`);
        updatedItems[index].cantidad = maxStock; // Ajustar a la cantidad máxima
      }
    }
    
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
            Cantidad: updatedItems[index].cantidad,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Error al actualizar la cantidad");
        }
  
        onhandleRemoveItem();
      } catch (error) {
        console.error("Error al actualizar la cantidad:", error);
      }
    }
  };
  
  const handleRemoveItem = async (itemId: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/carrito/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setItems(items.filter((item) => item.IdDetalleCarrito !== itemId));
        onhandleRemoveItem();
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
              <p className="text-xl font-semibold text-gray-800 mb-2">
                ¡Oh no! No hay productos en el carrito
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Explora nuestra tienda y agrega algunos productos.
              </p>
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
                className="grid grid-cols-[80px_1fr_80px] items-center gap-4 border-b margin-r-30 pb-4 sm:grid-cols-[60px_1fr_60px] lg:grid-cols-[100px_1fr_100px]"
              >
                <img
                  src={item.FotoProductoURL}
                  alt={item.NombreProducto}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div>
                  <h3 className="font-medium">{item.NombreProducto}</h3>
                  <p className="text-sm text-muted-foreground">{item.NombreTienda}</p>
                  <p className="text-sm text-muted-foreground">$ {formatPrice(item.PrecioProducto)}</p>
                </div>

                <div className="flex items-center rounded-lg ">
                  <Button
                    size="icon"
                    className="p-2 bg-white hover:bg-gray-100 text-black"
                    onClick={() => handleQuantityChange(index, (item.cantidad - 1).toString())}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <input
                    value={item.cantidad}
                    className="w-8 text-center appearance-none -moz-appearance-textfield outline-none"
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    onBlur={() => handleQuantityBlur(index)}
                  />
                  <Button
                    size="icon"
                    className="p-2 bg-white hover:bg-gray-100 text-black"
                    onClick={() => handleQuantityChange(index, (item.cantidad + 1).toString())}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="p-2 bg-white hover:bg-gray-100 text-red-600"
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
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${formatPrice(subtotal.toFixed(2))}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span className="font-medium">${formatPrice(shipping.toFixed(2))}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${formatPrice(total.toFixed(2))}</span>
            </div>
            <Link href="/agregartarjeta">
              <Button
                onClick={handleProceedToPayment}
                className={`w-full mt-2 bg-plattea1 text-white rounded-lg shadow transition-transform transform hover:scale-105 hover:bg-plattea1`}
              >
                Continuar al pago
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Iconos para botones
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