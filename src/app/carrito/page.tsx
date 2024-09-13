"use client"

import { Carrito } from '@/components/component/carrito'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import React from 'react'
import { useEffect, useState } from 'react';
import { NavbarDefault } from '@/components/component/navbar-default'

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <main className="flex-grow">
        <Carrito />
      </main>
      <Footer />
    </div>
  )
}

export default Page
