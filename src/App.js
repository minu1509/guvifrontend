import logo from './logo.svg';
import './App.css';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Routes, Route } from 'react-router-dom';
import { Profile } from './pages/profile';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
