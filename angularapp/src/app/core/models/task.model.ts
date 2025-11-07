export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  categoryId: number;
  categoryName?: string;
  createdDate: Date;
  userId: number;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  categoryId: number;
}

export interface UpdateTaskRequest {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  categoryId: number;
}
