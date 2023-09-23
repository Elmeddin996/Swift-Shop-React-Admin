import React from 'react';
import './App.scss';
import { AdminRoutes } from './routes';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
        <AdminRoutes />
    </BrowserRouter>
  );
}

export default App;
