var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Faculty = /** @class */ (function () {
    function Faculty(name, salary, department) {
        this.name = name;
        this.salary = salary;
        this.department = department;
        console.log("Faculty constructor accessed");
    }
    Faculty.prototype.displayName = function () {
        console.log("Faculty Name: ".concat(this.name));
    };
    Faculty.prototype.calculateBonus = function () {
        return this.salary * 0.1;
    };
    Faculty.prototype.getDepartment = function () {
        return this.department;
    };
    Faculty.prototype.accessPrivateMethod = function () {
        console.log(this.calculateBonus());
        console.log(this.getDepartment());
    };
    return Faculty;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(name, salary) {
        var _this = _super.call(this, name, salary, "Management") || this;
        console.log("Manager constructor accessed");
        return _this;
    }
    Manager.prototype.showDepartment = function () {
        console.log("Department using super: ".concat(_super.prototype.getDepartment.call(this)));
        console.log("Department using this: ".concat(this.getDepartment()));
    };
    return Manager;
}(Faculty));
console.log("\n------------before Faculty1 obj instantiation-----------------\n");
var emp = new Faculty("Faculty1", 50000, "CS");
console.log("\n------------After Faculty1 instance-----------------------------------\n");
var manager = new Manager("Manager1", 80000);
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
