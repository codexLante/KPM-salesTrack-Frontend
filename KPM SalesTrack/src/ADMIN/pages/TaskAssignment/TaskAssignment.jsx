import { useState } from 'react';
import TaskListView from './TaskViewList';
import AddTaskForm from './AddTaskForm';
import TaskDetails from './TaskDetails';

const TaskAssignment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    assignedTo: '',
    dueDate: '',
    client: '',
    description: '',
    status: 'In Progress'
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [employees] = useState([
    { id: 1, name: 'Eugene Mwite', email: 'eugi@gmail.com', phone: '+254795432443', role: 'Sales Manager', status: 'active', initials: 'EM' },
    { id: 2, name: 'Erica Muthoni', email: 'ericmu@gmail.com', phone: '+254785734343', role: 'Sales rep', status: 'active', clients: 3, initials: 'EM' },
    { id: 3, name: 'Eva Mwaki', email: 'evamaki@gmail.com', phone: '+254798413457', role: 'Sales rep', status: 'active', clients: 3, initials: 'EM' }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Product Demo Screening', description: 'Evaluate leads for new product launch', assignedTo: 1, dueDate: 'Nov 25, 2024', client: 'Redbox Groupa', status: 'In Progress' },
    { id: 2, title: 'Contract Negotiation', description: 'Negotiate pricing and terms for contract renewal', assignedTo: 2, dueDate: 'Nov 20, 2024', client: '', status: 'In Progress' },
    { id: 3, title: 'Recruitment Demo', description: 'Plan a demo for the client as per the requirements', assignedTo: 3, dueDate: 'Nov 22, 2024', client: '', status: 'In Progress' },
    { id: 4, title: 'Client Onboarding', description: 'Complete onboarding documentation', assignedTo: 1, dueDate: 'Oct 22, 2024', client: 'Dayill Johnson', status: 'Completed' }
  ]);

  const filteredTasks = tasks.filter(task => {
    const employee = employees.find(emp => emp.id === task.assignedTo);
    return task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (employee && employee.name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleAddTask = () => {
    if (formData.title && formData.assignedTo && formData.dueDate && formData.description) {
      const newTask = {
        id: tasks.length + 1,
        ...formData,
        assignedTo: parseInt(formData.assignedTo)
      };

      setTasks([...tasks, newTask]);
      setFormData({
        title: '',
        assignedTo: '',
        dueDate: '',
        client: '',
        description: '',
        status: 'In Progress'
      });
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      assignedTo: '',
      dueDate: '',
      client: '',
      description: '',
      status: 'In Progress'
    });
    setShowAddForm(false);
    setSelectedTask(null);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleBack = () => {
    setSelectedTask(null);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  // Conditional rendering
  if (selectedTask) {
    return (
      <TaskDetails
        task={selectedTask}
        onBack={handleBack}
        employees={employees}
      />
    );
  }

  if (showAddForm) {
    return (
      <AddTaskForm
        formData={formData}
        setFormData={setFormData}
        onAdd={handleAddTask}
        onCancel={handleCancel}
        employees={employees}
      />
    );
  }

  return (
    <TaskListView
      tasks={tasks}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      setShowAddForm={handleShowAddForm}
      filteredTasks={filteredTasks}
      onTaskClick={handleTaskClick}
      employees={employees}
    />
  );
};

export default TaskAssignment;
