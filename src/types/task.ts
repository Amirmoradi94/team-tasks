export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Status = 'backlog' | 'todo' | 'in-progress' | 'done';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee?: User;
  createdBy: User;
  createdAt: Date;
  dueDate?: Date;
  tags: string[];
}

export interface Team {
  id: string;
  name: string;
  members: User[];
}
