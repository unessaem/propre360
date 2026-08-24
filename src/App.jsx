import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Zone from './components/Zone'
import QuoteForm from './components/QuoteForm'
import Faq from './components/Faq'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 font-sans text-slate-200 antialiased">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Zone />
        <QuoteForm />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
