import SmoothScrollProvider from './providers/SmoothScrollProvider'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Services from './components/Services'
import Mission from './components/Mission'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
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
          <Experience />
          <Services />
          <Mission />
          <WhyUs />
          <Gallery />
          <Tour />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
