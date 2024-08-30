"use client"

import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { Producto } from '@/components/component/producto'
import { Footprints } from 'lucide-react'
import React from 'react'
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/component/navbar';
import { ProductosProducto } from '@/components/component/productos-producto'
import { Comentarios } from '@/components/component/comentarios'

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <Producto />
      <ProductosProducto />
      <Comentarios />
      <Footer />
    </div>
  )
}

export default Page




