import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import Onboarding from './pages/Onboarding';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SignUpPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/signin' element={<LogInPage />} />
      <Route path='/onboarding' element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      } />
      <Route path='/landing' element={
        <ProtectedRoute>
          <LandingPage />
        </ProtectedRoute>
      } />
      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
