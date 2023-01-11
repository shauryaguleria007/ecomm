import { Header, Footer } from './component/layout'
import { useEffect } from 'react'
import WebFont from 'webfontloader'
import { Outlet } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    })
  }, [])
  return (
    <main>
      <section>
        <Header />
      </section>
      <section>
        <Outlet />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  )
}

export default App
