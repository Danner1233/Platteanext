
import { Carrusel } from '@/components/component/carrusel'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { ProductosDestacados } from '@/components/component/productos-destacados'
import { TiendasDestacadas } from '@/components/component/tiendas-destacadas'
import React from 'react'

function page() {
  return (
    <div>
      <NavbarDefault />
      <Carrusel />
      <ProductosDestacados />
      <TiendasDestacadas />
      <Footer />
    </div>
  )
}

export default page