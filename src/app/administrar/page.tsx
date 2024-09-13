import { Administrador } from '@/components/component/administrador'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar-admin'
import React from 'react'

function page() {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
        <Administrador />
        </main>
        <Footer />
    </div>
  )
}

export default page