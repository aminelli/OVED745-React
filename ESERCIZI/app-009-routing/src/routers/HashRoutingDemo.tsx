import { useState, useEffect } from 'react'
import DemoHeading from '../DemoHeading'
import { NativeRouteView } from './NativeRouteView'

export function HashRoutingDemo() {

    const [hash, setHash] = useState(window.location.hash)

    useEffect(() => {
        const syncHash = () => setHash(window.location.hash)
        window.addEventListener('hashchange', syncHash)

        if (!window.location.hash.startsWith('#/native-hash')) {
            window.location.hash = '/native-hash/home'
        }
        return () => window.removeEventListener('hashchange', syncHash)
    }, [])

    const rawPath = hash.replace(/^#/, '') || '/native-hash/home'
    const [path = '/native-hash/home', search = ''] = rawPath.split('?')

    return (
        <section className="demo-panel">
            <DemoHeading eyebrow="Native approach 03" title="Hash Routing">
                Le rotte vivono dopo <code>#</code>, quindi il browser non richiede al server risorse diverse per ogni schermata.
            </DemoHeading>
            <div className="demo-toolbar">
                <a href="#/native-history/home">Home</a>
                <a href="#/native-history/products?category=outdoors">Prodotti filtrati</a>
                <a href="#/native-history/products/42?tab=reviews">Prodotto 42</a>
                <a href="#/native-history/account">Area riservata</a>
                <a href="#/native-history/missing">Pagina mancante</a>
            </div>
            <div className="route-output"><NativeRouteView path={path} query={new URLSearchParams(search)} /></div>
            <p className="notice">Hash corrente: <code>{hash}</code></p>
        </section>
    )


}