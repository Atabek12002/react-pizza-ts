import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

import { Cart, FullPizza, NotFound } from './loadable';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/pizza/:id" element={<FullPizza />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
