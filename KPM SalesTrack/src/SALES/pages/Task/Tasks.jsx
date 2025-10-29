import { useState } from "react";
import { TasksHeader } from "./TasksHeader";
import { TasksStats } from "./TasksStats";
import { TasksTabs } from "./TasksTabs";
import { TasksList } from "./TasksList";
import { MessagesList } from "./MessagesList";
import CompletedTasksList from "./CompletedTasksList";
import { TaskDetailsModal } from "./TaskDetailsModal";

export default function Tasks() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Dummy tasks data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Follow up with ABC Corp",
      description: "Call to discuss the proposal sent last week",
      date: "Today, 3:00PM",
      assignedBy: "Sarah Johnson (Manager)",
      status: "pending",
      dueDate: new Date(),
      dueTime: "3:00 PM",
      notes: "Client expressed interest in premium package during last meeting"
    },
    {
      id: 2,
      title: "Send Proposal to Tech Solutions",
      description: "Prepare and send comprehensive proposal for annual contract",
      date: "Tomorrow",
      assignedBy: "Sarah Johnson (Manager)",
      status: "pending",
      dueDate: new Date(Date.now() + 86400000),
      dueTime: "10:00 AM",
      notes: "Include pricing for both standard and enterprise tiers"
    },
    {
      id: 3,
      title: "Prepare demo for Global Ventures",
      description: "Set up demo environment and prepare presentation materials",
      date: "Oct 21, 2025",
      assignedBy: "Sarah Johnson (Manager)",
      status: "pending",
      dueDate: new Date('2025-10-21'),
      dueTime: "2:00 PM",
      notes: "Focus on automation features they requested"
    }
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 4,
      title: "Client meeting with DataSync Inc",
      description: "Quarterly review meeting completed successfully",
      date: "Oct 15, 2025",
      assignedBy: "Sarah Johnson (Manager)",
      status: "completed",
      completedDate: new Date('2025-10-15'),
      dueTime: "11:00 AM",
      notes: "Meeting went well, client satisfied with progress"
    },
    {
      id: 5,
      title: "Update CRM records",
      description: "Updated all client information in the system",
      date: "Oct 18, 2025",
      assignedBy: "Sarah Johnson (Manager)",
      status: "completed",
      completedDate: new Date('2025-10-18'),
      dueTime: "4:00 PM",
      notes: "All records updated and verified"
    },
    {
      id: 6,
      title: "Submit weekly report",
      description: "Weekly performance report submitted to management",
      date: "Oct 20, 2025",
      assignedBy: "Sarah Johnson (Manager)",
      status: "completed",
      completedDate: new Date('2025-10-20'),
      dueTime: "5:00 PM",
      notes: "Report includes Q3 performance metrics"
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Johnson",
      role: "Manager",
      message: "Great work on the ABC Corp proposal! Please schedule a follow-up meeting for next week.",
      time: "10:30 AM",
      date: "Today",
      unread: true
    }
  ]);

  const handleMarkComplete = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const completedTask = {
        ...task,
        status: "completed",
        completedDate: new Date()
      };
      setCompletedTasks([completedTask, ...completedTasks]);
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const handleViewDetails = (taskId) => {
    // Find task in either pending or completed tasks
    const task = tasks.find(t => t.id === taskId) || completedTasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setShowDetailsModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedTask(null);
  };

  const pendingCount = tasks.length;
  const completedCount = completedTasks.length;
  const messagesCount = messages.filter(m => m.unread).length;

  return (
    <div className="space-y-6">
      <TasksHeader />
      
      <TasksStats 
        pending={pendingCount}
        completed={completedCount}
        messages={messagesCount}
      />

      <TasksTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tasksCount={pendingCount}
        messagesCount={messagesCount}
        completedCount={completedCount}
      />

      {activeTab === "tasks" && (
        <TasksList 
          tasks={tasks}
          onMarkComplete={handleMarkComplete}
          onViewDetails={handleViewDetails}
        />
      )}

      {activeTab === "messages" && (
        <MessagesList messages={messages} />
      )}

      {activeTab === "completed" && (
        <CompletedTasksList 
          tasks={completedTasks}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* Task Details Modal */}
      {showDetailsModal && selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={handleCloseModal}
          onMarkComplete={handleMarkComplete}
        />
      )}
    </div>
  );
}