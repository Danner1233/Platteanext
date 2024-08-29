import { CategoriaBelleza } from '@/components/component/categoria-belleza'
import { CategoriaRelleno } from '@/components/component/categoria-relleno'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import React from 'react'

function page() {
  return (
    <div>
        <NavbarDefault />
        <CategoriaBelleza />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <CategoriaRelleno />
        <Footer />
    </div>
  )
}

export default page