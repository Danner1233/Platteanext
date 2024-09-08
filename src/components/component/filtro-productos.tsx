"use client";

import { useState, useEffect, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Define la interfaz de filtros
interface Filters {
  category: string[];
  price: {
    min: number;
    max: number;
  };
  features: string[];
}

export function FiltroProductos() {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    category: [],
    price: { min: 0, max: 1000 },
    features: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isClient || !isLoaded) return null;

  const handleFilterChange = (type: "category" | "price" , value: any) => {
    setSelectedFilters((prevFilters) => {
      switch (type) {
        case "category":
          return {
            ...prevFilters,
            category: prevFilters.category.includes(value)
              ? prevFilters.category.filter((item) => item !== value)
              : [...prevFilters.category, value],
          };
        case "price":
          return {
            ...prevFilters,
            price: value, // Asegúrate de que `value` sea del tipo `{ min: number; max: number; }`
          };

        default:
          console.warn(`Unhandled filter type: ${type}`);
          return prevFilters;
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchCollapse = () => {
    setIsSearchExpanded(false);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-background shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Productos</h1>
          <div
            className={`relative w-full max-w-md transition-all duration-300 ${
              isSearchExpanded ? "flex" : "hidden md:flex"
            }`}
          >
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <SearchIcon />
            </div>
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="pl-8 w-full rounded-lg bg-background"
              value={searchTerm}
              onChange={handleSearch}
            />
            {isSearchExpanded && (
              <Button size="icon" variant="ghost" className="absolute right-2 top-2" onClick={handleSearchCollapse}>
                <XIcon className="h-5 w-5" />
              </Button>
            )}
          </div>
          <Button size="icon" variant="ghost" className="md:hidden" onClick={handleSearchExpand}>
            <SearchIcon className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <div className="container mx-auto px-4 md:px-6 grid gap-10 items-start py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex items-center gap-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger className="text-base font-semibold">Categoría</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.category.includes("Ropa")}
                      onCheckedChange={() => handleFilterChange("category", "Ropa")}
                    />
                    Ropa
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.category.includes("Calzado")}
                      onCheckedChange={() => handleFilterChange("category", "Calzado")}
                    />
                    Calzado
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.category.includes("Accesorios")}
                      onCheckedChange={() => handleFilterChange("category", "Accesorios")}
                    />
                    Accesorios
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="price">
              <AccordionTrigger className="text-base font-semibold">Precio</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div className="w-full" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      ${selectedFilters.price.min} - ${selectedFilters.price.max}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
