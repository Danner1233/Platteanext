"use client"

import { BannerCubiculo } from '@/components/component/banner-cubiculo'
import { EditarFotoCubiculo } from '@/components/component/editar-foto-cubiculo'
import { EditarProductos } from '@/components/component/editar-productos'
import { Footer } from '@/components/component/footer'
import React from 'react'
import { useEffect, useState } from 'react';
import { NavbarDefault } from '@/components/component/navbar-default'
import { Navbar } from '@/components/component/navbar'
import { AgregarProducto } from '@/components/component/agregar-producto'

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
      <EditarProductos />
      <div className="m-4 p-2">
        <AgregarProducto />
      </div>
      <Footer />
    </div>
  )
}

export default Page





