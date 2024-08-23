import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import { Perfil } from '@/components/component/perfil'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <Perfil />
        <Footer />
    </div>
  )
}

export default page