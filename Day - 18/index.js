"use strict";
class Employee {
    constructor(name, salary, department) {
        this.name = name;
        this.salary = salary;
        this.department = department;
        console.log("Employee constructor accessed");
    }
    displayName() {
        console.log(`Employee Name: ${this.name}`);
    }
    calculateBonus() {
        return this.salary * 0.1;
    }
    getDepartment() {
        return this.department;
    }
    accessPrivateMethod() {
        console.log(this.calculateBonus());
        console.log(this.getDepartment());
    }
}
class Manager extends Employee {
    constructor(name, salary) {
        super(name, salary, "Management");
        console.log("Manager constructor accessed");
    }
    showDepartment() {
        console.log(`Department using super: ${super.getDepartment()}`);
        console.log(`Department using this: ${this.getDepartment()}`);
    }
}
console.log("\n------------before emp obj instantiation-----------------\n");
const emp = new Employee("Person1", 50000, "CS");
console.log("\n------------After emp instance-----------------------------------\n");
const manager = new Manager("Person2", 80000);
console.log("\n------------After Manager instance----------------------------------\n");
emp.displayName();
console.log(emp.name);
// console.log(emp.salary); 
// console.log(emp.department);
// console.log(emp.getDepartment());
// console.log(emp.calculateBonus());
console.log("\n------------accessing pvt and protected------------------------\n");
emp.accessPrivateMethod();
console.log("\n------------accessing protected using subclass------------------------\n");
manager.showDepartment();
