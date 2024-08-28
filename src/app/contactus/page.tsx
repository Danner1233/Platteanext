"use client"
import { Contactanos } from '@/components/component/contactanos'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import React from 'react'
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/component/navbar';

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
      <Contactanos />
      <Footer />
    </div>
  )
}

export default Page





