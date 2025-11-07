const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const productListingAPI = {
  // Get all products with optional filters
  async getProducts(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.limit) queryParams.append('limit', filters.limit);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.sellerId) queryParams.append('sellerId', filters.sellerId);
      if (filters.query) queryParams.append('query', filters.query);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.isAuction !== undefined) queryParams.append('isAuction', filters.isAuction);

      const url = `${API_BASE_URL}/api/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      console.log('🌐 API Call URL:', url);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📦 API Response:', data);
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get all categories
  async getCategories(limit = 50) {
    try {
      const url = `${API_BASE_URL}/api/category${limit ? `?limit=${limit}` : ''}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Create a new product with image upload
  async createProductWithImage(formData) {
    console.log("Creating product with image, formData:", formData);
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        // Don't set Content-Type header, let browser set it with boundary for FormData
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating product with image:", error);
      throw error;
    }
  },

  // Create a new product (legacy - for backward compatibility)
  async createProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Update an existing product
  async updateProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  // Delete a product
  async deleteProduct(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  // Get products by seller ID
  async getSellerProducts(sellerId, limit = 25) {
    return this.getProducts({ sellerId, limit });
  },

  // Search products by query
  async searchProducts(query, limit = 25) {
    return this.getProducts({ query, limit });
  },

  // Get products by category
  async getProductsByCategory(category, limit = 25) {
    return this.getProducts({ category, limit });
  },

  // Create default categories (for testing/initialization)
  async createDefaultCategories() {
    const defaultCategories = [
      { name: "engines", description: "Car engines and motor components" },
      { name: "body", description: "Body parts and exterior components" },
      { name: "wheels", description: "Wheels, tires, and related parts" },
      { name: "accessories", description: "Car accessories and add-ons" },
      { name: "transmission", description: "Transmission and drivetrain parts" },
      { name: "suspension", description: "Suspension and steering components" }
    ];

    try {
      const results = [];
      for (const category of defaultCategories) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/category`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
          });
          
          if (response.ok) {
            const data = await response.json();
            results.push(data);
          }
        } catch (error) {
          console.log(`Category ${category.name} might already exist or creation failed:`, error.message);
        }
      }
      return { message: "Default categories created", results };
    } catch (error) {
      console.error("Error creating default categories:", error);
      throw error;
    }
  }
};

export default productListingAPI;
