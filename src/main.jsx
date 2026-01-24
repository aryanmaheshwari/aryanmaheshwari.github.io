import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Title from './components/Title.jsx'
import Footer from './components/Footer.jsx'
import Contact from './pages/Contact.jsx'
import Resume from './pages/Resume.jsx'
import Projects from './pages/Projects.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Title />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </HashRouter>
  </StrictMode>,
)
