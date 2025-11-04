import { useState, useEffect } from 'react';
import axios from 'axios';
import ObjectivesActions from './ObjectivesActions';
import OverallProgress from './OvarallProgess';
import ObjectivesBreakdown from './ObjectivesBreakdown';
import ObjectiveModal from './ObjectiveModal';
import { Modal } from '../../components/modal';

const API_BASE_URL = 'https://kpm-salestrack-backend.onrender.com/objectives';

export default function SalesObjectives() {
  const [objectives, setObjectives] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingObjective, setEditingObjective] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(''); 
  const [userId, setUserId] = useState(null);
  const [statusModal, setStatusModal] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const showStatusModal = (title, message, type = 'success', actions = []) => {
    setStatusModal({ title, message, type, actions });
  };
  const closeStatusModal = () => setStatusModal(null);

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
      showStatusModal('Error', 'User information not available. Cannot save objective.', 'error');
      return;
    }

    setSaving(true);
    setError('');

    const isEdit = !!editingObjective;
    
    const baseApiData = {
      title: objectiveData.title,
      description: objectiveData.description,
      target_value: parseInt(objectiveData.target_value, 10),
      unit: objectiveData.unit,
      start_date: objectiveData.start_date,
      end_date: objectiveData.end_date,
      user_id: parseInt(userId, 10),
      created_by: isEdit ? editingObjective.created_by : parseInt(userId, 10)
    };

    const requestConfig = isEdit ? 
      {
        method: 'PUT',
        url: `${API_BASE_URL}/${editingObjective.id}/updated`,
        data: baseApiData
      } :
      {
        method: 'POST',
        url: `${API_BASE_URL}/create`,
        data: baseApiData
      };

    axios({
        ...requestConfig,
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    })
      .then((res) => {
        const savedObjective = res.data.objective;
        setObjectives(prevObjectives => {
          if (isEdit) {
            return prevObjectives.map(obj =>
              obj.id === savedObjective.id ? savedObjective : obj
            );
          } else {
            return [...prevObjectives, savedObjective];
          }
        });
        
        setIsModalOpen(false);

        const message = isEdit 
          ? `Objective "${savedObjective.title}" updated successfully!`
          : `Objective "${savedObjective.title}" created successfully!`;
          
        showStatusModal('Success', message, 'success');
      })
      .catch((e) => {
        console.error('Failed to save objective:', e);
        const action = isEdit ? 'update' : 'create';
        const errorMsg = e.response?.data?.error || `Failed to ${action} objective`;
        showStatusModal(`Objective ${action} Failed`, errorMsg, 'error');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleDeleteObjective = (id) => {
    const objective = objectives.find(obj => obj.id === id);
    if (!objective) return;
    
    showStatusModal(
      'Confirm Deletion',
      `Are you sure you want to delete the objective: "${objective.title}"? This action cannot be undone.`,
      'error',
      [
        { label: 'Cancel', onClick: closeStatusModal, primary: false },
        { label: 'Delete', onClick: () => confirmDelete(id), primary: true }
      ]
    );
  };
  
  const confirmDelete = (id) => {
    closeStatusModal();
    
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
        showStatusModal('Deleted', 'Objective deleted successfully.', 'success');
      })
      .catch((e) => {
        console.error('Failed to delete objective:', e);
        const errorMsg = e.response?.data?.error || 'Failed to delete objective';
        showStatusModal('Deletion Failed', errorMsg, 'error');
      });
  };

  const handleUpdateProgress = (id, currentValue) => {
    setUpdating(true);
    setError('');

    const objective = objectives.find(obj => obj.id === id);
    if (!objective) {
      setUpdating(false);
      showStatusModal('Error', 'Objective not found.', 'error');
      return;
    }
    
    const newCurrentValue = parseInt(currentValue, 10);

    const requestData = {
      title: objective.title,
      description: objective.description,
      target_value: objective.target_value,
      unit: objective.unit,
      start_date: objective.start_date, 
      end_date: objective.end_date,
      user_id: objective.user_id, 
      created_by: objective.created_by,
      current_value: newCurrentValue, 
    };

    axios({
      method: 'PUT',
      url: `${API_BASE_URL}/${id}/updated`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      data: requestData
    })
      .then((res) => {
        const updatedObjective = res.data.objective;
        setObjectives(prevObjectives => 
          prevObjectives.map(obj => (
            obj.id === id ? updatedObjective : obj
          ))
        );

        const unitDisplay = updatedObjective.unit || ''; 
        
        showStatusModal(
            'Progress Updated', 
            `Progress for "${updatedObjective.title}" updated to ${newCurrentValue} ${unitDisplay}.`, 
            'success'
        );
      })
      .catch((e) => {
        console.error('Failed to update progress:', e);
        const errorMsg = e.response?.data?.error || 'Failed to update progress';
        showStatusModal('Update Failed', errorMsg, 'error');
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

        {/* Error Alert (for non-modal errors like load/auth) */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="underline">Dismiss</button>
          </div>
        )}
        
        {/* RENDER GENERIC STATUS MODAL */}
        {statusModal && <Modal {...statusModal} onClose={closeStatusModal} />}

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

        {/* Custom Objective Form Modal */}
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