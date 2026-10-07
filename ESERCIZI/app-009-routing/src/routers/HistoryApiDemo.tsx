import { useEffect, useState, type MouseEvent } from 'react'
import DemoHeading from '../DemoHeading'
import { NativeRouteView } from './NativeRouteView'

export function HistoryApiDemo() {
    const [url, setUrl] = useState(() => window.location.pathname + window.location.search)

    const current = new URL(url, window.location.origin)

    useEffect(() => {
        const syncUrl = () => setUrl(window.location.pathname + window.location.search)
        window.addEventListener('popstate', syncUrl)
        return () => window.removeEventListener('popstate', syncUrl)
    }, [])

    function navigate(to: string) {
        window.history.pushState({}, '', to)
        setUrl(window.location.pathname + window.location.search)
    }

    function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return
        }
        event.preventDefault()
        navigate(event.currentTarget.href)
    }

    return (
        <section className="demo-panel">
            <DemoHeading eyebrow="Native approach 02" title="History API">
                <code>pushState</code> aggiorna l’indirizzo senza ricaricare la pagina; 
                <code>popstate</code> sincronizza indietro/avanti.
            </DemoHeading>
            <div className="demo-toolbar">
                <a href="/native-history/home" onClick={handleLinkClick}>Home</a>
                <a href="/native-history/products?category=outdoors" onClick={handleLinkClick}>Prodotti filtrati</a>
                <a href="/native-history/products/42?tab=reviews" onClick={handleLinkClick}>Prodotto 42</a>
                <a href="/native-history/account" onClick={handleLinkClick}>Area riservata</a>
                <button onClick={() => window.history.back()} type="button">Indietro</button>
                <button onClick={() => window.history.forward()} type="button">Avanti</button>
            </div>
            <div className="route-output"><NativeRouteView path={current.pathname} query={current.searchParams} /></div>
            <p className="notice">Path gestito: <code>{current.pathname}{current.search}</code></p>
        </section>
    )

}