import {
  createRootRoute,
  createRoute,
  createRouter,
  Link as TanStackLink,
  Outlet as TanStackOutlet,
  RouterProvider as TanStackRouterProvider,
} from '@tanstack/react-router'

import DemoHeading from '../DemoHeading'
import { products, type Product } from '../Data'

function TanStackLayout() {
  return (
    <section className="demo-panel">
      <DemoHeading eyebrow="Library approach 02" title="TanStack Router">
        Un route tree con inferenza dei tipi per path, parametri e search; utile quando si vuole validare la forma dell’URL.
      </DemoHeading>
      <div className="route-links">
        <TanStackLink to="/tanstack">Home</TanStackLink>
        <TanStackLink to="/tanstack/products">Prodotti</TanStackLink>
        <TanStackLink to="/tanstack/account">Area riservata</TanStackLink>
        <a href="/tanstack/missing">Rotta inesistente</a>
      </div>
      <TanStackOutlet />
    </section>
  )
}

function TanStackHome() {
  return (
    <div className="route-output">
      <h3>Indice TanStack Router</h3>
      <p>Il route tree è dichiarato in TypeScript e collegato al router con un tipo globale.</p>
      <TanStackLink to="/tanstack/products/$productId" params={{ productId: '42' }} search={{ tab: 'reviews' }}>
        Apri il prodotto 42 →
      </TanStackLink>
    </div>
  )
}

function TanStackProducts() {
  return (
    <div className="route-output">
      <h3>Catalogo</h3>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <TanStackLink to="/tanstack/products/$productId" params={{ productId: product.id }} search={{ tab: 'details' }}>
              {product.name} <span>€{product.price}</span>
            </TanStackLink>
          </li>
        ))}
      </ul>
      <TanStackOutlet />
    </div>
  )
}

const tanStackRootRoute = createRootRoute({
  component: TanStackLayout,
  notFoundComponent: () => <div className="route-output"><h3>404 TanStack Router</h3><p>La route richiesta non esiste nel route tree.</p></div>,
})

// TanStack compone le route usando oggetti tipizzati; una child route eredita il contesto e il layout del parent.
const tanStackIndexRoute = createRoute({
  getParentRoute: () => tanStackRootRoute,
  path: '/tanstack',
  component: TanStackHome,
})

const tanStackProductsRoute = createRoute({
  getParentRoute: () => tanStackRootRoute,
  path: '/tanstack/products',
  component: TanStackProducts,
})

const tanStackProductRoute = createRoute({
  getParentRoute: () => tanStackProductsRoute,
  path: '$productId',
  validateSearch: (search: Record<string, unknown>) => ({
    tab: typeof search.tab === 'string' ? search.tab : 'overview',
  }),
  loader: ({ params }) => products.find(({ id }) => id === params.productId) ?? null,
  component: function TanStackProduct() {
    const product = tanStackProductRoute.useLoaderData()
    const { tab } = tanStackProductRoute.useSearch()
    const navigate = tanStackProductRoute.useNavigate()
    if (!product) return <div className="detail-card"><h3>Prodotto non trovato</h3><p>Controlla il parametro dinamico nell’URL.</p></div>
    return (
      <article className="detail-card">
        <span className="eyebrow">Loader tipizzato + search validator</span>
        <h3>{product.name}</h3>
        <p>{product.category} · €{product.price}</p>
        <div className="tab-row">
          {['overview', 'reviews'].map((nextTab) => (
            <button
              aria-pressed={tab === nextTab}
              key={nextTab}
              onClick={() => navigate({ search: { tab: nextTab } })}
              type="button"
            >
              {nextTab}
            </button>
          ))}
        </div>
        <p>Tab URL: <code>{tab}</code></p>
      </article>
    )
  },
})

const tanStackAccountRoute = createRoute({
  getParentRoute: () => tanStackRootRoute,
  path: '/tanstack/account',
  component: function TanStackAccount() {
    return <div className="route-output"><h3>Area riservata</h3><p>Usa <code>beforeLoad</code> e il contesto del router per redirect/check di sessione; autorizza sempre anche lato server.</p></div>
  },
})

const tanStackRouteTree = tanStackRootRoute.addChildren([
  tanStackIndexRoute,
  tanStackProductsRoute.addChildren([tanStackProductRoute]),
  tanStackAccountRoute,
])

const tanStackRouter = createRouter({ routeTree: tanStackRouteTree })

// La registrazione globale consente ai componenti Link e agli hook di validare i path con il route tree definito sopra.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof tanStackRouter
  }
}

export function TanStackRouterDemo() {
  return <TanStackRouterProvider router={tanStackRouter} />
}