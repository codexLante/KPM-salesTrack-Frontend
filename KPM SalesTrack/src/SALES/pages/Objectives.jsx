import { useState } from "react";
import ObjectivesActions from "../components/ObjectivesActions";
import OverallProgress from "../components/OvarallProgess.jsx";
import ObjectivesBreakdown from "../components/ObjectivesBreakdown";
import ObjectiveModal from "../components/ObjectiveModal";

export default function Objectives() {
  const [objectives, setObjectives] = useState([
    { id: 1, name: "Client Meetings", target: 10, completed: 7, unit: "meetings" },
    { id: 2, name: "New Clients", target: 5, completed: 3, unit: "clients" },
    { id: 3, name: "Proposals Sent", target: 8, completed: 6, unit: "proposals" },
    { id: 4, name: "Follow-up Calls", target: 15, completed: 10, unit: "calls" },
    { id: 5, name: "Demos Conducted", target: 6, completed: 4, unit: "demos" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingObjective, setEditingObjective] = useState(null);

  // Handlers
  const handleAddObjective = () => {
    setEditingObjective(null);
    setIsModalOpen(true);
  };

  const handleEditObjective = (objective) => {
    setEditingObjective(objective);
    setIsModalOpen(true);
  };

  const handleSaveObjective = (objectiveData) => {
    if (editingObjective) {
      setObjectives(objectives.map(obj => 
        obj.id === editingObjective.id ? { ...obj, ...objectiveData } : obj
      ));
    } else {
      const newObjective = { id: Date.now(), ...objectiveData, completed: 0 };
      setObjectives([...objectives, newObjective]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteObjective = (id) => {
    if (window.confirm('Are you sure you want to delete this objective?')) {
      setObjectives(objectives.filter(obj => obj.id !== id));
    }
  };

  const handleUpdateProgress = (id, completed) => {
    setObjectives(objectives.map(obj => 
      obj.id === id ? { ...obj, completed } : obj
    ));
  };

  // Calculate overall progress
  const totalTarget = objectives.reduce((sum, obj) => sum + obj.target, 0);
  const totalCompleted = objectives.reduce((sum, obj) => sum + obj.completed, 0);
  const overallProgress = Math.round((totalCompleted / totalTarget) * 100);

  return (
    <div className="space-y-6">
      <ObjectivesActions onAddObjective={handleAddObjective} />
      
      <OverallProgress percentage={overallProgress} />
      
      <ObjectivesBreakdown
        objectives={objectives}
        onEdit={handleEditObjective}
        onDelete={handleDeleteObjective}
        onUpdateProgress={handleUpdateProgress}
      />

      {isModalOpen && (
        <ObjectiveModal
          objective={editingObjective}
          onSave={handleSaveObjective}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}