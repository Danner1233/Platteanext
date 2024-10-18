"use client";

import { Footer } from '@/components/component/footer';
import { Historial } from '@/components/component/historial';
import { Navbar } from '@/components/component/navbar';
import { NavbarDefault } from '@/components/component/navbar-default';
import React, { useEffect, useState } from 'react';
import { LoadingAnimation } from '@/components/component/loading-animation';
import { useParams } from 'next/navigation'; // Importa useParams

function Page() {
  const { IdPedido } = useParams(); // Obtiene IdPedido directamente
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false); // Cambia el estado de carga a false después de la verificación
  }, []);

  // Asegúrate de que IdPedido esté definido antes de usarlo
  if (loading || !IdPedido) {
    return <div><LoadingAnimation /></div>; // Mostrar animación de carga
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? <Navbar cartUpdated={false} /> : <NavbarDefault />}
      <main className="flex-grow">
        <Historial idPedido={IdPedido as string} /> {/* Asegúrate de que sea un string */}
      </main>
      <Footer />
    </div>
  );
}

export default Page;
