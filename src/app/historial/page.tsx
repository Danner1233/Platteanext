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
    <div>
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <Historial />
      <Footer />
    </div>
  )
}

export default Page




