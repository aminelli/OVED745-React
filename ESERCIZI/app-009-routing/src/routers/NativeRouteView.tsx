
import { products, type Product } from '../Data'

export function NativeRouteView({ path, query }: { path: string; query: URLSearchParams }) {
  const detailMatch = path.match(/^\/(?:native-history|native-hash)\/products\/([^/]+)$/)
  const product = detailMatch && products.find(({ id }) => id === decodeURIComponent(detailMatch[1]))

  if (path.endsWith('/home') || path === '/' || path.endsWith('/')) {
    return <><h3>Home</h3><p>Questa vista è raggiunta tramite un URL gestito dal browser.</p></>
  }
  if (path.endsWith('/products')) {
    return (
      <>
        <h3>Prodotti</h3>
        <p>Categoria selezionata dalla query string: <code>{query.get('category') ?? 'tutte'}</code></p>
        <p>Caricamento dati e parsing dell’URL sono responsabilità dell’applicazione in questo approccio nativo.</p>
      </>
    )
  }
  if (detailMatch) {
    return product
      ? <><h3>{product.name}</h3><p>{product.category} · €{product.price}</p><p>Tab: <code>{query.get('tab') ?? 'overview'}</code></p></>
      : <><h3>Prodotto non trovato</h3><p>Identificativo richiesto: <code>{decodeURIComponent(detailMatch[1])}</code></p></>
  }
  if (path.endsWith('/account')) {
    return <><h3>Area riservata</h3><p>Inserisci qui un controllo di accesso lato client; i permessi vanno verificati anche sul server.</p></>
  }
  return <><h3>404 - Pagina non trovata</h3><p>Path richiesto: <code>{path}</code></p></>
}