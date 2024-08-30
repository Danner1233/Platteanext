
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { CategoriaJuguetes } from '@/components/component/categoria-juguetes'
import { CategoriaRelleno } from '@/components/component/categoria-relleno'
import React, { useState, useEffect } from 'react';
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
      <CategoriaJuguetes />

      <Footer />
    </div>
  )
}

export default Page





