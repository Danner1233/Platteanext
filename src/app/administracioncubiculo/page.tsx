"use client"

import { BannerCubiculo } from '@/components/component/banner-cubiculo'
import { EditarFotoCubiculo } from '@/components/component/editar-foto-cubiculo'
import { EditarProductos } from '@/components/component/editar-productos'
import { Footer } from '@/components/component/footer'
import React from 'react'
import { useEffect, useState } from 'react';
import { NavbarDefault } from '@/components/component/navbar-default'
import { Navbar } from '@/components/component/navbar'


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
      <BannerCubiculo />
      <EditarFotoCubiculo />
      <EditarProductos />
      <Footer />
    </div>
  )
}

export default Page





