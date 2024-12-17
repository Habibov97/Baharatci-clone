import React, { useContext, useState } from 'react'
import { BaharatContext } from '../App'
import CardMenu from './CardMenu';
import ProductsMain from './ProductsMain';


function CardList() {
  const [filter, setFilter] = useState('')
  const data = useContext(BaharatContext)
  
  const filteredData = filter ?  data && data.filter(item =>  item.category === filter ) : data

  return (
    <>
        <div className='tebii-mehsullar' >
          100% Tebii mehsullar
        </div>
        <div className='card-container'>
          <CardMenu data={data} setFilter={setFilter}/>
          <ProductsMain data={filteredData}/>
      </div>
  
    </>

  )

  
}

export default CardList