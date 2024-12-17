import React from 'react'
import work1 from '../assets/img/howWeWork/work1.webp'
import work2 from '../assets/img/howWeWork/work2.webp'
import work3 from '../assets/img/howWeWork/work3.webp'

import '../assets/css/main.css'

function HowWeWork() {
  return (

    <div className='howww-container'>
        <div className='howww-header'>Biz necə işləyirik ?</div>
        <div >
            <div className='howww-row'>
                <article className='howww-article'>
                    <div className='howww-img'>
                        <div className='howww-num'>1</div>
                        <img src={work2} alt="work1" />
                    </div>
                    <div>
                        <h6>Sifariş Qəbulu</h6>
                        <p>İlkin olaraq müştərilərin sifarişləri qəbul olunur.</p>
                    </div>
                </article>
                <article className='howww-article'>
                    <div className='howww-img'>
                        <div className='howww-num'>2</div>
                        <img src={work1} alt="work2" />
                    </div>
                    <div>
                        <h6>Paketləmə</h6>
                        <p>Müştərinin istəyinə görə paket hazırlanır və paketlenir.</p>
                       
                    </div>
                </article>
                <article className='howww-article'>
                    <div className='howww-img'>
                        <div className='howww-num'>3</div>
                        <img src={work3} alt="work3" />
                    </div>
                    <div>
                        <h6>Çatdırılma</h6>
                        <p>Müştəri istəyindən asılı olaraq ünvana çatdırılır.</p>
                    </div>
                </article>
            </div>
        </div>

    </div>

  )


}

export default HowWeWork