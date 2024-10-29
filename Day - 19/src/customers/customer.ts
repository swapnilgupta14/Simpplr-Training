export interface Customer {
    id: string;
    name: string;
    email: string;
}

let customers: Customer[] = [];

export function addCustomer(customer: Customer): void {
    const existingCustomer = customers.find(c => c.email === customer.email);
    if (existingCustomer) {
        console.log(`\nError: Customer with email ${customer.email} already exists`);
        return;
    }
    customers.push(customer);
    console.log(`New Customer with email ${customer.email} is created`)
}

export function listCustomers(): Customer[] {
    return [...customers];
}
