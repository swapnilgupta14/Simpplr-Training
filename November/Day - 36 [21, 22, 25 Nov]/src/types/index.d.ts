export interface DashboardContentProps {
  tasks: Task[];
}

export interface User {
  id: number;
  username: string;
  role: "Admin" | "Team Manager" | "Team Member";
  email?: string;
  token: string;
  password?: string;
  createdAt?: string;
}
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface Team {
  id: number;
  name: string;
  members: User[];
  managerId: number;
}

export interface Task {
  taskId: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: string;
  dueDate: string;
  status: "completed" | "pending" | "in-progress";
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  assignedTo: number;
  teamId?: number;
  createdBy: number;
  lastModifiedBy?: number;
}

export interface Statistics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasksCount: number;
}

export interface RootState {
  tasks: Task[];
  statistics: Statistics;
}
