import { Administrador } from '@/components/component/administrador';
import { Footer } from '@/components/component/footer';
import { Navbar } from '@/components/component/navbar-admin';
import React, { useEffect, useState } from 'react';
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
      <Navbar />
      <main className="flex-grow">
        <Administrador />
      </main>
      <Footer />
    </div>
  );
}

export default Page;
