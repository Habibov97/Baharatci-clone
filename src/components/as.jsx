const Checkout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {products} = useSelector((store)=> store.basket)
    const {token, coupon} = useSelector((store)=> store.auth)
    
    const totalPrice = products.reduce((total, product) => {
      const productPrice = cleanPrice(product.price); 
      return total + productPrice * product.quantity;
    }, 0);
    
    const discount = (totalPrice * 0.1).toFixed(2);
    const finalPrice = (totalPrice - discount).toFixed(2); 
  
    const handlePlaceOrder = () => {
      // Sifaris etdikden sonra mehsulu lokaldan sil
      localStorage.removeItem("basket");
    
      // Toasteri goster
      notify();
  
      // Redux stati  temizle
      dispatch(clearBasket())
  
      // Ana sehifeye don
      setTimeout(() => {
          navigate('/')
      }, 4000)
  
    };
  
    const checkoutDiscountStyle = {
      display: token ? 'flex' : 'none',
    };
  
    const notify = () => toast.success('Sifarişiniz uğurla tamamlandı! Ana səhifəyə yönləndirilir.', {
      position: "top-center",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
      });
  
  
    return (
      <div style={{ backgroundColor: '#f2f2f2' }}>
        <div className="cart-page" >
          <div className="cart-container">
            <div className="cart-left">
              <h2>Səbət</h2>
              <div className="select-all">
                <input type="checkbox" id="select-all" />
                <label htmlFor="select-all">Hamısını seçmək</label>
              </div>
  
              <div className="cart-items">
                {/* BASKETIN ICINDEKI MEHSULLAR */}
                  
                  <Basket/> {/* BASKET COMPONENTI  */}
  
                  <div className="overall-summary">
                    <p style={{display:'none'}}> <b>Endirim: <span>{discount} ₼</span></b></p>
                    <p className="total-price-general"><b> Ümumi qiymət: <span>{token ? finalPrice : totalPrice.toFixed(2) } ₼</span> </b></p>
                  </div>
                </div>   
              </div>
  
            {/* TOTAL QIYMET SAG TEREF */}
  
            <div className="cart-right">
              <div className='info-basket'>
                <p className='info-credit'><span className="info-icon">%</span> Sifarişin kreditlə alınması mövcuddur</p>
                <p className='info-free-delivery'> <span className="info-icon">⛟</span> Çatdırılma <span className="highlight-green">pulsuzdur</span></p>
              </div>
              <div className='coupon'>
                <Space.Compact style={{ width: '100%',  }}>       
                  <Input style={{borderColor:'#69B20F'}} onChange={()=> dispatch(userCoupon())} placeholder='Baharatci10' />
                  <Button style={{backgroundColor:'#69B20F'}} type="primary">qazan</Button>
                </Space.Compact>
                <div className='endirim-kuponu'> Tətbiq et <span style={{fontWeight:'bold', color:'#28a745'}}> 10% endirim </span> qazan </div>
              </div>
              <div className="order-summary">
                <p>Sifarişin məbləği ({products.length} məhsul): <span>{totalPrice.toFixed(2)} ₼</span></p>
                <p         style={{display:'none'}}         >Endirim: <span>{discount} ₼</span></p>
                <p className="total-price-overall"> <b>Toplam ödəniş:</b><span> <b>{token ? finalPrice : totalPrice.toFixed(2)} ₼</b></span></p>
              </div>
            </div>
          </div>
          
          {/* ALIS DUYMELERI */}
          <div className="order-buttons-container">
            <div className="order-buttons">
              <button className="credit-order">Sifarişi kreditlə rəsmiləşdirmək</button>
              <button className="place-order" onClick={handlePlaceOrder}>Sifariş et</button>
            </div>
          </div>
        </div>
      </div>
  
    );
  };
  
  export default Checkout;