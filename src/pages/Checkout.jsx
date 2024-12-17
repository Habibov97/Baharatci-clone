import React, { useState, useEffect } from 'react';
import '../assets/css/checkout.css';
import Basket from '../components/Basket';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearBasket, removeCheckedProducts, selectAllProducts } from '../slices/basketSlice';
import { Input, Button, Space, Checkbox, Modal } from 'antd';  
import { userCoupon } from '../slices/authSlice';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cleanPrice = (priceString) => {
  const cleanedPrice = priceString.replace(/[^\d.]/g, '');
  return parseFloat(cleanedPrice);
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((store) => store.basket);
  const { token, coupon } = useSelector((store) => store.auth);

  const [inputCoupon, setInputCoupon] = useState('');
  const [selectAll, setSelectAll] = useState(true); 

  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Pricing

  const totalPrice = products
    .filter(product => product.checked) 
    .reduce((total, product) => {
      const productPrice = cleanPrice(product.price);
      return total + productPrice * product.quantity;
    }, 0);

  const discount = coupon === 'baharatci10' && token ? (totalPrice * 0.1).toFixed(2) : 0;
  const finalPrice = (totalPrice - discount).toFixed(2);

 //number validation
  const validatePhoneNumber = (number) => {
    const azPhoneRegex = /^(070|055|050|099|010)\d{7}$/; 
    return azPhoneRegex.test(number);
  };

  const handleCouponChange = (e) => {
    setInputCoupon(e.target.value);
  };

  const handleApplyCoupon = () => {
    dispatch(userCoupon(inputCoupon));
    if (inputCoupon !== 'baharatci10') {
      toast.error('Kupon düzgün deyil!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
        transition: Flip,
      });
    } else if (products.length === 0) {
      toast.error('Boş səbətə endirim olur ?', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
        transition: Flip,
      });
      dispatch(userCoupon(''));
    } else {
      toast.success('Endirim tətbiq olundu', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
        transition: Flip,
      });
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    dispatch(selectAllProducts(newSelectAll));
  };

  const handlePlaceOrder = () => {
    if (products.length === 0) {
      // Show toaster if the basket is empty
      toast.error('Səbət boşdur, zəhmət olmasa məhsul əlavə edin.', {
        position: 'top-center',
        autoClose: 3500,
        theme: 'light',
        transition: Flip,
      });
    } else if (!token) {
      const hasCheckedProducts = products.some(product => product.checked); 

      if (!hasCheckedProducts) {
        
        toast.error('Mehsullar seçili deyil zəhmət olmasa mehsulları seçin.', {
          position: 'top-center',
          autoClose: 3500,
          theme: 'light',
          transition: Flip,
        });
      
      } else {
        // Show modal to ask for phone number if there are checked products
        setIsModalVisible(true);
      }

    }
    
    else if (token) {
      const hasCheckedProducts = products.some(product => product.checked); 

      if (!hasCheckedProducts) {
        
        toast.error('Mehsullar seçili deyil zəhmət olmasa mehsulları seçin.', {
          position: 'top-center',
          autoClose: 3500,
          theme: 'light',
          transition: Flip,
        });
      
      } else {
        processOrder();
      }
    }
    
    else {
      // Process the order if the user is logged in and basket is not empty
      processOrder();
    }
  };

  // Function to process the order
  const processOrder = () => {
    if (finalPrice > 0) {
      dispatch(removeCheckedProducts()); 
      notifyOrderSuccess(); 
      setTimeout(() => {
        navigate('/'); 
      }, 4000);
    }
  };

  const handlePhoneNumberSubmit = () => {
    if (phoneNumber.trim() === '') {
      toast.error('Zəhmət olmasa adınızı və telefon nömrəsini daxil edin!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
        transition: Flip,
      });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('Zəhmət olmasa düzgün telefon nömrəsi daxil edin!.', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
        transition: Flip,
      });
      return;
    }
    
  
    setIsSubmitting(true);

    setTimeout(() => {
      setIsModalVisible(false);  
      notifyPhoneOrder();  
      dispatch(clearBasket());  
      setIsSubmitting(false);
      setTimeout(() => {
        navigate('/');  
      }, 4000); 
    }, 500);
  };

  const notifyOrderSuccess = () =>
    toast.success('Sifarişiniz uğurla tamamlandı! Qısa zamanda sizinlə əlaqə saxlanacaq.', {
      position: 'top-center',
      autoClose: 3500,
      theme: 'light',
      transition: Flip,
    });

  const notifyPhoneOrder = () =>
    toast.success('Sifariş qəbul olundu, Sizinlə qisa zamanda əlaqə saxlanılacaq.', {
      position: 'top-center',
      autoClose: 3500,
      theme: 'light',
      transition: Flip,
    });

  useEffect(() => {
    const allChecked = products.every(product => product.checked);
    setSelectAll(allChecked);
  }, [products]);

  return (
    <div style={{ backgroundColor: '#f2f2f2' }}>
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-left">
            <h2>Səbət</h2>
            <div className="select-all">
              <Checkbox id="select-all" disabled={products.length === 0} checked={selectAll} onChange={handleSelectAll}></Checkbox>
              <label htmlFor="select-all">Hamısını seçmək</label>
            </div>

          {/* {Basket komponenti} */}

            <Basket />

            <div className="overall-summary">
              {discount > 0 && <p><b>Endirim: <span>{discount} ₼</span></b></p>}
              <p className="total-price-general">
                <b> Ümumi qiymət: <span>{finalPrice} ₼</span> </b>
              </p>
            </div>
          </div>

          <div className="cart-right">
            <div className="info-basket">
              <p className="info-credit">
                <span className="info-icon">%</span> Sifarişin kreditlə alınması mövcuddur
              </p>
              <p className="info-free-delivery">
                <span className="info-icon">⛟</span> Çatdırılma <span className="highlight-green">pulsuzdur</span>
              </p>
            </div>
            <div className="coupon">
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  style={{ borderColor: '#69B20F' }}
                  value={inputCoupon}
                  onChange={handleCouponChange}
                  placeholder="baharatci10"
                  disabled={!token}
                />
                <Button
                  style={{ backgroundColor: '#69B20F' }}
                  type="primary"
                  onClick={token ? handleApplyCoupon : () => toast.error('Kupon üçün hesabınıza daxil olun')}
                >
                  qazan
                </Button>
              </Space.Compact>
              <div className="endirim-kuponu">
                Tətbiq et <span style={{ fontWeight: 'bold', color: '#28a745' }}> 10% endirim </span> qazan
              </div>
            </div>
            <div className="order-summary">
              <p>Sifarişin məbləği ({products.filter(product => product.checked).length} məhsul): <span>{totalPrice.toFixed(2)} ₼</span></p>
              {discount > 0 && <p>Endirim: <span>{discount} ₼</span></p>}
              <p className="total-price-overall">
                <b>Toplam ödəniş:</b><span> <b>{finalPrice} ₼</b></span>
              </p>
            </div>
          </div>
        </div>

        <div className="order-buttons-container">
          <div className="order-buttons">
            <button className="credit-order">Sifarişi kreditlə rəsmiləşdirmək</button>
            <button className="place-order" onClick={handlePlaceOrder}>  
              Sifarişi tamamla
            </button>
          </div>
        </div>
      </div>

      {/* Phone number modal */}
      <Modal
        title={<h3 style={{ color: '#333', fontWeight: 'bold' }}>Adınızı və Telefon Nömrəsini Daxil Edin.</h3>}  
        open={isModalVisible}
        onOk={handlePhoneNumberSubmit}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={isSubmitting}
        centered
        bodyStyle={{ padding: '20px', textAlign: 'center' }}  
        okText="Təsdiqlə"  
        cancelText="Ləğv et"  
        okButtonProps={{
          style: {
            backgroundColor: '#69B20F', 
            borderColor: '#69B20F',
            color: 'white',
            borderRadius: '5px',
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: '#f2f2f2',  
            color: '#333', 
            borderRadius: '5px',
            borderColor: '#d9d9d9',
          },
        }}
      >
        <Input
          placeholder="Adınız"
          style={{
            padding: '10px',
            borderRadius: '5px',
            borderColor: '#d9d9d9',
            width: '100%',
            marginBottom: '15px', 
          }}
        />
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Telefon nömrəsi"
          style={{
            padding: '10px',
            borderRadius: '5px',
            borderColor: '#d9d9d9',
            width: '100%',
            marginBottom: '15px',
          }}
        />

      </Modal>
    </div>
  );
};

export default Checkout;
