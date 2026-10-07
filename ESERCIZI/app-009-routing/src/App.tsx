import { useState } from 'react'
import './App.css'

import { StateRoutingDemo } from './routers/StateRoutingDemo'
import { HistoryApiDemo } from './routers/HistoryApiDemo'
import { HashRoutingDemo } from './routers/HashRoutingDemo'
import ReactRouteDemo from './routers/ReactRouteDemo'
import { TanStackRouterDemo } from './routers/TanStackRouterDemo'
import { WouterDemo } from './routers/WouterDemo'

type DemoId = 'state' | 'history' | 'hash' | 'react-router' | 'tanstack' | 'wouter'

const demos: {
  id: DemoId;
  label: string;
  href: string;
  description: string;
}[] = [
  { id: 'state',          label: 'React State',     href: '/native-state/',         description: 'Stato locale, senza URL' },
  { id: 'history',        label: 'History API',     href: '/native-history/home',   description: 'pushState e popstate' },
  { id: 'hash',           label: 'Hash Routing',    href: '/#/native-hash/home',    description: 'URL senza fallback server' },
  { id: 'react-router',   label: 'React Router',    href: '/react-router/',         description: 'Rotte annidate e loader' },
  { id: 'tanstack',       label: 'TanStack Router', href: '/tanstack/',             description: 'Tipi e search params' },
  { id: 'wouter',         label: 'Wouter',          href: '/wouter/',               description: 'Router leggero e minimale' },
]

function getActiveDemo(): DemoId {
  const hash = window.location.hash.replace(/^#/, '')
  if (hash.startsWith('/native-hash')) return 'hash'
  
  const path = window.location.pathname
  
  if (path.startsWith('/native-history')) return 'history'
  if (path.startsWith('/react-router')) return 'react-router'
  if (path.startsWith('/tanstack')) return 'tanstack'
  if (path.startsWith('/wouter')) return 'wouter'

  return 'state'
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
        {activeDemo === 'state' && <StateRoutingDemo />}
        {activeDemo === 'history' && <HistoryApiDemo />}
        {activeDemo === 'hash' && <HashRoutingDemo />}
        {activeDemo === 'react-router' && <ReactRouteDemo />}
        {activeDemo === 'tanstack' && <TanStackRouterDemo />}
        {activeDemo === 'wouter' && <WouterDemo />}

      </section>

        <footer className="site-footer">
        <span>Routing client-side: il server di produzione deve servire <code>index.html</code> per le rotte applicative.</span>
      </footer>
    </main>
  )


}