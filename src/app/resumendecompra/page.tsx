"use client";

import { ResumenCompra } from '@/components/component/resumen-compra'
import { Navbar } from '@/components/component/navbar';
import { Footer } from '@/components/component/footer';
import React from 'react'
import { NavbarDefault } from '@/components/component/navbar-default';



function page() {

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
        <ResumenCompra />
        </main>
        <Footer />
    </div>
  )
}

export default page

function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}


function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
