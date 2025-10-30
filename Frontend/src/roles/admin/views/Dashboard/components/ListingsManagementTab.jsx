import React from "react";
import {
  Search,
  Filter,
  MoreVertical,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

function ListingsManagementTab() {
  // Mock listings data
  const listings = [
    {
      id: 1,
      title: "Vintage Camera",
      seller: "John Doe",
      price: 299,
      type: "fixed",
      status: "active",
      reports: 0,
    },
    {
      id: 2,
      title: "Gaming Laptop",
      seller: "Jane Smith",
      price: 1200,
      type: "auction",
      status: "active",
      reports: 0,
    },
    {
      id: 3,
      title: "Suspicious Item",
      seller: "Bob Johnson",
      price: 50,
      type: "fixed",
      status: "flagged",
      reports: 3,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-font-main">
          Listings Management
        </h2>
        <div className="flex items-center gap-4">
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={18} />
            Filter
          </button>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-font-secondary"
              size={18}
            />
            <input
              type="text"
              placeholder="Search listings..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">
                Listing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">
                Seller
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-font-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {listings.map((listing) => (
              <tr
                key={listing.id}
                className="hover:bg-surface transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-font-main">
                    {listing.title}
                  </div>
                  {listing.reports > 0 && (
                    <div className="flex items-center gap-1 text-xs text-error-500 mt-1">
                      <AlertCircle size={12} />
                      {listing.reports} report{listing.reports > 1 ? "s" : ""}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-font-secondary">
                  {listing.seller}
                </td>
                <td className="px-6 py-4 text-font-main font-semibold">
                  ${listing.price}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary-500 bg-opacity-20 text-amber-50">
                    {listing.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`flex items-center gap-1 text-sm ${
                      listing.status === "active"
                        ? "text-success-500"
                        : "text-error-500"
                    }`}
                  >
                    {listing.status === "active" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    {listing.status}
                  </span>
                </td>
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

export default ListingsManagementTab;
