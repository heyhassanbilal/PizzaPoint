// import React from 'react'

// function WhatsAppButton() {
//   return (
//     <>
//         <a
//             href="http://wa.me/36204489602"
//             target="_blank"
//             rel="noreferrer"
//             className="fixed bottom-16 right-4 z-50"
//         >
//             <img
//             src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
//             alt="WhatsApp"
//             />
//         </a>
//     </>
//   )
// }

// export default WhatsAppButton


import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import whatsapp from '../assets/imgs/whatsapp.png'; // Replace with your WhatsApp logo path
import viber from '../assets/imgs/viber.png'; // Replace with your Viber logo path

const WhatsAppButton = () => {

  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '+36204489602';

  const toggleFAB = () => {
    setIsOpen(!isOpen);
  };

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleViber = () => {
    const viberUrl = `viber://chat?number=${phoneNumber}`;
    window.open(viberUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Contact Options */}
      <div className={`flex flex-col items-end space-y-2 sm:space-y-3 mb-3 sm:mb-4 transition-all duration-300 transform ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}>
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 overflow-hidden border-0 flex items-center justify-center"
        >
          <img src={whatsapp} alt="WhatsApp" className="w-full h-full object-contain" />
        </button>

        {/* Viber Button */}
        <button
          onClick={handleViber}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-500 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 overflow-hidden border-0 flex items-center justify-center"
        >
          <img src={viber} alt="Viber" className="w-full h-full object-contain" />
        </button>
      </div>
      

      {/* Main FAB Button */}
      <button
        onClick={toggleFAB}
        className={`w-12 h-12 sm:w-14 sm:h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        {isOpen ? (
          <X size={20} className="sm:w-6 sm:h-6 transition-transform duration-300" />
        ) : (
          <MessageCircle size={20} className="sm:w-6 sm:h-6 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;