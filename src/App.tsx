import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import 'lenis/dist/lenis.css'
import Home from './pages/Home'
import Diensten from './pages/Diensten'
import Cases from './pages/Cases'
import CaseArgenta from './pages/CaseArgenta'
import Contact from './pages/Contact'
import Ui from './pages/Ui'
import { useSmoothScroll, getLenis } from './hooks/useSmoothScroll'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Jump to the top instantly on navigation (via Lenis when active).
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  useSmoothScroll()
  return (
    <BrowserRouter>
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diensten" element={<Diensten />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/case/argenta" element={<CaseArgenta />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ui" element={<Ui />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
