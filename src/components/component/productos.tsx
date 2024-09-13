"use client";

import { useEffect, useState, JSX, SVGProps } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Producto {
  IdProducto: string;
  NombreProducto: string;
  DescripcionProducto: string;
  PrecioProducto: string; // Asegúrate de que este campo sea un número en tu API
  FotoProductoURL: string;
  NombreTienda: string;
  PromedioCalificacion: number;
}

export function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);
  const [error, setError] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | ''>(''); // Estado para el precio mínimo
  const [maxPrice, setMaxPrice] = useState<number | ''>(''); // Estado para el precio máximo
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Estado para el orden de los precios
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]); // Estado para el rango de precios seleccionado

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/producto`);
        if (response.ok) {
          let data: Producto[] = await response.json();
          data = mezclarArray(data);
          setProductos(data);
          setFilteredProducts(data); // Inicializar con todos los productos
        } else {
          throw new Error("Error al obtener los productos");
        }
      } catch (error) {
        console.error(error);
        setError("Error al obtener los productos");
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const filtered = productos.filter(producto => {
      const precio = parseFloat(producto.PrecioProducto);
      const withinPriceRange = (minPrice === '' || precio >= minPrice) && (maxPrice === '' || precio <= maxPrice);
      return producto.NombreProducto.toLowerCase().includes(search.toLowerCase()) && withinPriceRange;
    });

    const sorted = filtered.sort((a, b) => {
      const precioA = parseFloat(a.PrecioProducto);
      const precioB = parseFloat(b.PrecioProducto);
      return sortOrder === 'asc' ? precioA - precioB : precioB - precioA;
    });

    setFilteredProducts(sorted);
  }, [search, productos, minPrice, maxPrice, sortOrder]);

  function mezclarArray(array: Producto[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const priceRanges = [
    { range: [0, 50], label: "$0 - $50" },
    { range: [50, 100], label: "$50 - $100" },
    { range: [100, 200], label: "$100 - $200" },
    { range: [200, 500], label: "$200 - $500" },
  ];

  const handlePriceFilter = (min: number, max: number) => {
    // Si el rango seleccionado es el mismo, lo deseleccionamos
    if (selectedPriceRange[0] === min && selectedPriceRange[1] === max) {
      setMinPrice('');
      setMaxPrice('');
      setSelectedPriceRange([]);
    } else {
      setMinPrice(min);
      setMaxPrice(max);
      setSelectedPriceRange([min, max]); // Actualiza el rango de precios seleccionado
    }
  };

  const handleSortOrder = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const truncarTexto = (texto: string, maxLength: number) => {
    return texto.length > maxLength
      ? texto.substring(0, maxLength) + "..."
      : texto;
  };

  const isPriceRangeSelected = (range: number[]) => {
    return selectedPriceRange[0] === range[0] && selectedPriceRange[1] === range[1];
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Actualiza el estado de búsqueda
            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
          <div className="flex items-center overflow-x-auto pb-10 border-b border-gray-300 mt-4">
            {priceRanges.map(({ range, label }) => (
              <Button
                key={label}
                variant="outline"
                className={`mr-4 ${isPriceRangeSelected(range) ? 'bg-plattea1 text-white' : ''}`} // Cambia el color si está seleccionado
                onClick={() => handlePriceFilter(range[0], range[1])}
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="flex space-x-4 mt-4">
            <Button
              variant="outline"
              onClick={() => handleSortOrder('asc')}
              className={sortOrder === 'asc' ? 'bg-plattea1 text-white' : ''} // Cambia el color si está seleccionado
            >
              Ordenar por precio: Menor a Mayor
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSortOrder('desc')}
              className={sortOrder === 'desc' ? 'bg-plattea1 text-white' : ''} // Cambia el color si está seleccionado
            >
              Ordenar por precio: Mayor a Menor
            </Button>
          </div>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold mb-5">Productos</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((producto) => (
          <Link key={producto.IdProducto} href={`/product/${producto.IdProducto}`} prefetch={false}>
            <div className="relative flex flex-col overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={producto.FotoProductoURL}
                  alt={producto.NombreProducto}
                  width={500}
                  height={400}
                  className="object-cover w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-col justify-between p-4 bg-background h-full">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 truncate">{truncarTexto(producto.NombreProducto, 50)}</h3>
                  <p className="text-sm text-muted-foreground h-16 overflow-hidden overflow-ellipsis">
                    {truncarTexto(producto.DescripcionProducto, 100)}
                  </p>
                </div>
                <h4 className="text-lg font-semibold md:text-xl mt-2">${producto.PrecioProducto}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ShoppingBagIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
