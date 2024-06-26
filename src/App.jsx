import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

/* Import Public */
import Layout from './layout/Layout'
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
import AdminNewsEdit from './pages/admin/AdminNewsEdit'
import AdminAbout from './pages/admin/AdminAbout';
import AdminBooking from './pages/admin/AdminBooking';
import SingleNews from './pages/News/SingleNews'
import AdminNewsCreate from './pages/admin/AdminNewsCreate'
import AdminBookingEdit from './pages/admin/AdminBookingEdit'
import SearchResultat from './pages/SearchResultat'

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
          <Route path='/resultat/:id' element={<SearchResultat />} />
        </Route>

        {/* Admin */}
        <Route path='/admin' element={<AdminLayout />} >
          <Route index element={<AdminDashboard />} />
          <Route path='/admin/news' element={<AdminNews />} />
          <Route path='/admin/news/edit/:id' element={<AdminNewsEdit />} />
          <Route path='/admin/news/create' element={<AdminNewsCreate />} />
          <Route path='/admin/about' element={<AdminAbout />} />
          <Route path='/admin/booking' element={<AdminBooking />} />
          <Route path='/admin/booking/edit/:id' element={<AdminBookingEdit />} />
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
