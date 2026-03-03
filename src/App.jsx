import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import LandingPage from './Landing Page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <LandingPage />
    </>
  )
}

export default App
