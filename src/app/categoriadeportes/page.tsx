"use client";
import { Footer } from '@/components/component/footer'
import { CategoriaDeportes } from '@/components/component/categoria-deportes'
import { NavbarDefault } from '@/components/component/navbar-default'
import { Navbar } from '@/components/component/navbar'
import React, { useState, useEffect } from 'react';
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
      <CategoriaDeportes />

      <Footer />
    </div>
  )
}

export default Page




