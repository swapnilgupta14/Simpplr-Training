export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

let products: Product[] = [];

export function addProduct(product: Product): void {
  products.push(product);
}

export function listProducts(): Product[] {
  return [...products];
}

//Additional

export function updateProductPrice(productId: string, newPrice: number): void {
  const product = products.find((p) => p.id === productId);
  if (product) {
    product.price = newPrice;
    console.log(`Price updated for product ${productId} to ${newPrice}`);
  } else {
    console.error(`Product with ID ${productId} not found`);
  }
}
