import { Favoritos } from '@/components/component/favoritos'
import { Footer } from '@/components/component/footer'
import { Navbar } from '@/components/component/navbar'
import React from 'react'

function pages() {
  return (
    <div>
        <Navbar />
        <Favoritos />
        <Footer />
    </div>
  )
}

export default pages