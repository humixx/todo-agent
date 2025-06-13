export type Task = {
  id: number;
  content: string;
  status: TaskStatus;
  dateTime?: string; // ISO string or any format you prefer, optional
};

export enum TaskStatus {
  todo = "todo",
  done = "done",
}

export type TaskGroup = {
  title: string;
  tasks: Task[];
};
