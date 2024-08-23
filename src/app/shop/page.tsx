import { Banner } from '@/components/component/banner'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { ProductosTienda } from '@/components/component/productos-tienda'
import { TituloTienda } from '@/components/component/titulo-tienda'
import React from 'react'

function page() {
  return (
    <div>
        <NavbarDefault/>
        <Banner />
        <TituloTienda />
        <ProductosTienda />
        <Footer/>
    </div>
  )
}

export default page