import React from 'react'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { CategoriaModa } from '@/components/component/categoria-moda'
import { CategoriaRelleno } from '@/components/component/categoria-relleno'

function page() {
  return (
    <div>
        <NavbarDefault />
        <CategoriaModa />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <Footer />
    </div>
  )
}

export default page