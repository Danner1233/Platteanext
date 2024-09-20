"use client";

import { AgregarProducto } from '@/components/component/agregar-producto';
import { Footer } from '@/components/component/footer';
import React, { useEffect, useState } from 'react';
import { NavbarDefault } from '@/components/component/navbar-default';
import { Navbar } from '@/components/component/navbar';
import { LoadingAnimation } from '@/components/component/loading-animation';

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false); // Cambiar el estado de carga a false después de la verificación
  }, []);

  if (loading) {
    return <div><LoadingAnimation /></div>; // Mostrar animación de carga
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <main className="flex-grow">
        <AgregarProducto />
      </main>
      <Footer />
    </div>
  );
}

export default Page;
