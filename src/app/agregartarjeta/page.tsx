"use client"

import { Footer } from '@/components/component/footer';
import { Navbar } from '@/components/component/navbar'
import { NavbarDefault } from '@/components/component/navbar-default'
import { Tarjeta } from '@/components/component/tarjeta'
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
      <Tarjeta />
      </main>
      <Footer />
    </div>
  )
}

export default Page




