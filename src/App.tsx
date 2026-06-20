import SmoothScrollProvider from './providers/SmoothScrollProvider'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Brochure from './components/Brochure'
import Tour from './components/Tour'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Gallery />
          <Tour />
          <Brochure />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
