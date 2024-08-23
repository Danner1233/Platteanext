import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import { SobreNosotros } from '@/components/component/sobre-nosotros'
import React from 'react'

function page() {
  return (
    <div>
        <NavbarDefault />
        <SobreNosotros />
        <Footer />
    </div>
  )
}

export default page