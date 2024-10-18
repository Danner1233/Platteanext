import { ResumenCompra } from '@/components/component/resumen-compra'
import { Navbar } from '@/components/component/navbar';
import { Footer } from '@/components/component/footer';
import React from 'react'

function page() {
  return (
    <div>
        <Navbar cartUpdated={false} /> 
        <ResumenCompra />
        <Footer />
    </div>
  )
}

export default page