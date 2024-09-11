// pages/[IdProducto]/page.tsx

"use client"

import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { Producto } from '@/components/component/producto'
import { ProductosProducto } from '@/components/component/productos-producto'
import { Comentariodos } from '@/components/component/comentariodos'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/component/navbar';
import { Comentarios } from '@/components/component/comentarios'

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { IdProducto } = useParams(); // Obtiene el ID del producto de la URL

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Convierte IdProducto a un string si es un array
  const idProducto = Array.isArray(IdProducto) ? IdProducto[0] : IdProducto;

  return (
    <div>
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <Producto />
      <ProductosProducto />
      <Comentariodos idProducto={idProducto ||''}  />
  
      <Footer />
    </div>
  );
}

export default Page;
