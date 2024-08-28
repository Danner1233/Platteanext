"use client"

import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import { Tarjeta } from '@/components/component/tarjeta'
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

      <Tarjeta />
      <Footer />
    </div>
  )
}

export default Page




