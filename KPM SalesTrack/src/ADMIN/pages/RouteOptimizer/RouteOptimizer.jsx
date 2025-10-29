import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { RouteStats } from './RoutesStats';
import { RouteCard } from './RouteCard';

const RouteOptimizer = () => {
  const navigate = useNavigate();

  

  const [routes, setRoutes] = useState([
    {
      id: 1,
      date: '2025-10-23',
      salesPerson: 'John Smith',
      status: 'suggested',
      timeSaved: '21%',
      distance: '9.6 mi',
      duration: '5 hours',
      meetings: [
        { id: 1, company: 'ABC Corporation', address: '123 Main St, New York, NY', time: '10:00 AM', duration: '1.2 mi' },
        { id: 2, company: 'Tech Solutions Inc', address: '456 Broadway, New York, NY', time: '2:00 PM', duration: '3.8 mi' },
        { id: 3, company: 'Global Ventures', address: '789 5th Ave, New York, NY', time: '4:30 PM', duration: '4.6 mi' }
      ]
    },
    {
      id: 2,
      date: '2025-10-24',
      salesPerson: 'Sarah Johnson',
      status: 'suggested',
      timeSaved: '18%',
      distance: '12.4 mi',
      duration: '6 hours',
      meetings: [
        { id: 4, company: 'Innovate Corp', address: '321 Park Ave, New York, NY', time: '11:00 AM', duration: '2.1 mi' },
        { id: 5, company: 'Future Tech LLC', address: '654 Madison Ave, New York, NY', time: '1:30 PM', duration: '5.3 mi' }
      ]
    },
    {
      id: 3,
      date: '2025-10-25',
      salesPerson: 'Mike Davis',
      status: 'suggested',
      timeSaved: '15%',
      distance: '8.2 mi',
      duration: '4 hours',
      meetings: [
        { id: 6, company: 'Digital Dynamics', address: '987 Lexington Ave, New York, NY', time: '9:00 AM', duration: '1.8 mi' },
        { id: 7, company: 'Enterprise Solutions', address: '147 Wall St, New York, NY', time: '3:00 PM', duration: '6.4 mi' }
      ]
    }
  ]);

  const suggestedCount = routes.filter(r => r.status === 'suggested').length;
  const acceptedCount = routes.filter(r => r.status === 'accepted').length;

  const handleAcceptRoute = (routeId) => {
    setRoutes(routes.map(route => 
      route.id === routeId ? { ...route, status: 'accepted' } : route
    ));
  };

  const handleRejectRoute = (routeId) => {
    setRoutes(routes.map(route => 
      route.id === routeId ? { ...route, status: 'rejected' } : route
    ));
  };

  const handleReoptimize = (routeId) => {
    // Call API to re-optimize
    alert('Re-optimizing route...');
  };

  const handleBackToMeetings = () => {
    navigate('/admin/meetings');
  };

  const handleAcceptAll = () => {
    setRoutes(routes.map(route => ({ ...route, status: 'accepted' })));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBackToMeetings}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <FaArrowLeft />
            <span className="text-sm">Back to Meetings</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Route Optimization</h1>
          <p className="text-gray-600">Review and accept optimized routes to send to salespersons</p>
        </div>

        {/* Stats */}
        <RouteStats 
          totalRoutes={routes.length}
          suggestedCount={suggestedCount}
          acceptedCount={acceptedCount}
        />

        {/* Accept All Button */}
        {suggestedCount > 0 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaCheckCircle />
              Accept All Routes
            </button>
          </div>
        )}

        {/* Routes List */}
        <div className="space-y-6">
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onAccept={handleAcceptRoute}
              onReject={handleRejectRoute}
              onReoptimize={handleReoptimize}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizer;