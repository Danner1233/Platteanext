import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

export function Tarjeta() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-9">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Agregar Tarjeta de Crédito</CardTitle>
            <CardDescription>Ingresa tu información de pago.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Número de Tarjeta</Label>
              <Input
                id="card-number"
                placeholder="Ingresa el número de tu tarjeta"
                type="text"
                pattern="[0-9]{16}"
                maxLength={16}
                className="pr-12"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Fecha de Vencimiento</Label>
                <Input
                  id="expiry-date"
                  placeholder="MM/AA"
                  type="text"
                  pattern="[0-9]{2}/[0-9]{2}"
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="CVC"
                  type="text"
                  pattern="[0-9]{3,4}"
                  maxLength={4}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardholder-name">Nombre del Titular</Label>
              <Input
                id="cardholder-name"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                placeholder="Ingresa tu ciudad"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                placeholder="Ingresa tu dirección"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              href="/"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Volver
            </Link>
            <Link href="/resumendecompra">
              <Button className="ml-auto">Agregar Tarjeta</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function CreditCardIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function ViewIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  );
}
