"use client";

import { CarruselTiendas } from "@/components/component/carrusel-tiendas";
import { Footer } from "@/components/component/footer";
import { Tiendas } from "@/components/component/tiendas";
import React, { useEffect, useState } from "react";
import { NavbarDefault } from "@/components/component/navbar-default";
import { Navbar } from "@/components/component/navbar";
import Head from "next/head"; // Asegúrate de importar Head correctamente
import { Busqueda } from "@/components/component/busqueda";
import { Nosotros } from "@/components/component/nosotros";

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <main className="flex-grow">
        <Nosotros />
      </main>
      <Footer />
    </div>
  );
}

export default Page;