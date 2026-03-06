import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import LandingPage from './LandingPage'
import Footer from './Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './sign_page/sign_in'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign_in" element={<SignIn />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
