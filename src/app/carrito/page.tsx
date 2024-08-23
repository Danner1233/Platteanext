import { Carrito } from '@/components/component/carrito'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <Carrito />
        <Footer />
    </div>
  )
}

export default page