import { useState, useEffect } from 'react';
import { productListingAPI } from '../../../../../apis/productListing.js';

export const useFilteredProducts = (filters) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productListingAPI.getCategories();
        setCategories(response.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch filtered products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const apiFilters = {
          limit: 100, // Get more products for filtering
        };

        // Add category filter
        if (filters.category && filters.category !== 'all') {
          apiFilters.category = filters.category;
        }

        // Add price range filters
        if (filters.priceMin !== null && filters.priceMin !== undefined) {
          apiFilters.minPrice = filters.priceMin;
        }
        if (filters.priceMax !== null && filters.priceMax !== undefined) {
          apiFilters.maxPrice = filters.priceMax;
        }

        // Add auction/fixed filter
        if (filters.show && filters.show !== 'all') {
          if (filters.show === 'fixed') {
            apiFilters.isAuction = 'false';
          } else if (filters.show === 'auctions') {
            apiFilters.isAuction = 'true';
          }
        }



        // Fetch products from API
        const response = await productListingAPI.getProducts(apiFilters);
        let fetchedProducts = response.products || [];
        

        // Apply client-side sorting
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'price-low':
              fetchedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
              break;
            case 'price-high':
              fetchedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
              break;
            case 'latest':
            default:
              // Products are already sorted by creation date from API
              break;
          }
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return { products, loading, error, categories };
};

export default useFilteredProducts;