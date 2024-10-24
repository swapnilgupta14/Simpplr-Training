interface Todo {
    id: number;
    task: string;
}

class TodoList {
    private todos: Todo[] = [];
    private currentId: number = 1;

    public addTask(task: string): void {
        const newTodoObject: Todo = {
            id: this.currentId++,
            task: task
        };
        
        this.todos.push(newTodoObject);
        console.log(`Task added: "${task}" (ID: ${newTodoObject.id})`);
        this.showTodos();
    }

    public removeTask(id: number): void {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(todo => todo.id !== id);

        if (this.todos.length === initialLength) {
            console.log(`Error: Task with ID ${id} not found`);
        } else {
            console.log(`Task ID ${id} removed`);
            this.showTodos();
        }
    }

    public showTodos(): void {
        console.log("\n All Tasks:");
        if (this.todos.length === 0) {
            console.log("Zero tasks available");
        } else {
            this.todos.forEach(todo => {
                console.log(`[${todo.id}] ${todo.task}`);
            });
        }
        console.log();
    }
}

const todoList = new TodoList();

todoList.addTask("Task-1");
todoList.addTask("Task-2");
todoList.addTask("Task-3");
todoList.addTask("Task-4");
todoList.removeTask(2);
todoList.removeTask(5);
todoList.showTodos();