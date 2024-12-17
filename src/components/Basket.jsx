import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase, removeFromBasket, toggleProductCheck } from '../slices/basketSlice';
import { Empty, Typography, Checkbox } from 'antd';

function Basket() {
  const { products } = useSelector((state) => state.basket);
  const { token, coupon } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleProductCheck = (id) => {
    dispatch(toggleProductCheck({ id }));
  };

  function formatWeight(quantity) {
    const weightInGrams = quantity * 100; 
    if (weightInGrams >= 1000) {
      return `${(weightInGrams / 1000).toFixed(1)} kg`;
    }
    return `${weightInGrams} qr`;
  }

  return (
    <>
      {products.length > 0 ? (
        products.map((product, i) => {
          const originalPrice = parseFloat(product.price) * product.quantity;
          const discountPrice = coupon === 'baharatci10' && token
            ? (originalPrice - originalPrice * 0.1).toFixed(2)
            : originalPrice.toFixed(2);

          return (
            <div key={i} className="CartProduct">
              <div className="CartProduct-Select">      
                <div className="UCheckbox">
                  <label className="UCheckbox-Label">
                  <Checkbox className="UCheckbox-Input" 
                    disabled={products.length === 0} 
                    checked={product.checked} 
                    onChange={() => handleProductCheck(product.id)}>
                  </Checkbox>

                    {/* <input
                      type="checkbox"
                      className="UCheckbox-Input"
                      checked={product.checked} // Bind checked state to product
                      onChange={() => handleProductCheck(product.id)} // Handle check/uncheck
                    /> */}
                    <span className="UCheckbox-Square"></span>
                  </label>
                </div>
              </div>
              <div className="CartProduct-Image">
                <img src={`/src/assets/img/mehsullar/${product.img}`} alt={product.name} />
              </div>

              <div className="CartProduct-Descriptions">
                <div className="Description">
                  {coupon === 'baharatci10' && token && (
                    <div className="Discount-CashBack">-10%</div>
                  )}
                  <div className="Title">
                    <h4>{product.name} ({formatWeight(product.quantity)})</h4>
                    <p style={{ fontSize: '.7rem' }}> Məhsulun kateqoriyası : {product.category} </p>
                  </div>
                  <div className="PriceBasket">
                    {coupon === 'baharatci10' && token && (
                      <span><b>{discountPrice} ₼</b></span>
                    )}
                    <span style={coupon === 'baharatci10' && token ? { textDecoration: 'line-through', color: 'rgb(148, 151, 173)' } : {}}>
                      {originalPrice.toFixed(2)} ₼
                    </span>
                  </div>
                </div>

                <div className="Quantity">
                  <div className="ProductQuantity">
                    <div className="quantityButtons">
                      <button className="ProductQuantity-Minus" onClick={() => dispatch(decrease({ id: product.id }))}> - </button>
                      <input type="text" value={product.quantity} min="1" max="20" step="1" readOnly autoComplete="off" className="ProductQuantity-Input" />
                      <button className="ProductQuantity-Plus" onClick={() => dispatch(increase({ id: product.id }))}> + </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Remove" onClick={() => dispatch(removeFromBasket({ id: product.id }))}> ✖ </div>
            </div>
          );
        })
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Typography.Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
              Səbət boşdur
            </Typography.Text>
          }
        />
      )}
    </>
  );
}

export default Basket;
