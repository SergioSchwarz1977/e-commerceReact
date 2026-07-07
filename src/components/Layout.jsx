import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import {Outlet} from 'react-router-dom'

export const Layout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
