interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
}

const person: Person = {
  name: "Swapnil",
  age: 22,
};

function generatePersonId(age: number): string {
  let id: string = ("AADH" + age) as string;
  return id;
}

const employee = person as Employee;
employee.employeeId = generatePersonId(employee.age);
console.log(employee);
