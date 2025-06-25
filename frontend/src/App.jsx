import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import Onboarding from './pages/Onboarding';


function App() {
  return (
    <Routes>
      <Route path='/' element={<SignUpPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
      <Route path='/signin' element={<LogInPage />} />
      <Route path='/onboarding' element={<Onboarding/>} />
    </Routes>

  )
}

export default App
