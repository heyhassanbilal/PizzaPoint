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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      <div className={`flex flex-col items-end space-y-3 mb-4 transition-all duration-300 transform ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}>
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 group"
        >
          <div className="w-6 h-6 mr-3">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
            </svg>
          </div>
          <span className="font-medium">WhatsApp</span>
        </button>

        {/* Viber Button */}
        <button
          onClick={handleViber}
          className="flex items-center bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 group"
        >
          <div className="w-6 h-6 mr-3">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82c-.06 3.11-.13 8.95 5.5 10.54v2.42s-.038.97.602.582c.64-.388 2.037-1.83 2.037-1.83 0 0 .528.062.91.062 3.22 0 6.61-.59 7.49-4.37.89-3.78-.89-9.08-.89-9.08C14.77 1.88 13.398.002 11.398.002zm.45 1.78c1.63-.015 2.93 1.35 3.47 3.18 0 0 1.48 4.65.78 7.68-.69 3.02-3.5 3.61-6.21 3.61-.31 0-.6-.016-.87-.045l-1.52 1.31s-.79.67-.79-.11v-1.82c-4.78-1.35-4.74-6.32-4.69-8.9.06-2.58.54-4.67 1.87-6.01C5.67 2.178 9.298 1.796 11.848 1.782zm-.002 1.35c-2.064.011-5.114.315-6.901 1.923-1.026.96-1.353 2.465-1.404 4.45-.043 1.985-.055 6.447 3.604 7.55l.906.268v1.22c0 .25.21.84.33.84.048-.012.07-.03.07-.03.084-.003 3.259-2.884 3.259-2.884.253.016.507.025.765.025 2.264 0 4.518-.468 5.068-2.826.549-2.358-.678-6.27-.678-6.27-.426-1.433-1.362-2.44-2.69-2.44 0 0-.9-.826-2.33-.826zm.001 1.218c1.006 0 1.83.823 1.83 1.83 0 1.006-.824 1.83-1.83 1.83-1.006 0-1.83-.824-1.83-1.83 0-1.007.824-1.83 1.83-1.83z"/>
            </svg>
          </div>
          <span className="font-medium">Viber</span>
        </button>
      </div>

      {/* Main FAB Button */}
      <button
        onClick={toggleFAB}
        className={`w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-300" />
        ) : (
          <MessageCircle size={24} className="transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;