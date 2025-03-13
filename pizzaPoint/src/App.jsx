import './App.css'
import { useEffect } from 'react'
import BackgroundDeals from './components/BackgroundDeals'
import CategoriesList from './components/CategoriesList'
import Container from './components/Container'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ViewCartOverlay from './components/ViewCartOverlay'
import WhatsAppButton from './components/WhatsAppButton'
import { useState } from 'react'
import YourCart from './components/YourCart'
import SignUp from './components/SignUp'
import serve6 from './assets/imgs/serve6.webp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./firebase"
// import { AuthContext } from './utils/AuthContext'
// import AuthContext from './utils/AuthContext'
import { AuthProvider } from "./utils/AuthContext";
import { CartProvider } from './utils/CartContext';
import LoginPage from './components/LoginPage'
import SideMenu from './components/SideMenu'

function App() {

  // In your parent component
  const [isCartOpen, setIsCartOpen] = useState(false);

  // To open cart
  const openCart = () => setIsCartOpen(true);

  // To close cart
  const closeCart = () => setIsCartOpen(false);

  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  // To open cart
  const openSideMenu = () => setSideMenuOpen(true);

  // To close cart
  const closeSideMenu = () => setSideMenuOpen(false);

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Super Max (Small 7 Inch)", price: 649, qty: 1, img: {serve6} },
    { id: 2, name: "Winter Deal 01", price: 399, qty: 5, img: {serve6}, extra: "Fajita Sensation Pizza" }
  ]);

  const popularItems = [
    { id: 3, name: "Plain Garlic Bread", price: 249, img: {serve6} },
    { id: 4, name: "7up", price: 99, img: {serve6} },
    { id: 5, name: "Pepsi", price: 99, img: {serve6} }
  ];


  // useEffect(() => {
  //   if (token) {
  //     localStorage.setItem("token", token);
  //   }
  // }, [token]); // Jab bhi token change hoga, save hoga local storage me

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              
              <div className='h-screen overflow-y-auto overflow-x-hidden'>
                {isCartOpen && <YourCart cartItems={cartItems} 
                            popularItems={popularItems} 
                            setCartItems={setCartItems} 
                            isOpen={isCartOpen}
                            onClose={closeCart}
                            /> }

                {isSideMenuOpen && <SideMenu isSideMenuOpen={isSideMenuOpen} onSideMenuClose={closeSideMenu} />}
                  <div className='flex-col'>
                    <Navbar setIsCartOpen= {setIsCartOpen} setSideMenuOpen = {setSideMenuOpen} />
                    <BackgroundDeals/>
                    <WhatsAppButton />        
                  </div>
                    <CategoriesList />
                  <div className='flex justify-center'>
                    <Container/>
                  </div>
                    <ViewCartOverlay setIsCartOpen= {setIsCartOpen} />
                  

                </div>
            } /> 
          
            <Route path="/signup" element={
              <>
                <Navbar setIsCartOpen= {setIsCartOpen} />
                <SignUp />
              </>  
          } />
            <Route path="/login" element={
              <>
                <Navbar setIsCartOpen= {setIsCartOpen} />
                <LoginPage />
              </>  
          } />

          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
