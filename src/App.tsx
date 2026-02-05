import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateListingPage from './pages/CreateListingPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/createListings' element={<CreateListingPage />} />
      </Routes>
    </Router>
  )
}

export default App
