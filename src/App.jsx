import { useState } from 'react'
import './App.css'
import Header from './Header'
import LandingPage from './LandingPage'
import Footer from './Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import SignUp from './sign_page/Sign_up'
import LogIn from './sign_page/Log_in'
import ForgotPassword from './sign_page/Forgot_pas'
import CheckEmail from './sign_page/Check_email'
function Layout({ children }) {
  const location = useLocation();
  const noheaderfooter = ["/log_in", "/sign_up", "/Forgot_pas", "/check_email"];
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
          <Route path="/log_in" element={<LogIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/Forgot_pas" element={<ForgotPassword />} />
          <Route path="/check_email" element={<CheckEmail />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
