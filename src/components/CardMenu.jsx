import React, { useState } from 'react'

function CardMenu({ data, setFilter }) {

  const getCategory = (category) => {
    setFilter(category)
  }


  return (
    <div className='card-cat-container' >
      {
        data && data.map((item, i) => {
          return <div className='card-menu' onClick={() => getCategory(item.category)} key={i}>
            {item.category}
          </div>
        })
      }

    </div>
  )


}

export default CardMenu

















// import React from 'react';

// function CardMenu({ data, setFilter }) {
//     const firstThreeCategories = data.slice(0, 3); // First 3 categories
//     const nextThreeCategories = data.slice(3, 6); // Next 3 categories

//     const getCategory = (category) => {
//         setFilter(category);
//     };

//     return (
//         <div className='card-cat-container'>
//             <div className='categories1'>
//                 {firstThreeCategories.map((item, i) => (
//                     <div className='card-menu' onClick={() => getCategory(item.category)} key={i}>
//                         {item.category}
//                     </div>
//                 ))}
//             </div>
//             <div className='categories2'>
//                 {nextThreeCategories.map((item, i) => (
//                     <div className='card-menu' onClick={() => getCategory(item.category)} key={i}>
//                         {item.category}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default CardMenu;

