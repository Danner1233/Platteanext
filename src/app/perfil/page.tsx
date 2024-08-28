import { BannerPerfil } from '@/components/component/banner-perfil'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import { ProductosPerfil } from '@/components/component/productos-perfil'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <BannerPerfil />
        <ProductosPerfil />
        <Footer />
    </div>
  )
}

export default page