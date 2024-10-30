// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Authenticate from './components/Authenticate';
import PlaceList from './components/PlaceList';
import AddPlace from './components/AddPlace';
import EditPlace from './components/EditPlace';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <PrivateRoute path="/:uid/places" element={<PlaceList />} />
        <PrivateRoute path="/places/new" element={<AddPlace />} />
        <PrivateRoute path="/places/:pid" element={<EditPlace />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect for unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
