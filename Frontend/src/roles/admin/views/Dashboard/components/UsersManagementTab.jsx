import React from "react";
import { Search, MoreVertical, UserCheck, UserX } from "lucide-react";

function UsersManagementTab() {
  // Mock user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", status: "active", joinedDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "seller", status: "active", joinedDate: "2024-02-20" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user", status: "suspended", joinedDate: "2024-03-10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-font-main">User Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-font-secondary" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-surface transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold text-font-main">{user.name}</div>
                    <div className="text-sm text-font-secondary">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary-500 bg-opacity-20 text-amber-50">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1 text-sm ${user.status === 'active' ? 'text-success-500' : 'text-error-500'}`}>
                    {user.status === 'active' ? <UserCheck size={16} /> : <UserX size={16} />}
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-font-secondary text-sm">{user.joinedDate}</td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-surface rounded-lg transition-colors">
                    <MoreVertical size={18} className="text-font-secondary" />
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

export default UsersManagementTab;