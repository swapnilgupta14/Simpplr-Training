import { Product } from "../products/product";
import { Customer } from "../customers/customer";

export interface Order {
  orderId: string;
  customer: Customer;
  products: Product[];
  totalAmount: number;
  discount: number;
}

let orders: Order[] = [];

const DISCOUNT_THRESHOLD = 500;
const DISCOUNT_PERCENTAGE = 10 / 100;

function calculateDiscount(totalAmount: number): number {
  if (totalAmount >= DISCOUNT_THRESHOLD) {
    return Math.round(totalAmount * DISCOUNT_PERCENTAGE);
  }
  return 0;
}

export function createOrder(customer: Customer, products: Product[]): Order {
  const totalAmount = products.reduce((sum, product) => sum + product.price, 0);
  const discount = calculateDiscount(totalAmount);
  const finalAmount = totalAmount - discount;

  const order: Order = {
    orderId: `ORD-${Date.now()}`,
    customer,
    products: [...products],
    totalAmount: finalAmount,
    discount,
  };

  orders.push(order);
  return order;
}

export function listOrders(): string {
    return JSON.stringify(
        orders.map((order) => ({
            orderId: order.orderId,
            customer: order.customer,
            products: order.products,
            totalAmount: order.totalAmount,
            discount: order.discount
        })),
        null,
        2
    );
}
