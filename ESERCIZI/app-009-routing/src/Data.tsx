type Product = { id: string; name: string; category: string; price: number }

const products: Product[] = [
  { id: '42', name: 'Field Notes Backpack', category: 'Accessories', price: 89 },
  { id: '73', name: 'Studio Headphones', category: 'Audio', price: 149 },
  { id: '108', name: 'Everyday Bottle', category: 'Outdoors', price: 32 },
]

export type { Product }
export { products }