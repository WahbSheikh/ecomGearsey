import React, { useState, useEffect } from "react";
import { Upload, DollarSign } from "lucide-react";
import { useAppContext } from "../../../../config/context/AppContext";
import { productListingAPI } from "../../../../apis/productListing";

function SellItem() {
  const { dispatch, state } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "Used",
    category: "",
    price: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productListingAPI.getCategories();
        setCategories(response.categories || []);
        
        // Set default category if categories are available
        if (response.categories && response.categories.length > 0) {
          setFormData(prev => ({
            ...prev,
            category: response.categories[0].name
          }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            type: "error",
            message: "Failed to load categories. Please refresh the page.",
          },
        });
        // Fallback categories if API fails
        setCategories([
          { name: "engines", description: "Car Engines" },
          { name: "body", description: "Body Parts" },
          { name: "wheels", description: "Wheels & Tires" },
          { name: "accessories", description: "Accessories" }
        ]);
        setFormData(prev => ({ ...prev, category: "engines" }));
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
        
        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!state.user?.id) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "You must be logged in to create a listing.",
        },
      });
      return;
    }

    if (!formData.image) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Please select an image for your product.",
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('sellerId', state.user.id);
      formDataToSend.append('is_auction', 'false');
      formDataToSend.append('condition', formData.condition);
      formDataToSend.append('image', formData.image);

      const response = await productListingAPI.createProductWithImage(formDataToSend);
      
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: "Your listing has been created successfully!",
        },
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        condition: "Used",
        category: categories.length > 0 ? categories[0].name : "engines",
        price: "",
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: `Failed to create listing: ${error.message}`,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-primary-500 drop-shadow mb-2 tracking-tight">
          List Your Car Part
        </h1>
        <p className="text-font-secondary text-lg">
          Create a listing to sell your car parts to thousands of buyers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Card with Gradient Border */}
        <div className="rounded-2xl p-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-tertiary-500 shadow-xl shadow-border/40">
          <div className="bg-surface rounded-[inherit] p-6 lg:p-8">
            {/* Section Heading */}
            <div className="flex items-center mb-4">
              <span className="inline-block w-2 h-8 bg-primary-500 rounded-r-xl mr-3" />
              <h2 className="text-2xl font-black text-secondary-500 drop-shadow-sm">
                Basic Information
              </h2>
            </div>
            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., 1968 Mustang Carburetor"
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main placeholder:text-font-secondary focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all"
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
                  rows={4}
                  placeholder="Provide a detailed description including compatibility, condition, and more..."
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main placeholder:text-font-secondary resize-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/70 transition-all"
                    required
                    disabled={loadingCategories}
                  >
                    {loadingCategories ? (
                      <option value="">Loading categories...</option>
                    ) : categories.length > 0 ? (
                      categories.map((cat) => (
                        <option key={cat._id || cat.name} value={cat.name}>
                          {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="engines">Engines</option>
                        <option value="body">Body</option>
                        <option value="wheels">Wheels</option>
                        <option value="accessories">Accessories</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all max-w-[300px]"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="rounded-2xl p-1 bg-gradient-to-r from-tertiary-500 via-primary-500 to-secondary-500 shadow-xl shadow-border/40">
          <div className="bg-surface rounded-[inherit] p-6 lg:p-8">
            <div className="flex items-center mb-4">
              <span className="inline-block w-2 h-8 bg-tertiary-500 rounded-r-xl mr-3" />
              <h2 className="text-2xl font-black text-tertiary-500 drop-shadow-sm">
                Product Photo *
              </h2>
            </div>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-6">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full max-w-md h-64 object-cover rounded-lg border-2 border-tertiary-500 mx-auto"
                />
              </div>
            )}
            
            {/* File Input */}
            <div className="w-full">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
                id="image-upload"
                required
              />
              <label
                htmlFor="image-upload"
                className="w-full border-2 border-dashed border-tertiary-500 bg-surface-elevated/60 rounded-xl p-8 flex flex-col items-center justify-center transition-all hover:border-primary-500 group backdrop-blur cursor-pointer"
              >
                <Upload
                  size={42}
                  className="mb-2 animate-bounce text-tertiary-500 group-hover:text-primary-500"
                />
                <p className="text-font-main font-semibold mb-1">
                  {formData.image ? formData.image.name : "Click to upload a photo"}
                </p>
                <p className="text-sm text-font-secondary">
                  Supports JPG, PNG, WebP (Max 5MB)
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-4 rounded-xl bg-gradient-to-r from-primary-500 via-secondary-500 to-tertiary-500 text-bg font-bold text-xl shadow-lg hover:from-secondary-500 hover:to-primary-500 transition-transform duration-150 hover:scale-105 focus:ring-4 focus:ring-secondary-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Creating Listing..." : "Create Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SellItem;
