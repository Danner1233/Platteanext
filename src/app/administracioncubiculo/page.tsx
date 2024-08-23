import { BannerCubiculo } from '@/components/component/banner-cubiculo'
import { EditarFotoCubiculo } from '@/components/component/editar-foto-cubiculo'
import { EditarProductos } from '@/components/component/editar-productos'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <BannerCubiculo />
        <EditarFotoCubiculo />
        <EditarProductos />
        <Footer />
    </div>
  )
}

export default page