import React from 'react'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { CategoriaDeportes } from '@/components/component/categoria-deportes'
import { CategoriaRelleno } from '@/components/component/categoria-relleno'

function page() {
  return (
    <div>
        <NavbarDefault />
        <CategoriaDeportes />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <Footer />
    </div>
  )
}

export default page