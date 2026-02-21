export type User = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  status: 'active' | 'completed' | 'on_hold';
  progress: number;
  deadline?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type Sprint = {
  id: string;
  project_id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed';
  created_at: string;
  updated_at: string;
};

export type Task = {
  id: string;
  project_id: string;
  sprint_id?: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'in_review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee_id?: string;
  deadline?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  task_id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type Agent = {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  project_id?: string;
  allocation: number;
  status: 'online' | 'offline' | 'busy';
  availability?: string;
  created_at: string;
  updated_at: string;
};

export type Metric = {
  id: string;
  project_id: string;
  metric_name: string;
  value: number;
  week?: number;
  created_at: string;
};
