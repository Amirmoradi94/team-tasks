import { motion } from 'framer-motion';
import { Task, Status } from '@/types/task';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';

interface TaskColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  onAddTask: (status: Status) => void;
  onTaskClick: (task: Task) => void;
}

const statusColors: Record<Status, string> = {
  backlog: 'bg-muted-foreground/20',
  todo: 'bg-info/20',
  'in-progress': 'bg-warning/20',
  done: 'bg-success/20',
};

const statusDots: Record<Status, string> = {
  backlog: 'bg-muted-foreground',
  todo: 'bg-info',
  'in-progress': 'bg-warning',
  done: 'bg-success',
};

export function TaskColumn({ title, status, tasks, onAddTask, onTaskClick }: TaskColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-80 min-w-[320px]"
    >
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${statusDots[status]}`} />
          <h3 className="font-medium text-foreground">{title}</h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]} text-foreground`}>
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <TaskCard task={task} onClick={() => onTaskClick(task)} />
          </motion.div>
        ))}
        
        {tasks.length === 0 && (
          <div className="glass-card p-6 text-center">
            <p className="text-muted-foreground text-sm">No tasks yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
