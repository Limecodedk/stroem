import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.scss'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from './layout/Layout'
/* Import Public */
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import FAQ from './pages/Faq';
import News from './pages/News/News';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
/* Import Admin */
import AdminLayout from './layout/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNews from './pages/admin/AdminNews';
import AdminAbout from './pages/admin/AdminAbout';
import AdminBooking from './pages/admin/AdminBooking';
import SingleNews from './pages/News/SingleNews'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/omos' element={<AboutUs />} />
          <Route path='/service' element={<Services />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/nyheder' element={<News />} />
          <Route path='/nyhed/:id' element={<SingleNews />} />
          <Route path='/kontakt' element={<ContactUs />} />
          <Route path='/login' element={<Login />} />
        </Route>

        {/* Admin */}
        <Route path='/admin' element={<AdminLayout />} >

          <Route index element={<AdminDashboard />} />
          <Route path='/admin/service' element={<AdminNews />} />
          <Route path='/admin/service' element={<AdminAbout />} />
          <Route path='/admin/service' element={<AdminBooking />} />
        </Route>


      </>
    )
  )








  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
