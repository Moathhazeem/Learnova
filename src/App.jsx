import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import LandingPage from './LandingPage'
import Footer from './Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import SignIn from './sign_page/sign_in'
function Layout({ children }) {
  const location = useLocation();
  const noheaderfooter = ["/sign_in"];
  return (
    <>
      {!noheaderfooter.includes(location.pathname) && <Header />}
      {children}
      {!noheaderfooter.includes(location.pathname) && <Footer />}
    </>
  )
}
function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign_in" element={<SignIn />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
