import { useState, useEffect } from 'react';
import axios from 'axios';
import ObjectivesActions from './ObjectivesActions';
import OverallProgress from './OvarallProgess';
import ObjectivesBreakdown from './ObjectivesBreakdown';
import ObjectiveModal from './ObjectiveModal';

const API_BASE_URL = 'http://127.0.0.1:5000/objectives';

export default function SalesObjectives() {
  const [objectives, setObjectives] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingObjective, setEditingObjective] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      const id = decoded.sub || decoded.id;
      return parseInt(id, 10);
    } catch (e) {
      console.error('Failed to decode token:', e);
      return null;
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }

    const decodedUserId = decodeToken(token);
    console.log('Decoded User ID:', decodedUserId, 'Type:', typeof decodedUserId);
    
    if (!decodedUserId || isNaN(decodedUserId)) {
      setError('Failed to get user information');
      setLoading(false);
      return;
    }

    setUserId(decodedUserId);
    fetchObjectives(token);
  }, []);

  const fetchObjectives = (token) => {
    setLoading(true);
    setError('');

    axios({
      method: 'GET',
      url: `${API_BASE_URL}/my_objectives`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: { page: 1, per_page: 100 }
    })
      .then((res) => {
        console.log('Objectives fetched:', res.data.objectives);
        setObjectives(res.data.objectives || []);
      })
      .catch((e) => {
        console.error('Failed to load objectives:', e);
        setError(e.response?.data?.error || 'Failed to load objectives');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddObjective = () => {
    setEditingObjective(null);
    setIsModalOpen(true);
  };

  const handleEditObjective = (objective) => {
    setEditingObjective(objective);
    setIsModalOpen(true);
  };

  const handleSaveObjective = (objectiveData) => {
    if (!userId || isNaN(userId)) {
      setError('User information not available');
      console.error('Invalid userId:', userId);
      return;
    }

    setSaving(true);
    setError('');

    const baseApiData = {
      title: objectiveData.title,
      description: objectiveData.description,
      target_value: parseInt(objectiveData.target_value, 10),
      unit: objectiveData.unit,
      start_date: objectiveData.start_date,
      end_date: objectiveData.end_date,
      user_id: parseInt(userId, 10)
    };

    if (editingObjective) {
      const putData = {
        ...baseApiData,
        created_by: editingObjective.created_by, 
      };

      axios({
        method: 'PUT',
        url: `${API_BASE_URL}/${editingObjective.id}/updated`,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        data: putData
      })
        .then((res) => {
          setObjectives(objectives.map(obj =>
            obj.id === editingObjective.id ? res.data.objective : obj
          ));
          setIsModalOpen(false);
        })
        .catch((e) => {
          console.error('Failed to update objective:', e);
          setError(e.response?.data?.error || 'Failed to update objective');
        })
        .finally(() => {
          setSaving(false);
        });
    } else {
      axios({
        method: 'POST',
        url: `${API_BASE_URL}/create`,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        data: baseApiData
      })
        .then((res) => {
          setObjectives([...objectives, res.data.objective]);
          setIsModalOpen(false);
        })
        .catch((e) => {
          console.error('Failed to create objective:', e);
          setError(e.response?.data?.error || 'Failed to create objective');
        })
        .finally(() => {
          setSaving(false);
        });
    }
  };

  const handleDeleteObjective = (id) => {
    if (!window.confirm('Are you sure you want to delete this objective?')) return;

    setError('');

    axios({
      method: 'DELETE',
      url: `${API_BASE_URL}/${id}/delete`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setObjectives(objectives.filter(obj => obj.id !== id));
      })
      .catch((e) => {
        console.error('Failed to delete objective:', e);
        setError(e.response?.data?.error || 'Failed to delete objective');
      });
  };

  const handleUpdateProgress = (id, currentValue) => {
    setUpdating(true);
    setError('');

    const objective = objectives.find(obj => obj.id === id);
    if (!objective) {
      setUpdating(false);
      return;
    }
    const start_date_str = objective.start_date;
    const end_date_str = objective.end_date;

    axios({
      method: 'PUT',
      url: `${API_BASE_URL}/${id}/updated`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      data: {
        title: objective.title,
        description: objective.description,
        target_value: objective.target_value,
        unit: objective.unit,
        start_date: start_date_str, 
        end_date: end_date_str,
        user_id: objective.user_id, 
        created_by: objective.created_by,
        current_value: currentValue,
      } 
    })
      .then((res) => {
        setObjectives(objectives.map(obj =>
          obj.id === id ? res.data.objective : obj
        ));
      })
      .catch((e) => {
        console.error('Failed to update progress:', e);
        setError(e.response?.data?.error || 'Failed to update progress');
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const totalTarget = objectives.reduce((sum, obj) => sum + (obj.target_value || 0), 0);
  const totalCompleted = objectives.reduce((sum, obj) => sum + (obj.current_value || 0), 0);
  const overallProgress = totalTarget > 0 ? Math.round((totalCompleted / totalTarget) * 100) : 0;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header and Actions */}
        <ObjectivesActions onAddObjective={handleAddObjective} />

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="underline">Dismiss</button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading objectives...</p>
          </div>
        ) : (
          <>
            {/* Overall Progress */}
            <OverallProgress percentage={overallProgress} />

            {/* Objectives Breakdown */}
            <ObjectivesBreakdown
              objectives={objectives}
              onEdit={handleEditObjective}
              onDelete={handleDeleteObjective}
              onUpdateProgress={handleUpdateProgress}
              updating={updating}
            />
          </>
        )}

        {/* Modal */}
        {isModalOpen && (
          <ObjectiveModal
            objective={editingObjective}
            onSave={handleSaveObjective}
            onClose={() => setIsModalOpen(false)}
            saving={saving}
          />
        )}
      </div>
    </div>
  );
}