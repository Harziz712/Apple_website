import Hero from "./components/hero"
import Highlights from "./components/highlights"
import Navbar from "./components/navbar"
import Model from "./components/model"
import * as Sentry from '@sentry/react'

const App = () => {
  return <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights/>
      <Model/>

    </main>
  )
}

export default Sentry.withProfiler(App);