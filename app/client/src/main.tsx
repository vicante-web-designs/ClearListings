import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import ListingDetails from './pages/listings/ListingDetails.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import NotFound from './pages/404 Page/NotFound.tsx';
import ListingsPage from './pages/listings/ListingsPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import CreateListingPage from './pages/listings/CreateListingPage.tsx'
import EditListing from './components/features/listingFeatures/EditListing.tsx'
import App from './App.tsx'
import SignUpPage from './pages/auth/SignUpPage'
import LoginPage from './pages/auth/LoginPage.tsx'
import AgentLoginPage from './pages/auth/AgentLoginPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { index: true, element: <App />},
      { index: false, path: '/listings', element: <ListingsPage />},
      { index: false, path: '/home', element: <HomePage />},
      { index: false, path: '/about', element: <AboutPage />},
      { index: false, path: '/createListing', element: <CreateListingPage />},
      { index: false, path: '/signup', element: <SignUpPage />},
      { index: false, path: '/login', element: <LoginPage />},
      { index: false, path: '/agent/login', element: <AgentLoginPage />}

    ],
    errorElement: <NotFound />
  },
  {
    path: 'listings/:listingId', element: <ListingDetails />
  },
  {
    path: 'listings/:listingId/edit', element: <EditListing />
  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
