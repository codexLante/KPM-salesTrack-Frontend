// src/SALES/components/AddClientForm.jsx
import { useState } from "react";
import { ArrowLeft, Briefcase } from "lucide-react";

export default function AddClientForm({ onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 p-3 border-2 border-teal-400 rounded-lg hover:bg-teal-50 transition-colors"
      >
        <ArrowLeft className="text-teal-400" size={24} />
      </button>

      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Add a client</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-3">
          <Briefcase className="text-blue-500 mt-1" size={24} />
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Client Information</h2>
            <p className="text-gray-600">Fill in the information below to add a client</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-900 font-semibold mb-2">Company Name:</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold mb-2">Contact person:</label>
          <input
            type="text"
            placeholder="Enter Contact Persons name"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold mb-2">Email Address:</label>
          <input
            type="email"
            placeholder="Enter the company's email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold mb-2">Phone Number:</label>
          <input
            type="tel"
            placeholder="eg. +254 712654537"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold mb-2">Location:</label>
          <input
            type="text"
            placeholder="Enter clients location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold mb-2">Notes:</label>
          <textarea
            placeholder="Add notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Add Client
          </button>
        </div>
      </form>
    </div>
  );
}