class Faculty {
  public name: string;
  private salary: number;
  protected department: string;

  constructor(name: string, salary: number, department: string) {
    this.name = name;
    this.salary = salary;
    this.department = department;
    console.log("Faculty constructor accessed");
  }

  public displayName(): void {
    console.log(`Faculty Name: ${this.name}`);
  }

  private calculateBonus(): number {
    return this.salary * 0.1;
  }

  protected getDepartment(): string {
    return this.department;
  }

  public accessPrivateMethod(): void {
    console.log(this.calculateBonus());
    console.log(this.getDepartment());
  }
}

class Manager extends Faculty {
  constructor(name: string, salary: number) {
    super(name, salary, "Management");
    console.log("Manager constructor accessed");
  }

  public showDepartment(): void {
    console.log(`Department using super: ${super.getDepartment()}`);
    console.log(`Department using this: ${this.getDepartment()}`);
  }

  //   public showSalary(): void {
  //       console.log(this.salary);
  //       console.log(this.calculateBonus())
  //   }
}

console.log("\n------------before Faculty1 obj instantiation-----------------\n");

const emp = new Faculty("Faculty1", 50000, "CS");

console.log(
  "\n------------After Faculty1 instance-----------------------------------\n"
);

const manager = new Manager("Manager1", 80000);

console.log(
  "\n------------After Manager instance----------------------------------\n"
);

emp.displayName();
console.log(emp.name);

// console.log(emp.salary);
// console.log(emp.department);
// console.log(emp.getDepartment());
// console.log(emp.calculateBonus());

console.log(
  "\n------------accessing pvt and protected------------------------\n"
);
emp.accessPrivateMethod();

console.log(
  "\n------------accessing protected using subclass------------------------\n"
);
manager.showDepartment();
