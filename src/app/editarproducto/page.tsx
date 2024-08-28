import { EditarProducto } from '@/components/component/editar-producto'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <EditarProducto />
        <Footer /> 
    </div>
  )
}

export default page