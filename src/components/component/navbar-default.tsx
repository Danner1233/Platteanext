import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SVGProps } from "react";
import { ShoppingBag } from "lucide-react";

export function NavbarDefault() {
  return (
    <header className="bg-plattea1 flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <ShoppingBag className="h-6 w-6 text-plattea2" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-plattea1 px-4 py-2 text-sm font-medium text-plattea2 transition-colors hover:bg-plattea2 hover:text-plattea1 focus:bg-plattea2 focus:text-plattea1 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Inicio
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href="/shops"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-plattea1 px-4 py-2 text-sm font-medium text-plattea2 transition-colors hover:bg-plattea2 hover:text-plattea1 focus:bg-plattea2 focus:text-plattea1 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Tiendas
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href="/products"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-plattea1 px-4 py-2 text-sm font-medium text-plattea2 transition-colors hover:bg-plattea2 hover:text-plattea1 focus:bg-plattea2 focus:text-plattea1 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Productos
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href="/workwithus"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-plattea1 px-4 py-2 text-sm font-medium text-plattea2 transition-colors hover:bg-plattea2 hover:text-plattea1 focus:bg-plattea2 focus:text-plattea1 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Trabaja con nosotros
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="lg:hidden bg-plattea1 text-plattea2"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-plattea2">
          <Link href="/" prefetch={false}>
            <MountainIcon className="h-6 w-6 text-plattea1" />
            <span className="sr-only">Plattea</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              href="/"
              className="flex w-full items-center py-2 text-lg font-semibold text-plattea1"
              prefetch={false}
            >
              Inicio
            </Link>
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
      <div className="ml-auto flex gap-2">
        <Link href="/register" prefetch={false}>
          <Button className="bg-plattea2 text-plattea1 transition-colors duration-300 hover:bg-[#1C2833] hover:text-plattea2">
            Registrarse
          </Button>
        </Link>
        <Link href="/login" prefetch={false}>
          <Button className="bg-plattea2 text-plattea1 transition-colors duration-300 hover:bg-[#1C2833] hover:text-plattea2">
            Iniciar sesión
          </Button>
        </Link>
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
