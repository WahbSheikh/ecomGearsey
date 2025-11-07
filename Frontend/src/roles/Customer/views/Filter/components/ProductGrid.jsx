import React from 'react';
import { Clock, Tag, Eye, Heart, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ProductGrid({ products, loading, error }) {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-surface rounded-2xl p-4 border border-border">
              <div className="bg-surface-elevated h-48 rounded-xl mb-4"></div>
              <div className="space-y-2">
                <div className="bg-surface-elevated h-4 rounded w-3/4"></div>
                <div className="bg-surface-elevated h-3 rounded w-1/2"></div>
                <div className="bg-surface-elevated h-6 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-error-500 text-xl font-semibold mb-2">
          Error loading products
        </div>
        <p className="text-font-secondary">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-font-secondary text-xl font-semibold mb-2">
          No products found
        </div>
        <p className="text-font-secondary">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <p className="text-font-secondary">
          Showing {products.length} products
        </p>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            className="bg-surface rounded-2xl p-4 border border-border hover:border-primary-500 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            {/* Product Image */}
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <img
                src={product.imageUrl || product.imageId || "/api/placeholder/300/200"}
                alt={product.title || product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "/api/placeholder/300/200";
                }}
              />
              
              {/* Listing type badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  product.is_auction
                    ? 'bg-secondary-500 text-white'
                    : 'bg-success-500 text-white'
                }`}>
                  {product.is_auction ? (
                    <>
                      <Clock size={12} className="inline mr-1" />
                      Auction
                    </>
                  ) : (
                    <>
                      <Tag size={12} className="inline mr-1" />
                      Fixed Price
                    </>
                  )}
                </span>
              </div>

              {/* Condition badge */}
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-surface/90 text-font-main border border-border">
                  {product.condition}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              {/* Title */}
              <h3 className="font-semibold text-font-main group-hover:text-primary-500 transition-colors" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {product.title || product.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-font-secondary" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {product.description}
              </p>

              {/* Category */}
              {product.categoryId && (
                <div className="flex items-center gap-1 text-xs text-font-secondary">
                  <Package size={12} />
                  {product.categoryId.name || 'Uncategorized'}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-primary-500">
                  ${parseFloat(product.price).toFixed(2)}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-font-secondary">
                  <Eye size={14} />
                  <Heart size={14} className="hover:text-error-500 cursor-pointer transition-colors" />
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-1 rounded-full font-semibold ${
                  product.status === 'Active'
                    ? 'bg-success-500/20 text-success-500'
                    : 'bg-font-secondary/20 text-font-secondary'
                }`}>
                  {product.status}
                </span>
                
                {product.is_auction && (
                  <span className="text-warning-500 font-semibold">
                    Ending Soon
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;