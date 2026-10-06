function Item({ 
    name,
    checked
 }) {
    return (
        <li className={checked ? "itemOK" : "itemKO"}>
            {name} {checked ? "✅" : "❌"}
        </li>
    );
}


export default function CheckList() {
    return (
        <section>:
            <h1>Check List</h1>
            <ul>
                <Item name="Item 1" checked={true} />
                <Item name="Item 2" checked={false} />
                <Item name="Item 3" checked={true} />
            </ul>
        </section>
    );
}