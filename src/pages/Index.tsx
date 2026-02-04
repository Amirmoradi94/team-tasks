import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Header } from '@/components/Header/Header';
import { TaskBoard } from '@/components/TaskBoard/TaskBoard';
import { StatsCards } from '@/components/Stats/StatsCards';
import { CreateTaskModal } from '@/components/Modals/CreateTaskModal';
import { InviteModal } from '@/components/Modals/InviteModal';
import { TaskDetailModal } from '@/components/Modals/TaskDetailModal';
import { mockUsers, mockTasks, mockTeam } from '@/data/mockData';
import { Task, Status } from '@/types/task';
import { toast } from 'sonner';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<Status>('todo');

  const currentUser = mockUsers[0];

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;
    const query = searchQuery.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [tasks, searchQuery]);

  const handleAddTask = (status: Status) => {
    setDefaultStatus(status);
    setIsCreateModalOpen(true);
  };

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'createdBy'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      createdBy: currentUser,
    };
    setTasks((prev) => [...prev, newTask]);
    toast.success('Task created successfully!');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast.success('Task deleted');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <Sidebar
        currentUser={currentUser}
        teamMembers={mockTeam.members}
        onInvite={() => setIsInviteModalOpen(true)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          onCreateTask={() => setIsCreateModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="flex-1 overflow-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Good morning, {currentUser.name.split(' ')[0]}! 👋
            </h2>
            <p className="text-muted-foreground">
              Here's what's happening with your projects today.
            </p>
          </motion.div>

          <StatsCards tasks={tasks} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Task Board</h3>
            <TaskBoard
              tasks={filteredTasks}
              onAddTask={handleAddTask}
              onTaskClick={setSelectedTask}
            />
          </motion.div>
        </div>
      </main>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        teamMembers={mockTeam.members}
        defaultStatus={defaultStatus}
      />

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      <TaskDetailModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default Index;
