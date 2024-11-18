function createStore(reducer) {
  let state;
  let listeners = [];

  return {
    getState: () => state,

    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },

    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((newL) => newL !== listener);
      };
    },
  };
}

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const EDIT_TODO = "EDIT_TODO";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

function todoReducer(state = initialState, action) {
  let newState;
  console.log(state);

  switch (action.type) {
    case ADD_TODO:
      newState = {
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };
      break;

    case TOGGLE_TODO:
      newState = {
        todos: state.todos.map((todo) => todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
      break;

    case DELETE_TODO:
      newState = {todos: state.todos.filter((todo) => todo.id !== action.payload),};
      break;

    case EDIT_TODO:
      newState = {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
      break;

    default:
      return state;
  }

  localStorage.setItem("todos", JSON.stringify(newState.todos));
  return newState;
}

const store = createStore(todoReducer);

function renderTodos() {
  const todoList = document.getElementById("todoList");
  const state = store.getState();

  updateStats(state.todos);

  todoList.innerHTML = state.todos
    .map(
      (todo) => `
            <div class="group bg-white rounded-lg shadow-md p-4 flex items-center justify-between transition-all hover:shadow-lg ${
              todo.completed ? "bg-gray-50" : ""
            }">
                <div class="flex items-center gap-3 flex-1">
                    <input 
                        type="checkbox" 
                        ${todo.completed ? "checked" : ""} 
                        onclick="toggleTodo(${todo.id})"
                        class="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    >
                    <span 
                        class="flex-1 text-gray-800 ${
                          todo.completed ? "line-through text-gray-500" : ""
                        }"
                        ondblclick="makeEditable(${todo.id}, this)"
                    >
                        ${todo.text}
                    </span>
                </div>
                <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onclick="toggleTodo(${todo.id})"
                        class="px-3 py-1 text-sm rounded-md ${
                          todo.completed
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }"
                    >
                        ${todo.completed ? "Undo" : "Complete"}
                    </button>
                    <button 
                        onclick="deleteTodo(${todo.id})"
                        class="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        `
    )
    .join("");
}

function updateStats(todos) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;

  document.getElementById("totalTodos").textContent = `Total: ${total}`;
  document.getElementById(
    "completedTodos"
  ).textContent = `Completed: ${completed}`;
  document.getElementById("pendingTodos").textContent = `Pending: ${pending}`;
}

function makeEditable(id, element) {
  const currentText = element.textContent.trim();
  element.innerHTML = `
        <input
            type="text"
            value="${currentText}"
            class="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onblur="updateTodo(${id}, this.value)"
            onkeypress="if(event.key === 'Enter') this.blur()"
        >
    `;
  element.querySelector("input").focus();
}

function addTodo() {
  const input = document.getElementById("todoInput");
  const errorDiv = document.getElementById("error");
  const text = input.value.trim();

  if (!text) {
    errorDiv.textContent = "Please enter a text";
    return;
  }

  errorDiv.textContent = "";
  store.dispatch({
    type: ADD_TODO,
    payload: text,
  });

  input.value = "";
}

function toggleTodo(id) {
  store.dispatch({
    type: TOGGLE_TODO,
    payload: id,
  });
}

function deleteTodo(id) {
  store.dispatch({
    type: DELETE_TODO,
    payload: id,
  });
}

function updateTodo(id, newText) {
  if (newText.trim()) {
    store.dispatch({
      type: EDIT_TODO,
      payload: { id, text: newText.trim() },
    });
  }
  renderTodos();
}

store.subscribe(renderTodos);
store.dispatch({ type: "@@INIT" });

document.getElementById("todoInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});
