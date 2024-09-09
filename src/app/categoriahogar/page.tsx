"use client";

import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { Navbar } from '@/components/component/navbar'
import { CategoriaHogar } from '@/components/component/categoria-hogar'
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
    <div className='flex flex-col min-h-screen'>
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <main className='flex-grow'>
      <CategoriaHogar />
      </main>
      <Footer />
    </div>
  )
}

export default Page




