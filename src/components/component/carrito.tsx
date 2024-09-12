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

export function Carrito() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCarrito() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.IdPersona;

        const response = await fetch(
          `http://localhost:4000/api/carrito/${userId}`
        );
        const data = await response.json();
        setItems(Object.values(data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching carrito:", error);
        setLoading(false);
      }
    }

    fetchCarrito();
  }, []);

  const handleQuantityChange = async (index: number, value: number) => {
    if (value > 0) {
      const updatedItems = [...items];
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
        } catch (error) {
          console.error("Error al actualizar la cantidad:", error);
        }
      }
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
      console.log(`http://localhost:4000/api/carrito/${itemId}`, typeof itemId);
      if (response.ok) {
        setItems(items.filter((item) => item.IdDetalleCarrito !== itemId));
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

  if (loading) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 sm:px-2 lg:px-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Carrito de compras</h1>
      </header>
      <div className="grid md:grid-cols-[1fr_300px] gap-8 sm:grid-cols-1 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          {items.map((item, index) => (
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
                <p className="text-sm text-muted-foreground">
                  {item.NombreTienda}
                </p>
                <p className="text-sm text-muted-foreground">
                  $ {item.PrecioProducto}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(index, item.cantidad - 1)}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span>{item.cantidad}</span>
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
          ))}
        </div>
        <div className="bg-muted/40 rounded-md p-6 space-y-4 sm:mt-4 lg:mt-0">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span className="font-medium">$5.00</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/products">
              <Button variant="outline" className="flex-1">
                Continuar comprando
              </Button>
            </Link>

            <Link href="/agregartarjeta">
              <Button className="flex-1 bg-plattea1">Proceder al pago</Button>
            </Link>
          </div>
        </div>
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
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
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
