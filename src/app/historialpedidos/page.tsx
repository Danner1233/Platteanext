import { Footer } from '@/components/component/footer'
import { HistorialPedidos } from '@/components/component/historial-pedidos'
import { Navbar } from '@/components/component/navbar'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <HistorialPedidos />
        <Footer />
    </div>
  )
}

export default page