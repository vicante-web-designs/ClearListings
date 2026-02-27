import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import { ListingProvider } from './context/ListingContext/context.tsx';
import ListingDetails from './pages/listings/ListingDetails.tsx';
import MainLayout from './layouts/MainLayout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { index: true, element: <HomePage />},
      { path: 'listings/:listingId', element: <ListingDetails /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ListingProvider>
      <RouterProvider router={router}/>
    </ListingProvider>
  </StrictMode>,
)
