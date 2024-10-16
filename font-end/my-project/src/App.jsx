import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Carousel from './carousel' 
import Tracking from './tracking'
import Footer from './footer'
import Order from './Order'
import Packed from './packed'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Carousel />
      <Tracking />
      <Packed />
      <Order />
      <Footer />
    </>
  )
}

export default App
