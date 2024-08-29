import React from 'react'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { CategoriaHogar } from '@/components/component/categoria-hogar'
import { CategoriaRelleno } from '@/components/component/categoria-relleno'

function page() {
  return (
    <div>
        <NavbarDefault />
        <CategoriaHogar />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <Footer />
    </div>
  )
}

export default page