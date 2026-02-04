import { Task, Status } from '@/types/task';
import { TaskColumn } from './TaskColumn';

interface TaskBoardProps {
  tasks: Task[];
  onAddTask: (status: Status) => void;
  onTaskClick: (task: Task) => void;
}

const columns: { title: string; status: Status }[] = [
  { title: 'Backlog', status: 'backlog' },
  { title: 'To Do', status: 'todo' },
  { title: 'In Progress', status: 'in-progress' },
  { title: 'Done', status: 'done' },
];

export function TaskBoard({ tasks, onAddTask, onTaskClick }: TaskBoardProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 px-1">
      {columns.map((column) => (
        <TaskColumn
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks.filter((task) => task.status === column.status)}
          onAddTask={onAddTask}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
}
