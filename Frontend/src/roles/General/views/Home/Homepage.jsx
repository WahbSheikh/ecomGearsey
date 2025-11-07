import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import Newsletter from "../../components/NewsLetter/Newsletter";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import { useAppContext } from "../../../../config/context/AppContext";
import { productListingAPI } from "../../../../apis/productListing";

function Homepage() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productListingAPI.getProducts({ limit: 8 });
        const products = response.products || [];

        // Transform API products to match component expectations
        const transformedProducts = products.map((product) => ({
          id: product._id,
          title: product.title || product.name,
          description: product.description,
          price: product.price,
          image: product.imageUrl || product.imageId,
          category: product.categoryId?.name || "Unknown",
          type: product.is_auction ? "auction" : "fixed",
          condition: product.condition,
          seller: "Seller", // You may want to populate seller info
          timeLeft: product.is_auction ? { hours: 2, minutes: 30 } : null, // Mock time for Auctions
        }));

        setFeaturedProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            type: "error",
            message: "Failed to load products. Showing sample data.",
          },
        });
        // Fallback to dummy data if API fails
        setFeaturedProducts(state.products?.slice(0, 8) || []);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch, state.products]);

  // Filter products for different sections - now using real data
  const fixedPriceProducts = featuredProducts.filter(
    (product) => product.type === "fixed"
  );
  const auctionProducts = featuredProducts.filter(
    (product) => product.type === "auction"
  );

  // Categories data
  const categories = [
    {
      id: "engines",
      name: "Engines & Parts",
      icon: "🔧",
      description: "Complete engines, carburetors, filters",
      image:
        "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      id: "body",
      name: "Body & Exterior",
      icon: "🚗",
      description: "Bumpers, fenders, trim pieces",
      image:
        "https://images.pexels.com/photos/3807276/pexels-photo-3807276.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      id: "interior",
      name: "Interior & Upholstery",
      icon: "🪑",
      description: "Seats, dashboards, door panels",
      image:
        "https://images.pexels.com/photos/3807275/pexels-photo-3807275.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      id: "wheels",
      name: "Wheels & Tires",
      icon: "⚙️",
      description: "Vintage wheels, classic tires",
      image:
        "https://images.pexels.com/photos/3807278/pexels-photo-3807278.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      id: "electrical",
      name: "Electrical Systems",
      icon: "⚡",
      description: "Wiring, lights, instruments",
      image:
        "https://images.pexels.com/photos/3807279/pexels-photo-3807279.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      id: "accessories",
      name: "Accessories",
      icon: "✨",
      description: "Chrome parts, badges, emblems",
      image:
        "https://images.pexels.com/photos/3807280/pexels-photo-3807280.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ];

  const handleCategoryClick = (categoryId) => {
    // Set the category filter and navigate to filters page
    dispatch({
      type: "SET_FILTERS",
      payload: { category: categoryId },
    });
    navigate("/filter");
  };

  return (
    <div className="min-h-screen bg-bg">
      <Hero />

      {/* Featured Products Section */}
      <div
        id="marketplace"
        className="relative bg-gradient-to-b from-surface/30 to-bg scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-font-main mb-2">
                Featured Items
              </h2>
              <p className="text-font-secondary">
                Latest car parts and components
              </p>
            </div>
            <button onClick={() => navigate("/filter")} className="btn-primary">
              View All
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-lg p-6 animate-pulse"
                >
                  <div className="bg-border rounded-lg h-48 mb-4"></div>
                  <div className="bg-border h-4 rounded mb-2"></div>
                  <div className="bg-border h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : fixedPriceProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {fixedPriceProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-font-main mb-2">
                No Products Available
              </h3>
              <p className="text-font-secondary">
                Be the first to list a product!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Auctions Section */}
      <div
        id="Auctions"
        className="relative bg-gradient-to-b from-bg to-surface/30 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-font-main mb-2">
                Auctions
              </h2>
              <p className="text-font-secondary">
                Newest car parts added to our marketplace
              </p>
            </div>
            <button
              onClick={() => navigate("/filter")}
              className="btn-secondary"
            >
              Browse All
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-lg p-6 animate-pulse"
                >
                  <div className="bg-border rounded-lg h-48 mb-4"></div>
                  <div className="bg-border h-4 rounded mb-2"></div>
                  <div className="bg-border h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 4 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.slice(4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-font-main mb-2">
                More Products Coming Soon
              </h3>
              <p className="text-font-secondary">
                Check back later for more listings!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div
        id="categories"
        className="relative bg-gradient-to-b from-surface/30 to-bg scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-font-main mb-2">
              Shop by Category
            </h2>
            <p className="text-font-secondary">
              Browse parts by vehicle system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group cursor-pointer bg-surface border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="text-lg font-bold">{category.name}</h3>
                    </div>
                    <p className="text-sm text-gray-200">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors group-hover:bg-primary-600">
                    Browse {category.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section - Added ID */}
      <div id="why-choose-us" className="scroll-mt-20">
        <WhyChooseUs />
      </div>

      {/* Newsletter Section - Added ID */}
      <div id="newsletter" className="scroll-mt-20">
        <Newsletter />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;
