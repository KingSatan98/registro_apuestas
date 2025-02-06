import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Statistics from './components/Statistics';
import AdminPanel from './components/AdminPanel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<Statistics />} />
      </Routes>
    </Router>
  );
};

export default App;