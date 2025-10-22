
import { FaPlus } from 'react-icons/fa';
import SearchBar from './SearchBar';
import TaskCard from './TaskCard';

const TaskListView = ({ 
  searchTerm, 
  setSearchTerm, 
  setShowAddForm,
  filteredTasks,
  onTaskClick,
  employees
}) => {
    
  // Group tasks by status
  const inProgressTasks = filteredTasks.filter(t => t.status === 'In Progress');
  const completedTasks = filteredTasks.filter(t => t.status === 'Completed');
  const activeTasks = filteredTasks.filter(t => t.status === 'Active');

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Task Assignment</h2>
          <p className="text-gray-600">Manage and track tasks across your sales team</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium shadow-md hover:shadow-lg transition-all"
        >
          <FaPlus />
          Assign Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500 shadow-sm">
          <div className="text-gray-600 text-sm mb-2">In Progress</div>
          <div className="text-5xl font-light text-blue-500">{inProgressTasks.length}</div>
        </div>
        <div className="bg-white rounded-lg p-6 border-l-4 border-emerald-500 shadow-sm">
          <div className="text-gray-600 text-sm mb-2">Completed Today</div>
          <div className="text-5xl font-light text-emerald-500">{completedTasks.length}</div>
        </div>
        <div className="bg-white rounded-lg p-6 border-l-4 border-cyan-500 shadow-sm">
          <div className="text-gray-600 text-sm mb-2">Total Active</div>
          <div className="text-5xl font-light text-cyan-500">{activeTasks.length}</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          placeholder="Search tasks by title or employee..."
        />
      </div>

      {/* Task Sections */}
      <div className="space-y-8">
        {/* In Progress Section */}
        {inProgressTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-bold text-gray-800">In Progress ({inProgressTasks.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onClick={onTaskClick}
                  employees={employees}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Section */}
        {completedTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <h3 className="text-lg font-bold text-gray-800">Completed ({completedTasks.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onClick={onTaskClick}
                  employees={employees}
                />
              ))}
            </div>
          </div>
        )}

        {/* Active Section */}
        {activeTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <h3 className="text-lg font-bold text-gray-800">Total Active ({activeTasks.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onClick={onTaskClick}
                  employees={employees}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No tasks found</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="text-cyan-500 hover:text-cyan-600 font-medium"
          >
            Create your first task
          </button>
        </div>
      )}
    </>
  );
};

export default TaskListView;