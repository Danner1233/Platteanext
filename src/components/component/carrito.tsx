"use client";

import { JSX, SVGProps, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function Carrito() {
  const [quantities, setQuantities] = useState([0, 0, 0]);

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleRemoveItem = (index: number) => {
    // Eliminar producto - función vacía
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 sm:px-2 lg:px-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Carrito de compras</h1>
      </header>
      <div className="grid md:grid-cols-[1fr_300px] gap-8 sm:grid-cols-1 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          {quantities.map((quantity, index) => (
            <div
              key={index}
              className="grid grid-cols-[80px_1fr_80px] items-center gap-4 border-b pb-4 sm:grid-cols-[60px_1fr_60px] lg:grid-cols-[100px_1fr_100px]"
            >
              <img
                src="/placeholder.svg"
                alt="Producto"
                width={80}
                height={80}
                className="rounded-md object-cover sm:w-[60px] sm:h-[60px] lg:w-[100px] lg:h-[100px]"
                style={{ aspectRatio: "80/80", objectFit: "cover" }}
              />
              <div>
                <h3 className="font-medium">Producto {index + 1}</h3>
                <p className="text-sm text-muted-foreground">Descripción</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(index, quantity - 1)}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span>{quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(index, quantity + 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleRemoveItem(index)}
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
            <span className="font-medium">
              $
              {(
                149.97 * quantities.reduce((acc, quantity) => acc + quantity, 0)
              ).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span className="font-medium">$5.00</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-medium">
              $
              {(
                149.97 *
                  quantities.reduce((acc, quantity) => acc + quantity, 0) +
                5
              ).toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/products">
              <Button variant="outline" className="flex-1">
                Continuar comprando
              </Button>
            </Link>
            <Button className="flex-1 bg-plattea1">Proceder al pago</Button>
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
