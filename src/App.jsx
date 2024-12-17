import { createContext } from 'react';
import data from './services/data.js'
import { moreSellers, discountedProducts } from './services/data.js';
import ScrollToTop from './components/ScrollToTop.jsx';
import { ToastContainer, toast, Flip } from 'react-toastify';
import RouterConfig from './router/routerConfig.jsx';

export const BaharatContext =  createContext()
export const  MoreSellersContext = createContext()
export const  DiscountedProductsContext = createContext()
function App() {

  return (

    <BaharatContext.Provider value={data}>
    <MoreSellersContext.Provider value={moreSellers}>
    <DiscountedProductsContext.Provider value={discountedProducts}>
          <ScrollToTop/>
          <RouterConfig/>
          <ToastContainer/>
    </DiscountedProductsContext.Provider>
    </MoreSellersContext.Provider>
    </BaharatContext.Provider>
  )

}

export default App
