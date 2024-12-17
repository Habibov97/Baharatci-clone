import React, { useContext, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BaharatContext } from '../App';
import ScrollToUp from '../components/ScrollToUp';
import WriteUs from '../components/WriteUs';
import '../assets/css/transitions.css';
import CouponPopup from '../components/CouponPopup';

function Layout() {
  const data = useContext(BaharatContext);
  const location = useLocation();
  const nodeRef = useRef(null); 

  return (
    <>
      <Header data={data} />
      <TransitionGroup component={null}> 
        <CSSTransition
          key={location.key} 
          nodeRef={nodeRef} 
          classNames="fade"
          timeout={500}
        >
          <div ref={nodeRef} style={{ position: 'relative' }}>
            <Outlet /> 
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
      <ScrollToUp />
      <WriteUs />
      <CouponPopup />
    </>
  );
}

export default Layout;