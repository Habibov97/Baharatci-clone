import React, { useState } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdClose } from 'react-icons/md'; 
import { BsChatDotsFill } from 'react-icons/bs'; 
import { useNavigate } from 'react-router-dom';

function WriteUs() {
    
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const togglePanel = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <>
        <div onClick={togglePanel} className={`bize-yazin-btn ${isOpen ? 'open' : ''}`}>
          {isOpen ? (
            <MdClose className="close-icon" size={30} />
          ) : (
            <BsChatDotsFill className="chat-icon" size={30} />
          )}
        </div>
  
        <div className={`contact-panel ${isOpen ? 'open' : ''}`}>
          <div className="contact-option">
            <div onClick={() => window.open('https://www.instagram.com/baharatci.az/', '_blank')}>
              <FaInstagram size={30} />
            </div>
          </div>
          <div className="contact-option">
            <div  onClick={() => window.open('https://wa.me/994702549600', '_blank')}>
              <FaWhatsapp size={30} />
            </div>
          </div>
        </div>
      </>
    );
}

export default WriteUs;