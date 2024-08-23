
import { FiltroProductos } from '@/components/component/filtro-productos'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { Productos } from '@/components/component/productos'
import React from 'react'

function page() {

  return (
    <div>
        <NavbarDefault />
        <FiltroProductos />
        <Productos />
        <Productos />
        <Productos />
        <Footer />
    </div>
  )
}

export default page