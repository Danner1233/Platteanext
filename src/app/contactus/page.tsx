import { Contactanos } from '@/components/component/contactanos'
import { Footer } from '@/components/component/footer'
import { NavbarDefault } from '@/components/component/navbar-default'
import React from 'react'

function page() {
  return (
    <div>
        <NavbarDefault />
        <Contactanos />
        <Footer />
    </div>
  )
}

export default page