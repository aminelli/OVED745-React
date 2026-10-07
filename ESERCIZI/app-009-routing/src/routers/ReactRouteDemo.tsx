import { useEffect, useState } from 'react'

import DemoHeading from '../DemoHeading'

import {
    createBrowserRouter,
    isRouteErrorResponse,
    Link as ReactRouterLink,
    type LoaderFunctionArgs,
    Outlet,
    RouterProvider,
    useLoaderData,
    useRouteError,
    useSearchParams,
} from 'react-router-dom'

import { products, type Product } from '../Data'



function ReactRouterLayout() {
    return (

        <section className="demo-panel">
            <DemoHeading eyebrow="Native approach 03" title="Hash Routing">
                Router basato su route objects: layout annidati, loader, parametri, query string e error boundary.
            </DemoHeading>
            <div className="route-links">

                <ReactRouterLink to="/react-router">Home</ReactRouterLink>
                <ReactRouterLink to="/react-router/products">Prodotti</ReactRouterLink>
                <ReactRouterLink to="/react-router/account">Area riservata</ReactRouterLink>
                <ReactRouterLink to="/react-router/missing">Pagina mancante</ReactRouterLink>

            </div>
            <Outlet />
        </section>
    )
}


function ReactRouterHome() {
    return (
        <div className="route-output">
            <h3>Indice react router</h3>
            <p>Usa i link per navigare tra le pagine.</p>
            <ReactRouterLink to="/react-router/products/42?tab=reviews">apri prodotto id 42</ReactRouterLink>
        </div>
    )
}


function ReactRouterProductsLayout() {
    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category') ?? 'all'
    const visibleProducts = category === 'all' ? products : products.filter((product) => product.category.toLowerCase() === category)

    return (
        <div className="route-output">
            <h3>Catalogo annidato</h3>
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
            <ul className="product-list">
                {visibleProducts.map((product) => (
                    <li key={product.id}>
                        <ReactRouterLink to={`/react-router/products/${product.id}?tab=details`}>
                            {product.name} <span>€{product.price}</span>
                        </ReactRouterLink>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    )
}

async function reactRouterProductLoader({ params }: LoaderFunctionArgs) {
    // In un'app reale questo loader chiamerebbe un'API e React Router gestirebbe lo stato di caricamento/errori.
    await new Promise((resolve) => window.setTimeout(resolve, 120))
    const product = products.find(({ id }) => id === params.productId)
    if (!product) throw new Response('Product not found', { status: 404, statusText: 'Not Found' })
    return product
}

function ReactRouterProduct() {
  const product = useLoaderData<typeof reactRouterProductLoader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') ?? 'overview'

  return (
    <article className="detail-card">
      <span className="eyebrow">Loader + URL params</span>
      <h3>{product.name}</h3>
      <p>{product.category} · €{product.price}</p>
      <div className="tab-row">
        {['overview', 'reviews'].map((nextTab) => (
          <button
            aria-pressed={tab === nextTab}
            key={nextTab}
            onClick={() => setSearchParams({ tab: nextTab })}
            type="button"
          >
            {nextTab}
          </button>
        ))}
      </div>
      <p>Contenuto della scheda <strong>{tab}</strong>, conservato nell’URL.</p>
    </article>
  )
}

function ReactRouterAccount() {
  const [signedIn, setSignedIn] = useState(false)
  return (
    <div className="route-output">
      <h3>Protezione di route (dimostrativa)</h3>
      <button onClick={() => setSignedIn((value) => !value)} type="button">{signedIn ? 'Esci' : 'Accedi'}</button>
      <p>{signedIn ? 'Profilo visibile. La sessione è solo simulata.' : 'Questa route mostra un controllo lato UI, non un confine di sicurezza.'}</p>
    </div>
  )
}

function ReactRouterNotFound() {
  return <div className="route-output"><h3>404 React Router</h3><p>Nessuna route React Router corrisponde a questo URL.</p></div>
}

function ReactRouterRouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}: ${error.data}`
    : error instanceof Error ? error.message : 'Errore sconosciuto'
  return <div className="route-output"><h3>Errore di route</h3><p role="alert">{message}</p><ReactRouterLink to="/react-router/">Torna all’indice</ReactRouterLink></div>
}

const reactRouter = createBrowserRouter([
    {
        path: '/react-router',
        element: <ReactRouterLayout />,
        errorElement: <ReactRouterRouteError />,
        children: [
           { index: true, element: <ReactRouterHome /> },
           { 
              path: 'products',
              element: <ReactRouterProductsLayout />,
              children: [
                { index: true, element: <p className="muted">Selezionare un prodotto dal catalogo</p> },
                { path: ':productId', loader: reactRouterProductLoader, element: <ReactRouterProduct /> },
              ],
           },
           { path: 'account', element: <ReactRouterAccount /> },
           { path: '*', element: <ReactRouterNotFound /> },
        ],
    }
])

export default function ReactRouteDemo() {
    return <RouterProvider router={reactRouter} />
}