"use client"

import { BannerPerfil } from '@/components/component/banner-perfil'
import { Footer } from '@/components/component/footer'
import { ProductosPerfil } from '@/components/component/productos-perfil'
import React from 'react'
import  { useEffect, useState } from 'react';
import { Navbar } from '@/components/component/navbar';
import { NavbarDefault } from '@/components/component/navbar-default';

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
        <BannerPerfil />
        <ProductosPerfil />
        <Footer />
    </div>
  )
}

export default Page


