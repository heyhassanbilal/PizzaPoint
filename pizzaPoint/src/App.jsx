import './App.css'
import BackgroundDeals from './components/BackgroundDeals'
import Navbar from './components/Navbar'
import WhatsAppButton from './components/WhatsAppButton'

function App() {

  return (
    <>
      <div className='flex-col'>
        <Navbar />
        <BackgroundDeals/>
        <WhatsAppButton />        
      </div>
    </>
  )
}

export default App
