import './App.css'
import BackgroundDeals from './components/BackgroundDeals'
import CategoriesList from './components/CategoriesList'
import Container from './components/Container'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import WhatsAppButton from './components/WhatsAppButton'

function App() {

  return (
    <>
    <div>
      <div className='flex-col'>
        <Navbar />
        <BackgroundDeals/>
        <WhatsAppButton />        
      </div>
        <CategoriesList />
      <div className='flex justify-center'>
        <Container />
      </div>
    </div>
    </>
  )
}

export default App
