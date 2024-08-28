"use client"

import { Favoritos } from '@/components/component/favoritos'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import React from 'react'
import { useEffect, useState } from 'react';

import { NavbarDefault } from '@/components/component/navbar-default'

function Pages() {
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
      <Favoritos />
      <Footer />
    </div>
  )
}

export default Pages



