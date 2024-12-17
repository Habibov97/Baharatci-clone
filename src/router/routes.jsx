import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../components/Main';
import About from '../pages/About';
import Layout from '../pages/Layout';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import DriedFruits from '../components/DriedFruits';
import NaturalOils from '../components/NaturalOils';
import NaturalHerbs from '../components/NaturalHerbs';
import Cookies from '../components/Cookies';
import Spices from '../components/Spices';
import CakeProducts from '../components/CakeProducts';
import Details from '../pages/Details';
import Checkout from '../pages/Checkout';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Error from '../pages/Error';

function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/meyvequrusu" element={<DriedFruits />} />
          <Route path="/yaglar" element={<NaturalOils />} />
          <Route path="/otlar" element={<NaturalHerbs />} />
          <Route path="/cerezler" element={<Cookies />} />
          <Route path="/baharatlar" element={<Spices />} />
          <Route path="/tortmehsullari" element={<CakeProducts />} />
          <Route path="/mehsul/:id" element={<Details />} />

          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default RouterConfig;
