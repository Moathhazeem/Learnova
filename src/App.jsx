/**
 * @file App.jsx
 * @description Main Application Entry Component for Learnova.
 * Handles client-side routing, page navigation layout wrapper (conditionally hiding/showing Header and Footer),
 * and route mappings for all sub-pages across authentication, settings, learning, and course management.
 */

import './App.css';
import Header from './Header';
import LandingPage from './LandingPage';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Authentication & Account Recovery Components
import SignUp from './sign_page/Sign_up';
import LogIn from './sign_page/Log_in';
import ForgotPassword from './sign_page/Forgot_pas';
import CheckEmail from './sign_page/Check_email';
import VerificationCode from './sign_page/Verification_Code';
import CreateNewPas from './sign_page/Create_new_pas';

// Dashboard & Home Views
import Home from './Home';

// User Settings Components
import Profile from './Setting/Profile';
import Security from './Setting/Security';
import Preferences from './Setting/Preferences';
import Privacy from './Setting/Privacy';
import Notification from './Setting/Notification';
import Payment from './Setting/Payment';

// Profile & Learning Management Pages
import MyLearning from './PageProfile/My Learning';
import Explore from './PageProfile/Explore';

// Courses, Instructors & Support Pages
import Course from './courses/Course';
import Teacher from './courses/Teacher';
import Contact_us from './courses/Contact_us';
import FAQ from './courses/FAQ';
import AboutUs from './courses/About_us';
import Payment_pay from './courses/Payment_pay';
import Communication from './courses/Communication';
import Save from './courses/Save';
import Course_start from './courses/Course_start';

/**
 * Layout Component
 * @description Wraps child routes and dynamically renders the main Header and Footer
 * depending on whether the current route requires them.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Active route element content rendered inside the layout
 * @returns {JSX.Element} Layout wrapped content with conditional Header & Footer
 */
function Layout({ children }) {
  // Hooks into React Router location to inspect current URL path
  const location = useLocation();

  // Array of route paths that should exclude the persistent Header and Footer (e.g. Auth flow screens)
  const noheaderfooter = [
    '/log_in',
    '/sign_up',
    '/Forgot_pas',
    '/check_email',
    '/Verification_Code',
    '/Create_new_pas'
  ];

  // Check if current route is part of authentication flow where Header/Footer are hidden
  const hideHeaderFooter = noheaderfooter.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Header if not on an auth/standalone page */}
      {!hideHeaderFooter && <Header />}

      {/* Main route page content */}
      {children}

      {/* Conditionally render Footer if not on an auth/standalone page */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

/**
 * App Component
 * @description Root application component setting up React Router container, layout wrapper,
 * and routing table mapping paths to their respective view components.
 * 
 * @returns {JSX.Element} The rendered root router application
 */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Landing & Home Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/Home" element={<Home />} />

          {/* Authentication & Password Reset Routes */}
          <Route path="/log_in" element={<LogIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/Forgot_pas" element={<ForgotPassword />} />
          <Route path="/check_email" element={<CheckEmail />} />
          <Route path="/Verification_Code" element={<VerificationCode />} />
          <Route path="/Create_new_pas" element={<CreateNewPas />} />

          {/* Account Settings Routes */}
          <Route path="/Setting/Profile" element={<Profile />} />
          <Route path="/Setting/Security" element={<Security />} />
          <Route path="/Setting/Preferences" element={<Preferences />} />
          <Route path="/Setting/Privacy" element={<Privacy />} />
          <Route path="/Setting/Notification" element={<Notification />} />
          <Route path="/Setting/Payment" element={<Payment />} />

          {/* User Dashboard & Learning Management Routes */}
          <Route path="/My Learning" element={<MyLearning />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/Explore/Course" element={<Course />} />

          {/* Instructor & General Support Routes */}
          <Route path="/Teacher" element={<Teacher />} />
          <Route path="/Teacher/Course" element={<Course />} />
          <Route path="/Contact_us" element={<Contact_us />} />
          <Route path="/About_us" element={<AboutUs />} />
          <Route path="/FAQ" element={<FAQ />} />

          {/* Course Purchasing & Learning Operations Routes */}
          <Route path="/Payment_pay" element={<Payment_pay />} />
          <Route path="/Communication" element={<Communication />} />
          <Route path="/Save" element={<Save />} />
          <Route path="/Course_start" element={<Course_start />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

