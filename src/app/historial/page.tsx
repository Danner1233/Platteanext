"use client"
import { Footer } from '@/components/component/footer'
import { Historial } from '@/components/component/historial'
import { Navbar } from '@/components/component/navbar'
import { NavbarDefault } from '@/components/component/navbar-default'
import React from 'react'
import { useEffect, useState } from 'react';




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
      <Historial />
      </main>
      <Footer />
    </div>
  )
}

export default Page




