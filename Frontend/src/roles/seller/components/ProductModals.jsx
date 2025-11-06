import React from "react";
import { X, Edit, Trash2 } from "lucide-react";

const EditProductModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onSave, 
  loading = false 
}) => {
  const [formData, setFormData] = React.useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    condition: product?.condition || "Used"
  });

  React.useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        condition: product.condition || "Used"
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      productId: product.id,
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      condition: formData.condition,
      is_auction: false, // Keep as fixed price when updating
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center">
            <span className="inline-block w-2 h-8 bg-primary-500 rounded-r-xl mr-3" />
            <h2 className="text-xl font-bold text-font-main">Edit Product</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-font-secondary hover:text-font-main transition-colors rounded-full hover:bg-surface-elevated"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
              Product Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all"
              required
            />
          </div>

          <div>
            <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main resize-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all"
                required
              />
            </div>

            <div>
              <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                Condition *
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all"
                required
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-border rounded-lg text-font-secondary hover:text-font-main hover:border-font-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-bg font-bold rounded-lg hover:from-secondary-500 hover:to-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  product, 
  loading = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center">
            <span className="inline-block w-2 h-8 bg-red-500 rounded-r-xl mr-3" />
            <h2 className="text-xl font-bold text-font-main">Delete Product</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-font-secondary hover:text-font-main transition-colors rounded-full hover:bg-surface-elevated"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-font-secondary mb-4">
            Are you sure you want to delete <span className="font-semibold text-font-main">"{product?.title}"</span>? 
            This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-border rounded-lg text-font-secondary hover:text-font-main hover:border-font-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EditProductModal, DeleteConfirmModal };