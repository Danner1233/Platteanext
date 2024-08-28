"use client"

import { BannerWork } from '@/components/component/banner-work'
import { ComprarTienda } from '@/components/component/comprar-tienda'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import React from 'react'
import { Navbar} from '@/components/component/navbar'
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
        <BannerWork />
        <ComprarTienda />
        <Footer />
    </div>
  )
}

export default Page


