import { AgregarProducto } from '@/components/component/agregar-producto'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar /> 
        <AgregarProducto /> 
        <Footer /> 
    </div>
  )
}

export default page