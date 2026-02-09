import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateListingPage from './pages/CreateListingPage'
import { ListingProvider } from './context/ListingContext/context'

function App() {
 
  return (
      <ListingProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/createListings' element={<CreateListingPage />} />
          </Routes>
        </Router>
      </ListingProvider>
  )

}

export default App
