
import { useState } from 'react'
import DemoHeading from '../DemoHeading'

export function StateRoutingDemo(){

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