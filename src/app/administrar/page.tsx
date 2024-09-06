import { Administrador } from '@/components/component/administrador'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar-admin'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <Administrador />
        <Footer />
    </div>
  )
}

export default page