import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Title from './components/Title.jsx'
import Contact from './pages/Contact.jsx'
import Resume from './pages/Resume.jsx'
import Projects from './pages/Projects.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Title />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact" element={<Contact />}/> */}
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        {/* <Route path="/project/id:" element={<Project />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
