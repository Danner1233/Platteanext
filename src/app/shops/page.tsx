"use client"

import { CarruselTiendas } from '@/components/component/carrusel-tiendas';
import { Footer } from '@/components/component/footer';

import { Tiendas } from '@/components/component/tiendas';
import { TiendasM } from '@/components/component/tiendas-m';

import React, { useEffect, useState } from 'react';
import { NavbarDefault } from '@/components/component/navbar-default';
import { Navbar } from '@/components/component/navbar';

function Page() {  // Cambio aquí: 'page' a 'Page'
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
      <CarruselTiendas />
      <Tiendas />
      <Footer />
    </div>
  );
}

export default Page;  // Cambio aquí: 'page' a 'Page'


