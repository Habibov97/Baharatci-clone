import { useNavigate } from 'react-router-dom'
import { BaharatContext } from '../App'
import { useContext } from 'react'
import { IoIosSearch } from "react-icons/io";

function Cookies() {

  const data = useContext(BaharatContext)
  const filteredData = data.find(item => item.category === 'Çərəzlər')
  const navigate = useNavigate()

  return (
    
    <>
    
      <div style={{background:'#eee'}}>
          <div className='haqqimizdaBg'>
                  <h2 className='mehsul-haqqinda'>Çərəzlər</h2>   
          </div>
      </div>

      <div className='product-cards-container'>
        <div className='product-cards-row'> 
          {
            filteredData.cards.map((item , i) => {
              return <div key={i} className="product-card">
                            <div className="product-image">
                                <img src={`/src/assets/img/mehsullar/${item.img}`} alt={item.name}/>
                            </div>
                            <div className="product-details">
                                <h3>{item.name}</h3>
                                <p>{item.price}</p>
                            </div>
                            <button onClick={()=> navigate(`/mehsul/${item.id}`)}> <span><IoIosSearch /></span> ətraflı</button>
                        </div>

            })
          }
        </div>
        
      </div>
    
    </>

  )


}

export default Cookies