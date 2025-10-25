export default function ClientsTable({ clients, onViewDetails }) {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-white border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">All Clients</h2>
      </div>

      <div className="overflow-x-auto bg-white">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact person</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-900">{client.companyName}</td>
                <td className="px-6 py-4 text-gray-900">{client.contactPerson}</td>
                <td className="px-6 py-4">
                  <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">
                    {client.email}
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-900">{client.phone}</td>
                <td className="px-6 py-4 text-gray-900">{client.location}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewDetails(client)}
                    className="px-4 py-1 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}