import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import SeatSelection from './components/SeatSelection';
import Checkout from './components/Checkout';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/movie/:id" element={<MovieDetails token={token} />} />
          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
