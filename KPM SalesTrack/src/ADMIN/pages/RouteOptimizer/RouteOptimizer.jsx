import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaFilter } from 'react-icons/fa';
import { RouteStats } from './RoutesStats';
import { RouteCard } from './RouteCard';
import { Modal } from '../../components/modal';

const API_BASE_URL = 'https://kpm-salestrack-backend.onrender.com';

const RouteOptimizer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [rawRoutes, setRawRoutes] = useState([]);
  const [routes, setRoutes] = useState([]);
  
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasOptimized, setHasOptimized] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [employeesError, setEmployeesError] = useState(null);
  

  const [statusModal, setStatusModal] = useState(null);
  const closeStatusModal = () => setStatusModal(null);
  const showStatusModal = (title, message, type = 'success', actions = []) => {
    setStatusModal({ title, message, type, actions });
  };
  
  const [dateRange, setDateRange] = useState({
    start_date: location.state?.startDate || '',
    end_date: location.state?.endDate || ''
  });
  const [employeeFilter, setEmployeeFilter] = useState(
    location.state?.employeeFilter || 'all'
  );

  const getToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return null;
    }
    return token;
  }, [navigate]);

  const applyFilters = useCallback((routesToFilter, filterValue) => {
    if (filterValue === 'all') {
      return routesToFilter;
    }
    const filterId = parseInt(filterValue);
    if (isNaN(filterId)) return routesToFilter;

    return routesToFilter.filter(r => r.user_id === filterId);
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = getToken();
      if (!token) {
        setEmployeesLoading(false);
        return;
      }

      try {
        setEmployeesLoading(true);
        setEmployeesError(null);
        
        console.log('Fetching all employees from:', `${API_BASE_URL}/users/GetAll`);
        
        const response = await axios.get(`${API_BASE_URL}/users/GetAll`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Full employees response:', response.data);

        let usersData = [];
        
        // Handle different response formats
        if (Array.isArray(response?.data?.users)) {
          usersData = response.data.users;
        } else if (Array.isArray(response?.data)) {
          usersData = response.data;
        } else if (response?.data && typeof response.data === 'object') {
          const possibleKeys = Object.keys(response.data);
          console.log('Response keys:', possibleKeys);
          for (const key of possibleKeys) {
            if (Array.isArray(response.data[key])) {
              usersData = response.data[key];
              console.log(`Found array data at key: ${key}`);
              break;
            }
          }
        }

        console.log('All users from database:', usersData);
        console.log('Total users:', usersData.length);

        // Filter for salesman role - THIS SHOULD GET ALL SALESMEN FROM DATABASE
        const salesUsers = usersData.filter(u => {
          const role = (u.role || '').toLowerCase();
          return role === 'salesman' || role === 'sales';
        });
        
        console.log('Salesmen found:', salesUsers);
        console.log('Number of salesmen:', salesUsers.length);

        // Process salesmen data
        const employeesData = salesUsers.map(u => {
          const firstName = u.first_name || u.firstName || 'Unknown';
          const lastName = u.last_name || u.lastName || 'User';
          const firstInitial = firstName.charAt(0) || 'U';
          const lastInitial = lastName.charAt(0) || 'U';
          
          return {
            id: Number(u.id),
            name: `${firstName} ${lastName}`,
            initials: `${firstInitial}${lastInitial}`,
            email: u.email || ''
          };
        });

        console.log('Processed employees:', employeesData);
        console.log('Final employee count:', employeesData.length);
        
        setEmployees(employeesData);
      } catch (err) {
        console.error("Error fetching employees:", err);
        console.error("Error status:", err.response?.status);
        console.error("Error data:", err.response?.data);
        
        const errorMsg = err.response?.data?.error || err.message || 'Failed to fetch employees';
        setEmployeesError(errorMsg);
      } finally {
        setEmployeesLoading(false);
      }
    };

    fetchEmployees();
  }, [getToken]);

  const handleOptimizeRoutes = () => {
    if (!dateRange.start_date || !dateRange.end_date) {
      showStatusModal(
        'Missing Dates',
        'Please select both a start date and an end date to run the route optimization.',
        'warning',
        [{ label: 'Got It', onClick: closeStatusModal }]
      );
      return;
    }

    const token = getToken();
    if (!token) return;

    setIsLoading(true);
    setError(null);
    
    axios({
      method: "POST",
      url: `${API_BASE_URL}/routes/optimize`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        start_date: dateRange.start_date,
        end_date: dateRange.end_date
      }
    })
      .then((res) => {
        const fetchedRoutes = res.data.routes || [];
        setRawRoutes(fetchedRoutes); 
        setHasOptimized(true);
        console.log('Routes optimized:', res.data);
      })
      .catch((err) => {
        console.error('Optimization Error:', err);
        
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const errorMsg = err.response?.data?.error || 'Failed to optimize routes';
        setError(errorMsg);
        showStatusModal(
          'Optimization Failed',
          `Could not generate optimized routes. Details: ${errorMsg}`,
          'error',
          [{ label: 'Dismiss', onClick: closeStatusModal }]
        );
        setRawRoutes([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (location.state?.startDate && location.state?.endDate) {
      handleOptimizeRoutes();
    }
  }, []);

  useEffect(() => {
    const filtered = applyFilters(rawRoutes, employeeFilter);
    setRoutes(filtered);
  }, [rawRoutes, employeeFilter, applyFilters]);

  const handleRouteStatusUpdate = (routeId, newStatus) => {
    const token = getToken();
    if (!token) return;

    setIsLoading(true);
    
    axios({
      method: "PUT",
      url: `${API_BASE_URL}/routes/${routeId}/approve`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: { status: newStatus }
    })
      .then(() => {
        setRawRoutes(prevRawRoutes => prevRawRoutes.map(route => 
          route.id === routeId ? { ...route, status: newStatus } : route
        ));
        
        showStatusModal(
          'Route Status Updated',
          `Route ${routeId} successfully marked as ${newStatus}.`,
          'success',
          [{ label: 'Close', onClick: closeStatusModal }]
        );
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        
        const errorMsg = err.response?.data?.error || `Failed to ${newStatus} route`;

        showStatusModal(
          'Update Failed',
          `Failed to update route status to '${newStatus}'. Details: ${errorMsg}`,
          'error',
          [{ label: 'Dismiss', onClick: closeStatusModal }]
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAcceptRoute = (routeId) => handleRouteStatusUpdate(routeId, 'accepted');
  const handleRejectRoute = (routeId) => handleRouteStatusUpdate(routeId, 'rejected');

  const handleAcceptAll = () => {
    const suggestedRoutes = routes.filter(r => r.status === 'suggested');
    
    showStatusModal(
      'Confirm Action',
      `Are you sure you want to accept all ${suggestedRoutes.length} suggested routes?`,
      'info',
      [
        { 
          label: 'Cancel', 
          onClick: closeStatusModal, 
          style: 'border-gray-300 text-gray-700 hover:bg-gray-100' 
        },
        { 
          label: 'Accept All', 
          onClick: () => {
            suggestedRoutes.forEach(route => {
              handleRouteStatusUpdate(route.id, 'accepted'); 
            });
            closeStatusModal();
          }, 
          style: 'bg-green-600 text-white hover:bg-green-700' 
        },
      ]
    );
  };

  const handleReoptimize = () => {
    setHasOptimized(false);
    setRawRoutes([]);
    setRoutes([]);
  };

  const handleBackToMeetings = () => {
    navigate('/admin/meetings');
  };

  const suggestedCount = routes.filter(r => r.status === 'suggested').length;
  const acceptedCount = routes.filter(r => r.status === 'accepted').length;
  const totalRoutes = routes.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {statusModal && <Modal {...statusModal} onClose={closeStatusModal} />}
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={handleBackToMeetings}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <FaArrowLeft />
            <span className="text-sm">Back to Meetings</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Route Optimization</h1>
          <p className="text-gray-600">Review and accept optimized routes</p>
        </div>

        {/* Show employees error if any */}
        {employeesError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-700">
              <strong>Warning:</strong> {employeesError}
            </p>
          </div>
        )}

        {!hasOptimized && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Date Range</h2>
            <div className="flex items-end gap-4 flex-wrap">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start_date}
                  onChange={(e) => setDateRange({ ...dateRange, start_date: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={dateRange.end_date}
                  onChange={(e) => setDateRange({ ...dateRange, end_date: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Employee</label>
                <select
                  value={employeeFilter}
                  onChange={(e) => setEmployeeFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={employeesLoading}
                >
                  <option value="all">
                    {employeesLoading ? 'Loading employees...' : `All Employees (${employees.length})`}
                  </option>
                  {employees.length > 0 ? (
                    employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No employees found</option>
                  )}
                </select>
                {employeesError && (
                  <p className="text-red-500 text-xs mt-1">{employeesError}</p>
                )}
              </div>

              <button
                onClick={handleOptimizeRoutes}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {isLoading ? 'Optimizing...' : 'Optimize Routes'}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isLoading && !hasOptimized && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-6">
            <span className="animate-pulse text-blue-600 font-semibold">Optimizing routes...</span>
          </div>
        )}

        {hasOptimized && (
          <>
            <RouteStats 
              totalRoutes={rawRoutes.length}
              suggestedCount={rawRoutes.filter(r => r.status === 'suggested').length}
              acceptedCount={rawRoutes.filter(r => r.status === 'accepted').length}
            />
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-blue-500">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaFilter className="text-blue-500"/> Filter Routes
                </h2>
                <div className="flex items-end gap-4 flex-wrap">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Employee</label>
                        <select
                            value={employeeFilter}
                            onChange={(e) => setEmployeeFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        >
                            <option value="all">{`All Employees (${employees.length})`}</option>
                            {employees.length > 0 ? (
                              employees.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                  {emp.name}
                                </option>
                              ))
                            ) : (
                              <option disabled>No employees found</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>

            {routes.length > 0 && (
              <div className="mb-6 flex justify-end gap-4">
                <button
                  onClick={handleReoptimize}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Optimize Again
                </button>
                {suggestedCount > 0 && (
                  <button
                    onClick={handleAcceptAll}
                    disabled={isLoading}
                    className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
                  >
                    <FaCheckCircle />
                    Accept All Routes
                  </button>
                )}
              </div>
            )}

            {routes.length > 0 ? (
              <div className="space-y-6">
                {routes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    onAccept={handleAcceptRoute}
                    onReject={handleRejectRoute}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-600">No routes match the current filter selection.</p>
              </div>
            )}
          </>
        )}

        {!hasOptimized && !isLoading && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 text-lg">Select a date range and optimize routes to see results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteOptimizer;