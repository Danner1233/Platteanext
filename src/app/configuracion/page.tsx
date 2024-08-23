import { Configuracion } from '@/components/component/configuracion'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <Configuracion />
        <Footer />
    </div>
  )
}

export default page