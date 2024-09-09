"use client"

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/component/footer';
import { NavbarDefault } from '@/components/component/navbar-default';
import { Navbar } from '@/components/component/navbar';
import { CategoriaModa } from '@/components/component/categoria-moda';

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <main className='flex-grow'>
      <CategoriaModa />
      </main>
      <Footer />
    </div>
  );
}

export default Page;
