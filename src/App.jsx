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
import VerificationCode from './sign_page/Verification_Code'
import CreateNewPas from './sign_page/Create_new_pas'
import Home from './Home'
import Profile from './Setting/Profile'
import Security from './Setting/Security'
import Preferences from './Setting/Preferences'
import Privacy from './Setting/Privacy'
import Notification from './Setting/Notification'
import Payment from './Setting/Payment'
import Mylearning from './PageProfile/Mylearning'
function Layout({ children }) {
  const location = useLocation();
  const noheaderfooter = ["/log_in", "/sign_up", "/Forgot_pas", "/check_email", '/Verification_Code', '/Create_new_pas'];
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
          <Route path="/Verification_Code" element={<VerificationCode />} />
          <Route path="/Create_new_pas" element={<CreateNewPas />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/Setting/Profile" element={<Profile />} />
          <Route path="/Setting/Security" element={<Security />} />
          <Route path="/Setting/Preferences" element={<Preferences />} />
          <Route path="/Setting/Privacy" element={<Privacy />} />
          <Route path="/Setting/Notification" element={<Notification />} />
          <Route path="/Setting/Payment" element={<Payment />} />
          <Route path="/Mylearning" element={<Mylearning />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
