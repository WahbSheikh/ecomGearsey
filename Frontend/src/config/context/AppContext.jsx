import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import modeldata from "./modeldata";

const AppContext = createContext();

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      console.log("🔵 AppContext Reducer - SET_USER:", action.payload);
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      console.log("🔴 AppContext Reducer - LOGOUT");
      // Clear localStorage on logout
      localStorage.removeItem("cart");
      return {
        ...state,
        user: null,
        cart: [],
        userBids: [],
        userListings: [],
        userOrders: [],
      };

    case "ADD_TO_CART":
      if (state.cart.some((item) => item.id === action.payload.id)) {
        return state;
      }
      const newCart = [...state.cart, action.payload];
      // Persist cart to localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return {
        ...state,
        cart: filteredCart,
      };

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
      };

    case "UPDATE_CART_ITEM":
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.productId
          ? {
              ...item,
              deliveryOption: action.payload.deliveryOption,
              deliveryFee: action.payload.deliveryFee,
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };

    case "LOAD_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "ADD_ORDER":
      return {
        ...state,
        userOrders: [action.payload, ...(state.userOrders || [])],
      };

    case "SET_USER_ORDERS":
      return {
        ...state,
        userOrders: action.payload,
      };

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        userOrders: (state.userOrders || []).map((order) =>
          order._id === action.payload.orderId
            ? { ...order, ...action.payload.updates }
            : order
        ),
      };

    case "PLACE_BID":
      const product = state.products?.find(
        (p) => p.id === action.payload.productId
      );

      return {
        ...state,
        products:
          state.products?.map((product) =>
            product.id === action.payload.productId
              ? {
                  ...product,
                  currentBid: action.payload.amount,
                  bids: [
                    {
                      bidder: state.user?.name || "You",
                      amount: action.payload.amount,
                      time: new Date().toISOString(),
                    },
                    ...(product.bids || []),
                  ],
                }
              : product
          ) || state.products,
        userBids: [
          ...state.userBids,
          {
            id: action.payload.productId,
            productTitle: product?.title,
            currentBid: action.payload.amount,
            status: "leading",
            timeLeft: product?.timeLeft,
            timestamp: new Date().toISOString(),
          },
        ],
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
            id: Date.now(),
            timestamp: new Date().toISOString(),
          },
        ],
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.id !== action.payload
        ),
      };

    case "CLEAR_ALL_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case "RESET_FILTERS":
      return {
        ...state,
        filters: modeldata().filters || {},
      };

    case "SET_USER_LISTINGS":
      return {
        ...state,
        userListings: action.payload,
      };

    case "SET_USER_BIDS":
      return {
        ...state,
        userBids: action.payload,
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products:
          state.products?.map((product) =>
            product.id === action.payload.id
              ? { ...product, ...action.payload.updates }
              : product
          ) || state.products,
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const initialState = {
    ...modeldata(),
    user: null,
    userOrders: [],
  };

  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user, isPending } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Sync Better Auth user with AppContext
  useEffect(() => {
    console.log("🟡 AppContext useEffect triggered");
    console.log("  - isPending:", isPending);
    console.log("  - Better Auth user:", user);
    console.log("  - Current state.user:", state.user);

    if (!isPending) {
      if (user) {
        const hasUserChanged =
          !state.user ||
          state.user.id !== user.id ||
          state.user.role !== user.role ||
          state.user.name !== user.name ||
          state.user.email !== user.email;

        if (hasUserChanged) {
          console.log("✅ User is logged in, updating AppContext");
          console.log("  - User ID:", user.id);
          console.log("  - User Name:", user.name);
          console.log("  - User Role:", user.role);

          dispatch({
            type: "SET_USER",
            payload: {
              id: user.id,
              name: user.name || "User",
              email: user.email,
              role: user.role || "customer",
              phone: user.phone || null,
              address: user.address || null,
              rating: user.rating || 0,
              total_reviews: user.total_reviews || 0,
              isLoggedIn: true,
              avatar: user.image || null,
            },
          });
        }
      } else if (state.user) {
        console.log("❌ No user found, logging out");
        dispatch({ type: "LOGOUT" });
      }
    }
  }, [user, isPending]);

  // Debug: Log state changes (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("📊 AppContext state changed:", {
        user: state.user,
        role: state.user?.role,
        cartItems: state.cart?.length,
        userBids: state.userBids?.length,
        userListings: state.userListings?.length,
        userOrders: state.userOrders?.length,
      });
    }
  }, [
    state.user,
    state.cart,
    state.userBids,
    state.userListings,
    state.userOrders,
  ]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
