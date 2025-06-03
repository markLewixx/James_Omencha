import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BookingForm from './BookingForm.jsx'
import PhotographerLanding from './PhotographerLanding.jsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PhotographerLanding/>}></Route>
        <Route path="/booking" element={<BookingForm />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
