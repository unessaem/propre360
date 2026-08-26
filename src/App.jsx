import { I18nProvider } from './i18n'
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
    <I18nProvider>
      <div className="min-h-screen bg-page font-sans text-body antialiased">
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
    </I18nProvider>
  )
}
