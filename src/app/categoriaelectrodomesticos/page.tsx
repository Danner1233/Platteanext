
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { Navbar } from '@/components/component/navbar'
import { CategoriaElectrodomesticos } from '@/components/component/categoria-electrodomesticos'
import { CategoriaRelleno } from '@/components/component/categoria-relleno'
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
      <CategoriaElectrodomesticos />

      <Footer />
    </div>
  )
}

export default Page





