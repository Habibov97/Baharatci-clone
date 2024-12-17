

function Contact() {


  return (
    <>
        <div style={{background:'#eee'}}>
            <div className='elaqeBg'>
                <h2 className='elaqe'>Əlaqə</h2>   
            </div>
        </div>
        <div className="contact-container">
            <div className="contact-form">
                <h1>Bizimlə Əlaqə</h1>
                
                <form>
                    
                    <div className="input-group">
                        <input type="text" placeholder="Sizin Adınız" required />
                    </div>
                    
                    <div className="input-group dual-input">
                        <input type="email" placeholder="Sizin Email" required />
                        <input type="text" placeholder="Mövzu" required />
                    </div>
                  
                    <div className="input-group">
                        <textarea placeholder="Sizin Mesajınız" required />
                    </div>
                    
                    <button type="submit">Mesaj Göndər</button>
                </form>
            </div>
            <div className="map-location">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97236.44637536081!2d49.772559262375786!3d40.394693997423566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku!5e0!3m2!1sen!2saz!4v1724460078753!5m2!1sen!2saz" width="100%" height="100%"  ></iframe>
            </div>
        </div>
    </>
  )


}

export default Contact