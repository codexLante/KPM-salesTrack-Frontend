import React, { useState } from 'react';
import { Search, LayoutDashboard, Users, MapPin, ClipboardList, BarChart3, LogOut, ArrowLeft } from 'lucide-react';

const EmployeeManagement = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    status: ''
  });

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Eugene mwite',
      email: 'mugure@blue.io',
      phone: '+1245537687',
      role: 'Sales Manager',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 2,
      name: 'Erica muthoni',
      email: 'doe@blue.io',
      phone: '+1245537687',
      role: 'Sales rep',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 3,
      name: 'Eva Mwaki',
      email: 'tony@Tony.io',
      phone: '+1245537687',
      role: 'Sales rep',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 4,
      name: 'Elly Mbita',
      email: 'Silversufer@board.io',
      phone: '+1245537687',
      role: 'Sales rep',
      status: 'inactive',
      clients: 0,
      initials: 'EM'
    },
    {
      id: 5,
      name: 'John Kamau',
      email: 'jkamau@sales.io',
      phone: '+1245537688',
      role: 'Sales rep',
      status: 'inactive',
      clients: 0,
      initials: 'JK'
    }
  ]);

  const filteredEmployees = employees.filter(emp => {
    const matchesFilter = 
      activeFilter === 'all' ? true :
      activeFilter === 'active' ? emp.status === 'active' :
      emp.status === 'inactive';
    
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const activeCount = employees.filter(e => e.status === 'active').length;
  const inactiveCount = employees.filter(e => e.status === 'inactive').length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEmployee = () => {
    if (formData.fullName && formData.email && formData.phone && formData.role && formData.status) {
      const initials = formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
      const newEmployee = {
        id: employees.length + 1,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        clients: 0,
        initials: initials
      };
      
      setEmployees([...employees, newEmployee]);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        role: '',
        status: ''
      });
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: '',
      status: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl">
            📊
          </div>
          <div>
            <div className="font-bold text-lg">SalesTrack</div>
            <div className="text-xs text-blue-300">Admin Portal</div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 px-3">
          <div className="text-xs text-blue-300 px-3 py-2 mb-2">ADMIN PANEL</div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 cursor-pointer">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 rounded bg-blue-800 cursor-pointer">
              <Users className="w-5 h-5" />
              <span>Employee Management</span>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 cursor-pointer">
              <Users className="w-5 h-5" />
              <span>Client View</span>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 cursor-pointer">
              <MapPin className="w-5 h-5" />
              <span>Live Location</span>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 cursor-pointer">
              <ClipboardList className="w-5 h-5" />
              <span>Task Assignment</span>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 cursor-pointer">
              <BarChart3 className="w-5 h-5" />
              <span>Reports & Analytics</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 cursor-pointer">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">SalesTrack Admin</h1>
        </div>

        {/* Content */}
        <div className="p-8">
          {!showAddForm ? (
            // Employee List View
            <>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Employee Management</h2>
                  <p className="text-gray-600">Manage your sales team members</p>
                </div>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <span className="text-xl">+</span>
                  Add Employee
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 border-l-4 border-teal-400">
                  <div className="text-gray-600 mb-2">Active employees</div>
                  <div className="text-4xl font-light text-teal-600">{activeCount}</div>
                </div>
                <div className="bg-white rounded-lg p-6 border-l-4 border-red-400">
                  <div className="text-gray-600 mb-2">Inactive employees</div>
                  <div className="text-4xl font-light text-red-600">{inactiveCount}</div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="mb-6 flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="search client by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      activeFilter === 'all'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter('active')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      activeFilter === 'active'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setActiveFilter('inactive')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      activeFilter === 'inactive'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Inactive
                  </button>
                </div>
              </div>

              {/* Employee Table */}
              <div className="bg-white rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-6 font-semibold">Name</th>
                      <th className="text-left py-4 px-6 font-semibold">Contact</th>
                      <th className="text-left py-4 px-6 font-semibold">Role</th>
                      <th className="text-left py-4 px-6 font-semibold">Status</th>
                      <th className="text-left py-4 px-6 font-semibold">clients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {employee.initials}
                            </div>
                            <span className="font-medium">{employee.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            <div className="text-gray-600">{employee.email}</div>
                            <div className="font-medium">{employee.phone}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium">{employee.role}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-6 py-2 rounded-full text-white text-sm font-medium inline-block ${
                              employee.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          >
                            {employee.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-2xl font-light text-cyan-500">{employee.clients}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            // Add Employee Form
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleCancel}
                  className="w-12 h-12 border-2 border-cyan-500 rounded flex items-center justify-center hover:bg-cyan-50"
                >
                  <ArrowLeft className="w-6 h-6 text-cyan-500" />
                </button>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Add New Employee</h2>
                  <p className="text-gray-600">Fill in the details to add a new team member</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8">
                <h3 className="text-xl font-bold mb-2">Employee information</h3>
                <p className="text-gray-600 mb-8">Enter the details of the new employee below</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold mb-3">Full Name :</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-3">Email address:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-3">Phone number :</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-3">Role :</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g. Sales rep, Sales Manager"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-3">Status:</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Select status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEmployee}
                    className="flex-1 px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600"
                  >
                    Add Employee
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;