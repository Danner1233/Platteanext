"use client";

import { CarruselTiendas } from "@/components/component/carrusel-tiendas";
import { Footer } from "@/components/component/footer";
import { Tiendas } from "@/components/component/tiendas";
import React, { useEffect, useState } from "react";
import { NavbarDefault } from "@/components/component/navbar-default";
import { Navbar } from "@/components/component/navbar";
import Head from "next/head"; // Asegúrate de importar Head correctamente
import { Busqueda } from "@/components/component/busqueda";

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Tu Título Aquí</title> {/* Título de la pestaña */}
      </Head>

      {isLoggedIn ? <Navbar /> : <NavbarDefault />}
      <CarruselTiendas />
      <Busqueda />
      <Tiendas />
      <Footer />
    </div>
  );
}

export default Page;
