"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { JSX, SVGProps } from "react";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
interface DecodedToken {
  IdPersona: string;
}

interface Profile {
  FotoPersonaURL: string;
}

export function Navbar() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.IdPersona;

        const response = await fetch(`http://localhost:4000/api/persona/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        if (response.ok) {
          const data: Profile = await response.json();
          setProfile(data);
          console.log(data);
        } else {
          throw new Error("Error fetching profile");
        }
      } catch (error) {
        console.error(error);
      }
    };
      
    fetchProfile();
  }, []);

  if (error) return <p>Error: {error}</p>;
  const logout = () => {
    // Elimina el token de localStorage
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };

  return (
    <header className="bg-plattea1 flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <MountainIcon className="h-6 w-6 text-plattea" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-plattea1 px-4 py-2 text-sm font-medium text-plattea2 transition-colors hover:bg-plattea2 hover:text-plattea1 focus:bg-plattea2 focus:text-plattea1 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-plattea2/50 data-[state=open]:bg-plattea2/50"
              prefetch={false}
            >
              Inicio
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href="/shops"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-plattea1 px-4 py-2 text-sm font-medium text-plattea2 transition-colors hover:bg-plattea2 hover:text-plattea1 focus:bg-plattea2 focus:text-plattea1 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-plattea2/50 data-[state=open]:bg-plattea2/50"
              prefetch={false}
            >
              Tiendas
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href="/products"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-plattea1 px-4 py-2 text-sm font-medium text-plattea2 transition-colors hover:bg-plattea2 hover:text-plattea1 focus:bg-plattea2 focus:text-plattea1 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-plattea2/50 data-[state=open]:bg-plattea2/50"
              prefetch={false}
            >
              Productos
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href="/workwithus"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-plattea1 px-4 py-2 text-sm font-medium text-plattea2 transition-colors hover:bg-plattea2 hover:text-plattea1 focus:bg-plattea2 focus:text-plattea1 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-plattea2/50 data-[state=open]:bg-plattea2/50"
              prefetch={false}
            >
              Trabaja con nosotros
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden bg-plattea1 text-plattea2">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-plattea2">
          <Link href="/" prefetch={false}>
            <MountainIcon className="h-6 w-6 text-plattea1" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              href="/shops"
              className="flex w-full items-center py-2 text-lg font-semibold text-plattea1"
              prefetch={false}
            >
              Tiendas
            </Link>
            <Link
              href="/products"
              className="flex w-full items-center py-2 text-lg font-semibold text-plattea1"
              prefetch={false}
            >
              Productos
            </Link>
            <Link
              href="/workwithus"
              className="flex w-full items-center py-2 text-lg font-semibold text-plattea1"
              prefetch={false}
            >
              Trabaja con nosotros
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex gap-2 items-center">
        {/* Ícono de carrito */}
        <Link href="/carrito">
          <Button size="icon" className="bg-plattea1 text-plattea2">
            <CartIcon className="h-6 w-6" />
            <span className="sr-only">Carrito</span>
          </Button>
        </Link>

        {/* Menú de usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="overflow-hidden rounded-full bg-plattea1 text-plattea2"
            >
              <img
                src={profile?.FotoPersonaURL || "/placeholder-user.jpg"}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
                style={{ aspectRatio: "36/36", objectFit: "cover" }}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-plattea2">
            <DropdownMenuLabel className="text-plattea1">Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/perfil" className="text-plattea1">Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/favoritos" className="text-plattea1">Favoritos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/configuracion" className="text-plattea1">Configuración</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="text-plattea1">Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function CartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function NotificationIcon(
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
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
