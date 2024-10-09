"use client";

import { Footer } from '@/components/component/footer';
import { NavbarDefault } from '@/components/component/navbar-default';
import { Producto } from '@/components/component/producto';
import { ProductosProducto } from '@/components/component/productos-producto';
import { Comentariodos } from '@/components/component/comentariodos';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/component/navbar';
import { LoadingAnimation } from '@/components/component/loading-animation';

function Page() {
  const { IdProducto } = useParams(); // Obtiene el ID del producto de la URL
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Establece el estado según la existencia del token
    setLoading(false); // Establece loading en false después de verificar el token
  }, []);

  // Convierte IdProducto a un string si es un array
  const idProducto = Array.isArray(IdProducto) ? IdProducto[0] : IdProducto;

  if (loading) {
    return <div><LoadingAnimation/></div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <div className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
    <Producto />
  </div>

  {/* Sección de Productos Similares */}
  <div className="w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <ProductosProducto encryptedIdProducto={idProducto || ''} />
  </div>
      <main className="flex-grow">
        <Comentariodos idProducto={idProducto || ''} />
      </main>
      <Footer />
    </div>
  );
}

export default Page;
