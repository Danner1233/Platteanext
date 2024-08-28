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
    <div>
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <Carrito />
      <Footer />
    </div>
  )
}

export default Page







