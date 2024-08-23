import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import { Tarjeta } from '@/components/component/tarjeta'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <Tarjeta />
        <Footer />
    </div>
  )
}

export default page