import { Footer } from '@/components/component/footer'
import { Historial } from '@/components/component/historial'
import { Navbar } from '@/components/component/navbar'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <Historial />
        <Footer />
    </div>
  )
}

export default page