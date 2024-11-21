export interface DashboardContentProps {
  todos: Todo[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  userId: number;
  username: string;
}

export interface TodoState {
  todos: Todo[];
}
