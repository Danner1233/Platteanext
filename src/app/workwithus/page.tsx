import { BannerWork } from '@/components/component/banner-work'
import { ComprarTienda } from '@/components/component/comprar-tienda'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import React from 'react'

function page() {
  return (
    <div>
        <NavbarDefault />
        <BannerWork />
        <ComprarTienda />
        <Footer />
    </div>
  )
}

export default page