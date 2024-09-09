"use client"

import React, { useEffect, useState } from 'react';
import { NavbarDefault } from '@/components/component/navbar-default';
import { Navbar } from '@/components/component/navbar';

import { Carrusel } from '@/components/component/carrusel';
import { Footer } from '@/components/component/footer';

import { ProductosDestacados } from '@/components/component/productos-destacados';
import { TiendasDestacadas } from '@/components/component/tiendas-destacadas';


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
      <Carrusel />
      <ProductosDestacados />
      <TiendasDestacadas />
      <Footer />
    </div>
  );
}

export default Page;
