import {
  Product,
  addProduct,
  listProducts,
  updateProductPrice,
} from "./products/product";
import { Customer, addCustomer, listCustomers } from "./customers/customer";
import { createOrder, listOrders } from "./orders/order";

function main() {

  const products: Product[] = [
    { id: "P1", name: "Laptop", price: 700, category: "Electronics" },
    { id: "P2", name: "Headphone", price: 100, category: "Electronics" },
    { id: "P3", name: "Mouse", price: 499, category: "Electronics" },
  ];

  products.forEach(addProduct);
  console.log("\nProducts:", listProducts());


  const customer: Customer = {
    id: "C2",
    name: "XYZ",
    email: "ABC@gmail.com",
  };
  addCustomer(customer);
  addCustomer({
    id: "C1",
    name: "ABC",
    email: "ABC@gmail.com",
  });
  console.log("\nCustomers:", listCustomers());

  const order = createOrder(customer, products);
  console.log("\nOrder created:", order);


  const customer3 : Customer =   {
    id: "C3",
    name: "Swapnil",
    email: "Swapnil@gmail.com",
  };

  const products2: Product[] = [
    { id: "P1", name: "PP1", price: 399, category: "Electronics" },
    { id: "P2", name: "PP2", price: 1109, category: "Electronics" },
    { id: "P3", name: "PP3", price: 499, category: "Electronics" },
  ];

  const order2 = createOrder(customer3, products2);
  console.log("\nOrder created:", order2);

  console.log("----------------------------------------")
  console.log("\nAll orders:", listOrders());
//   listOrders().forEach(order => console.log(formatOrder(order)));
  

  console.log("\n----------------------------------------")
  updateProductPrice("P1", 1300);  //id, new_price
  console.log("\nUpdated products:", listProducts());
}

main();
