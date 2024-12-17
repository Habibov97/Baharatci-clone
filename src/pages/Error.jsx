import React from 'react'
import { Link } from 'react-router-dom'

function Error() {


  return (

    <div style={{width:'100%', height:'50vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <p style={{fontSize:'2em', fontFamily:'cursive', padding:'25px'}}>
            Səhifə mövcud deyil.  
        </p>
        <Link to='/' style={{fontSize:'1.3em', fontFamily:'cursive',}}>Ana səhifəyə dön</Link> 
    </div>
  )


}

export default Error