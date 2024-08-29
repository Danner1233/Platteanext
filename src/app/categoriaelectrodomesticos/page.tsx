import React from 'react'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { CategoriaElectrodomesticos } from '@/components/component/categoria-electrodomesticos'
import { CategoriaRelleno } from '@/components/component/categoria-relleno'

function page() {
  return (
    <div>
        <NavbarDefault />
        <CategoriaElectrodomesticos />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <Footer />
    </div>
  )
}

export default page