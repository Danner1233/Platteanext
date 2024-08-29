"use client"

import { Banner } from '@/components/component/banner'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { ProductosTienda } from '@/components/component/productos-tienda'
import React from 'react'
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/component/navbar';



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
      <Banner />
      <ProductosTienda />
      <Footer />
    </div>
  )
}

export default Page