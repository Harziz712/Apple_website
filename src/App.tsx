import Hero from "./components/hero"
import Highlights from "./components/highlights"
import Navbar from "./components/navbar"
import Model from "./components/model"
import * as Sentry from '@sentry/react'
import Features from "./components/features"
import HowItWorks from "./components/howitworks"
import Footer from "./components/footer"

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights/>
      <Model/>
      <Features/>
      <HowItWorks/>
      <Footer/>

    </main>
  )
}

export default Sentry.withProfiler(App);