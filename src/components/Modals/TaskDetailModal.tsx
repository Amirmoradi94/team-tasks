import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Edit3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Task, Priority, Status } from '@/types/task';
import { format } from 'date-fns';

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (taskId: string) => void;
}

const priorityColors: Record<Priority, { bg: string; text: string }> = {
  low: { bg: 'bg-muted', text: 'text-muted-foreground' },
  medium: { bg: 'bg-info/20', text: 'text-info' },
  high: { bg: 'bg-warning/20', text: 'text-warning' },
  urgent: { bg: 'bg-destructive/20', text: 'text-destructive' },
};

const statusLabels: Record<Status, string> = {
  backlog: 'Backlog',
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

export function TaskDetailModal({ task, isOpen, onClose, onDelete }: TaskDetailModalProps) {
  if (!task) return null;

  const priority = priorityColors[task.priority];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md"
          >
            <div className="h-full bg-card border-l border-border p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-sm font-medium rounded-lg ${priority.bg} ${priority.text}`}>
                    {task.priority}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground">
                    {statusLabels[task.status]}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-4">{task.title}</h2>
              
              <p className="text-muted-foreground mb-6">{task.description}</p>

              <div className="space-y-4 mb-6">
                {task.assignee && (
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Assigned to</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                        <AvatarFallback className="text-xs">
                          {task.assignee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground">{task.assignee.name}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Created by</span>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={task.createdBy.avatar} alt={task.createdBy.name} />
                      <AvatarFallback className="text-xs">
                        {task.createdBy.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground">{task.createdBy.name}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{format(task.createdAt, 'MMM d, yyyy')}</span>
                  </div>
                </div>

                {task.dueDate && (
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Due date</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{format(task.dueDate, 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                )}
              </div>

              {task.tags.length > 0 && (
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground block mb-2">Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-lg bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-8">
                <Button variant="outline" className="flex-1 gap-2 border-border hover:border-primary/50">
                  <Edit3 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onDelete(task.id);
                    onClose();
                  }}
                  className="flex-1 gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
