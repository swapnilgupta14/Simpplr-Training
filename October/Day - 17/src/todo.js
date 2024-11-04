"use strict";
var _a;
class TodoList {
    constructor() {
        this.todos = [];
        this.currentId = 1;
    }
    addTask(task) {
        const newTodoObject = {
            id: this.currentId++,
            task: task,
        };
        this.todos.push(newTodoObject);
        this.displayTodoList();
    }
    removeTask(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.displayTodoList();
    }
    //     public showTodos(): void {
    //         console.log("\n All Tasks:");
    //         if (this.todos.length === 0) {
    //             console.log("Zero tasks available");
    //         } else {
    //             this.todos.forEach(todo => {
    //                 console.log(`[${todo.id}] ${todo.task}`);
    //             });
    //         }
    //         console.log();
    //     }
    displayTodoList() {
        const todoList = document.getElementById("todoList");
        todoList.innerHTML = "";
        if (this.todos.length === 0) {
            todoList.innerHTML = `<li class="text-center text-gray-500">No tasks available</li>`;
        }
        else {
            this.todos.forEach((todo) => {
                const li = document.createElement("li");
                li.className =
                    "flex justify-between items-center bg-gray-200 px-4 py-2 rounded-lg";
                li.innerHTML = `
                    <span>${todo.task}</span>
                    <button data-id="${todo.id}" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
                `;
                todoList.appendChild(li);
                const removeBtn = li.querySelector("button");
                removeBtn.addEventListener("click", () => {
                    const id = parseInt(removeBtn.getAttribute("data-id"));
                    this.removeTask(id);
                });
            });
        }
    }
}
const todoInstance = new TodoList();
// todoInstance.addTask("Task-1");
// todoInstance.addTask("Task-2");
// todoInstance.addTask("Task-3");
// todoInstance.addTask("Task-4");
// console.log("------------------")
// todoInstance.removeTask(2);
// todoInstance.removeTask(5);
// console.log("------------------")
// todoInstance.showTodos();
(_a = document.getElementById("addTaskBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    if (task) {
        todoInstance.addTask(task);
        taskInput.value = "";
    }
    else {
        alert("Please enter a task");
    }
});
