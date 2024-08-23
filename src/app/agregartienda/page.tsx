import { AgregarTienda } from '@/components/component/agregar-tienda'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <AgregarTienda />
        <Footer />
    </div>
  )
}

export default page