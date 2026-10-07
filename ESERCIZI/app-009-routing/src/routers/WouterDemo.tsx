import { Link as WouterLink, Route, Router, Switch, useSearchParams as useWouterSearchParams } from 'wouter'

import DemoHeading from '../DemoHeading'
import { products, type Product } from '../Data'
import { useState } from 'react'

function WouterHome() {
  return <div className="route-output"><h3>Indice Wouter</h3><p>Una API minimale basata su <code>Router</code>, <code>Switch</code>, <code>Route</code> e <code>Link</code>.</p></div>
}

function WouterProducts() {
  const [searchParams, setSearchParams] = useWouterSearchParams()
  const category = searchParams.get('category') ?? 'all'
  const visibleProducts = category === 'all'
    ? products
    : products.filter((product) => product.category.toLowerCase() === category)
  return (
    <div className="route-output">
      <h3>Catalogo Wouter</h3>
      <label className="filter-control">
        Filtro categoria
        <select
          onChange={(event) => setSearchParams(event.target.value === 'all' ? {} : { category: event.target.value })}
          value={category}
        >
          <option value="all">Tutte</option>
          <option value="audio">Audio</option>
          <option value="outdoors">Outdoors</option>
          <option value="accessories">Accessories</option>
        </select>
      </label>
      <p>Query string corrente: <code>category={category}</code></p>
      <ul className="product-list">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <WouterLink href={`/wouter/products/${product.id}?tab=details`}>{product.name} <span>€{product.price}</span></WouterLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WouterProduct({ params }: { params: { productId: string } }) {
  const product = products.find(({ id }) => id === params.productId)
  const [searchParams] = useWouterSearchParams()
  const tab = searchParams.get('tab') ?? 'overview'
  return product
    ? <div className="detail-card"><span className="eyebrow">Route params</span><h3>{product.name}</h3><p>{product.category} · €{product.price}</p><p>Tab dalla query string: <code>{tab}</code></p></div>
    : <div className="route-output"><h3>Prodotto non trovato</h3><p>ID richiesto: <code>{params.productId}</code></p></div>
}

function WouterAccount() {
  const [signedIn, setSignedIn] = useState(false)
  return <div className="route-output"><h3>Area riservata Wouter</h3><button onClick={() => setSignedIn((value) => !value)} type="button">{signedIn ? 'Esci' : 'Accedi'}</button><p>{signedIn ? 'Accesso simulato.' : 'Accesso richiesto (solo demo).'}</p></div>
}

export function WouterDemo() {
  return (
    <section className="demo-panel">
      <DemoHeading eyebrow="Library approach 03" title="Wouter">
        Una scelta leggera per applicazioni piccole o quando si desidera un router essenziale, senza route object complessi.
      </DemoHeading>
      <Router>
        <div className="route-links">
          <WouterLink href="/wouter/">Home</WouterLink>
          <WouterLink href="/wouter/products?category=all">Prodotti</WouterLink>
          <WouterLink href="/wouter/account">Area riservata</WouterLink>
          <WouterLink href="/wouter/missing">Rotta inesistente</WouterLink>
        </div>
        {/* Switch restituisce la prima route corrispondente: il fallback va perciò per ultimo. */}
        <Switch>
          <Route path="/wouter/" component={WouterHome} />
          <Route path="/wouter/products" component={WouterProducts} />
          <Route path="/wouter/products/:productId" component={WouterProduct} />
          <Route path="/wouter/account" component={WouterAccount} />
          <Route><div className="route-output"><h3>404 Wouter</h3><p>Nessuna route corrispondente.</p></div></Route>
        </Switch>
      </Router>
    </section>
  )
}