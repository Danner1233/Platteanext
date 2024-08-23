import { CarruselTiendas } from '@/components/component/carrusel-tiendas'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { Tiendas } from '@/components/component/tiendas'
import { TiendasM } from '@/components/component/tiendas-m'
import React from 'react'

function page() {
  return (
    <div>
        <NavbarDefault />
        <CarruselTiendas />
        <Tiendas />
        <TiendasM />
        <TiendasM />
        <TiendasM />
        <Footer />
    </div>
  )
}

export default page