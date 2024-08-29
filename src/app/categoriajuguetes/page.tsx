import React from 'react'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { CategoriaJuguetes } from '@/components/component/categoria-juguetes'
import { CategoriaRelleno } from '@/components/component/categoria-relleno'

function page() {
  return (
    <div>
        <NavbarDefault />
        <CategoriaJuguetes /> 
        <CategoriaRelleno />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <Footer />
    </div>
  )
}

export default page