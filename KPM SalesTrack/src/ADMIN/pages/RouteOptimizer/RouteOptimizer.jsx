import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { RouteStats } from './RoutesStats';
import { RouteCard } from './RouteCard';

const API_BASE_URL = 'http://localhost:5000';

const RouteOptimizer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [routes, setRoutes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasOptimized, setHasOptimized] = useState(false);
  
  const [dateRange, setDateRange] = useState({
    start_date: location.state?.startDate || '',
    end_date: location.state?.endDate || ''
  });
  const [employeeFilter, setEmployeeFilter] = useState(
    location.state?.employeeFilter || 'all'
  );

  const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return null;
    }
    return token;
  };

  // Fetch employees
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    axios({
      method: "GET",
      url: `${API_BASE_URL}/users/GetAll`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        setEmployees(res.data.users || []);
      })
      .catch((err) => {
        console.log('Failed to fetch employees:', err);
        setEmployees([
          { id: 1, name: 'Eugene Mwite', role: 'Sales Manager' },
          { id: 2, name: 'Erica Muthoni', role: 'Sales rep' },
          { id: 3, name: 'Eva Mwaki', role: 'Sales rep' }
        ]);
      });
  }, []);

  // Auto-optimize if dates passed from meetings page
  useEffect(() => {
    if (location.state?.startDate && location.state?.endDate) {
      handleOptimizeRoutes();
    }
  }, []);

  const handleOptimizeRoutes = () => {
    if (!dateRange.start_date || !dateRange.end_date) {
      alert('Please select both start and end dates');
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
        let filteredRoutes = res.data.routes;
        if (employeeFilter !== 'all') {
          filteredRoutes = filteredRoutes.filter(r => r.user_id === parseInt(employeeFilter));
        }
        setRoutes(filteredRoutes);
        setHasOptimized(true);
        console.log('Routes optimized:', res.data);
      })
      .catch((err) => {
        console.log('Error:', err);
        
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }

        const errorMsg = err.response?.data?.error || 'Failed to optimize routes';
        setError(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAcceptRoute = (routeId) => {
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
      data: { status: 'accepted' }
    })
      .then((res) => {
        setRoutes(routes.map(route => 
          route.id === routeId ? { ...route, status: 'accepted' } : route
        ));
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }
        alert(`Error: ${err.response?.data?.error || 'Failed to accept route'}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRejectRoute = (routeId) => {
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
      data: { status: 'rejected' }
    })
      .then((res) => {
        setRoutes(routes.map(route => 
          route.id === routeId ? { ...route, status: 'rejected' } : route
        ));
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }
        alert(`Error: ${err.response?.data?.error || 'Failed to reject route'}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAcceptAll = () => {
    const token = getToken();
    if (!token) return;

    const suggestedRoutes = routes.filter(r => r.status === 'suggested');
    
    suggestedRoutes.forEach(route => {
      axios({
        method: "PUT",
        url: `${API_BASE_URL}/routes/${route.id}/approve`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: { status: 'accepted' }
      })
        .then((res) => {
          setRoutes(prevRoutes => prevRoutes.map(r => 
            r.id === route.id ? { ...r, status: 'accepted' } : r
          ));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleReoptimize = () => {
    setHasOptimized(false);
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
                >
                  <option value="all">All Employees</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
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
              totalRoutes={totalRoutes}
              suggestedCount={suggestedCount}
              acceptedCount={acceptedCount}
            />

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
                <p className="text-gray-600">No routes available</p>
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