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

  const getToken = () => localStorage.getItem('token');
  const userId = parseInt(localStorage.getItem('user_id') || '1');

  useEffect(() => {
    setLoading(true);
    setError('');

    axios({
      method: 'GET',
      url: `${API_BASE_URL}/my_objectives`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      params: { page: 1, per_page: 100 }
    })
      .then((res) => {
        setObjectives(res.data.objectives || []);
      })
      .catch((e) => {
        console.log(e);
        setError('Failed to load objectives');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddObjective = () => {
    setEditingObjective(null);
    setIsModalOpen(true);
  };

  const handleEditObjective = (objective) => {
    setEditingObjective(objective);
    setIsModalOpen(true);
  };

  const handleSaveObjective = (objectiveData) => {
    setSaving(true);
    setError('');

    if (editingObjective) {
      axios({
        method: 'PUT',
        url: `${API_BASE_URL}/${editingObjective.id}/updated`,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        data: {
          title: objectiveData.title,
          description: objectiveData.description,
          target_value: objectiveData.target_value,
          start_date: editingObjective.start_date,
          end_date: editingObjective.end_date,
          user_id: userId,
          created_by: userId
        }
      })
        .then((res) => {
          setObjectives(objectives.map(obj =>
            obj.id === editingObjective.id ? res.data.objective : obj
          ));
          setIsModalOpen(false);
        })
        .catch((e) => {
          console.log(e);
          setError(e.response?.data?.error || 'Failed to update objective');
        })
        .finally(() => {
          setSaving(false);
        });
    } else {
      const today = new Date().toISOString().split('T')[0];
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);

      axios({
        method: 'POST',
        url: `${API_BASE_URL}/create`,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        data: {
          title: objectiveData.title,
          description: objectiveData.description,
          target_value: objectiveData.target_value,
          start_date: today,
          end_date: endDate.toISOString().split('T')[0],
          user_id: userId,
          created_by: userId
        }
      })
        .then((res) => {
          setObjectives([...objectives, res.data.objective]);
          setIsModalOpen(false);
        })
        .catch((e) => {
          console.log(e);
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
        console.log(e);
        setError(e.response?.data?.error || 'Failed to delete objective');
      });
  };

  const handleUpdateProgress = (id, currentValue) => {
    setUpdating(true);
    setError('');

    const objective = objectives.find(obj => obj.id === id);

    axios({
      method: 'PUT',
      url: `${API_BASE_URL}/objectives/${id}/updated`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      data: {
        title: objective.title,
        description: objective.description,
        target_value: objective.target_value,
        start_date: objective.start_date,
        end_date: objective.end_date,
        user_id: userId,
        created_by: userId,
        current_value: currentValue
      }
    })
      .then((res) => {
        setObjectives(objectives.map(obj =>
          obj.id === id ? res.data.objective : obj
        ));
      })
      .catch((e) => {
        console.log(e);
        setError(e.response?.data?.error || 'Failed to update progress');
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const totalTarget = objectives.reduce((sum, obj) => sum + obj.target_value, 0);
  const totalCompleted = objectives.reduce((sum, obj) => sum + obj.current_value, 0);
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