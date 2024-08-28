"use client"

import { Footer } from '@/components/component/footer'
import { SobreNosotros } from '@/components/component/sobre-nosotros'
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
    <div>

      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <SobreNosotros />
      <Footer />
    </div>
  )
}

export default Page






