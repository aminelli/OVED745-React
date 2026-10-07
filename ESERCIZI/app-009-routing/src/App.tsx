import DemoHeading from './DemoHeading'
import { useState } from 'react'
import './App.css'

type DemoId = 'state' | 'hystory' | 'hash' | 'react-router' | 'tanstack' | 'wouter'

const demos: {
  id: DemoId;
  label: string;
  href: string;
  description: string;
}[] = [
  { id: 'state',          label: 'React State',     href: '/native-state/',         description: 'Stato locale, senza URL' },
  { id: 'hystory',        label: 'History API',     href: '/native-history/home',   description: 'pushState e popstate' },
  { id: 'hash',           label: 'Hash Routing',    href: '/#/native-hash/home',    description: 'URL senza fallback server' },
  { id: 'react-router',   label: 'React Router',    href: '/react-router/',         description: 'Rotte annidate e loader' },
  { id: 'tanstack',       label: 'TanStack Router', href: '/tanstack/',             description: 'Tipi e search params' },
  { id: 'wouter',         label: 'Wouter',          href: '/wouter/',               description: 'Router leggero e minimale' },
]

function getActiveDemo(): DemoId {
  const hash = window.location.hash.replace(/^#/, '')
  if (hash.startsWith('/native-hash')) return 'hash'
  
  const path = window.location.pathname
  
  if (path.startsWith('/native-history')) return 'hystory'
  if (path.startsWith('/react-router')) return 'react-router'
  if (path.startsWith('/tanstack')) return 'tanstack'
  if (path.startsWith('/wouter')) return 'wouter'

  return 'state'
}

function StateRoutingDemo(){

  const [currentRoute, setCurrentRoute] = useState('/')
  const [signedIn, setSignedIn] = useState(false)

  const route = new URL(currentRoute, window.location.origin)
  const productMatch = route.pathname.match(/^\/products\/([^/]+)$/)

  function navigate(path: string) {
    setCurrentRoute(path)
  }

  return (
    <section className="demo-panel">

      <DemoHeading eyebrow="Approccio Nativo" title="Routing con Stato React">
        Caso più semplice: cambia la vista in base a uno stato.
        Non viene effettuata la sincronizzazione con l'URL, cronologia, o deeplink.
      </DemoHeading>

      <div className="demo-toolbar">
        <button onClick={() => navigate('/')} type="button">Home</button>
        <button onClick={() => navigate('/products/42?tab=reviews')} type="button">Product 42</button>
        <button onClick={() => navigate('/account')}  type="button">Area Riservata</button>
        <button onClick={() => navigate('/missing')}  type="button">Rotta Inesistente</button>
      </div>

      <div className="route-output">
        {route.pathname === '/' && <><h3>Home</h3><p>Seleziona una vista usando i pulsanti sopra.</p></>}

        {productMatch && (
          <>
          <h3>Product {decodeURIComponent(productMatch[1])}</h3>
          <p>Query Parameters: <code>tab={route.searchParams.get('tab') ?? 'overview'}</code></p>
          </>
        )}

        {route.pathname === '/account' && (
          <>
          <h3>Area Riservata</h3>
          <button onClick={() => setSignedIn((value) => !value)} type="button">
            {signedIn ? 'Sign Out' : 'Sign In'}
          </button>
          <p>{signedIn ? 'Sei autenticato.' : 'Non sei autenticato.'}</p>
          </>
        )}

        {route.pathname !== '/' && route.pathname !== '/account'  && !productMatch && (
          <>
          <h3>404 - Vista non trovata</h3>
          <p>La gestione del fallback è responsabilità dell'applicazione</p>
          </>
        )}

      </div>
      <p className="notice">URL attuale: <code>{window.location.pathname}{window.location.search}</code></p>
      
    </section>
  )
}


export default function App() {
  const [activeDemo, setActiveDemo] = useState(getActiveDemo)
  const demo = demos.find(({id}) => id === activeDemo) ?? demos[0]

  return (
    <main className="app-shell">
      
      <header className="site-header">
        <a className="brand" href="/native-state/">
          <span className="brand-mark">R</span>
          <span>Lab<small>Una galleria di strategie di navigazione</small></span>
        </a>
      </header>

      <section className="intro">
        <div>
          <span className="eyebrow">React + Typescript + Vite</span>
          <h1>Un URL, tante<br /><span>strategie di routing.</span></h1>
          <p>Confronta approcci nativi e librerie: scegli un esempio per esplorare come cambia la navigazione.</p>
        </div>
        <div className="intro-card">
          <span className="status-dot" />
          <div><strong>Demo attiva</strong><span>{demo.label}</span></div>
          <code>{window.location.pathname}{window.location.hash}</code>
        </div>
      </section>

      <nav className="demo-nav" aria-label="Esempi di routing">
        <span className="nav-label">Approccio</span>
        {demos.map(({ id, label, href }) => (
          <a className={id === activeDemo ? 'active' : ''} href={href} key={id} aria-current={id === activeDemo ? 'page' : undefined}>
            {label}
          </a>
        ))}
      </nav>

      <section className="content-area">


      </section>

        <footer className="site-footer">
        <span>Routing client-side: il server di produzione deve servire <code>index.html</code> per le rotte applicative.</span>
      </footer>
    </main>
  )


}