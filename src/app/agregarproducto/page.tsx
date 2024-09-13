"use client"

import { AgregarProducto } from '@/components/component/agregar-producto'
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
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <main className="flex-grow">
        <AgregarProducto /> 
        </main>
        <Footer /> 
    </div>
  )
}

export default Page





