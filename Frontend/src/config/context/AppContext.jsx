import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial State
const initialState = {
  user: null,
  products: [],
  cart: [],
  filters: {
    category: "all",
    priceRange: [0, 10000],
    condition: "all",
    show: "all", // 'all', 'fixed', 'auctions'
  },
  notifications: [],
  userBids: [],
  userOrders: [],
  userListings: [],
  isLoading: false,
  error: null,
};

// Create Context
const AppContext = createContext();

// Reducer Function
const appReducer = (state, action) => {
  switch (action.type) {
    // User Actions
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
        cart: [],
        userBids: [],
        userOrders: [],
        userListings: [],
      };

    case "UPDATE_USER_PROFILE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    // Products Actions
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    // Cart Actions
    case "ADD_TO_CART":
      // Check if item already exists in cart
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    // Filter Actions
    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.value,
        },
      };

    case "RESET_FILTERS":
      return {
        ...state,
        filters: {
          category: "all",
          priceRange: [0, 10000],
          condition: "all",
          show: "all",
        },
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    // Notification Actions
    case "ADD_NOTIFICATION":
      const newNotification = {
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      return {
        ...state,
        notifications: [...state.notifications, newNotification],
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };

    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
      };

    // Bid Actions
    case "PLACE_BID":
      return {
        ...state,
        userBids: [
          ...state.userBids,
          {
            id: Date.now(),
            productId: action.payload.productId,
            amount: action.payload.amount,
            timestamp: new Date().toISOString(),
            status: "leading",
          },
        ],
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? { ...product, currentBid: action.payload.amount }
            : product
        ),
      };

    case "UPDATE_BID_STATUS":
      return {
        ...state,
        userBids: state.userBids.map((bid) =>
          bid.id === action.payload.bidId
            ? { ...bid, status: action.payload.status }
            : bid
        ),
      };

    case "REMOVE_BID":
      return {
        ...state,
        userBids: state.userBids.filter((bid) => bid.id !== action.payload),
      };

    // Order Actions
    case "ADD_ORDER":
      return {
        ...state,
        userOrders: [...state.userOrders, action.payload],
      };

    case "UPDATE_ORDER":
      return {
        ...state,
        userOrders: state.userOrders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case "CANCEL_ORDER":
      return {
        ...state,
        userOrders: state.userOrders.map((order) =>
          order.id === action.payload
            ? {
                ...order,
                status: "cancelled",
                payment_status: "Refunded",
                delivery_status: "Cancelled",
              }
            : order
        ),
      };

    case "DELETE_ORDER":
      return {
        ...state,
        userOrders: state.userOrders.filter(
          (order) => order.id !== action.payload
        ),
      };

    // Listing Actions (for sellers)
    case "ADD_LISTING":
      return {
        ...state,
        userListings: [...state.userListings, action.payload],
      };

    case "UPDATE_LISTING":
      return {
        ...state,
        userListings: state.userListings.map((listing) =>
          listing.id === action.payload.id ? action.payload : listing
        ),
      };

    case "DELETE_LISTING":
      return {
        ...state,
        userListings: state.userListings.filter(
          (listing) => listing.id !== action.payload
        ),
      };

    case "SET_LISTING_STATUS":
      return {
        ...state,
        userListings: state.userListings.map((listing) =>
          listing.id === action.payload.id
            ? { ...listing, status: action.payload.status }
            : listing
        ),
      };

    // Loading and Error Actions
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    // Bulk Actions
    case "RESET_STATE":
      return initialState;

    case "HYDRATE_STATE":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedFilters = localStorage.getItem("filters");

    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        dispatch({ type: "HYDRATE_STATE", payload: { cart } });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }

    if (savedFilters) {
      try {
        const filters = JSON.parse(savedFilters);
        dispatch({ type: "HYDRATE_STATE", payload: { filters } });
      } catch (error) {
        console.error("Error loading filters from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(state.filters));
  }, [state.filters]);

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    if (state.notifications.length > 0) {
      const timer = setTimeout(() => {
        const oldestNotification = state.notifications[0];
        if (oldestNotification) {
          dispatch({
            type: "REMOVE_NOTIFICATION",
            payload: oldestNotification.id,
          });
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.notifications]);

  // Clear error after 10 seconds
  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_ERROR" });
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [state.error]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook to use App Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Export context for direct access if needed
export default AppContext;
