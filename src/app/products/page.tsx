"use client"
import { FiltroProductos } from '@/components/component/filtro-productos'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { Productos } from '@/components/component/productos'
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
      < FiltroProductos />
      <Productos />
      <Footer />
    </div>
  )
}

export default Page




