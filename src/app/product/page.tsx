import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { Producto } from '@/components/component/producto'
import { Footprints } from 'lucide-react'
import React from 'react'

function page() {
  return (
    <div>
        <NavbarDefault />
        <Producto />
        <Footer />
    </div>
  )
}

export default page