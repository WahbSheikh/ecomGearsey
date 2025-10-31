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
      return {
        ...state,
        user: null,
        cart: [],
        userBids: [],
        userListings: [],
      };

    case "ADD_TO_CART":
      if (state.cart.some((item) => item.id === action.payload.id)) {
        return state; // already in cart
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "PLACE_BID":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? {
                ...product,
                currentBid: action.payload.amount,
                bids: [
                  {
                    bidder: "You",
                    amount: action.payload.amount,
                    time: "Just now",
                  },
                  ...product.bids,
                ],
              }
            : product
        ),
        userBids: [
          ...state.userBids,
          {
            id: action.payload.productId,
            productTitle: state.products.find(
              (p) => p.id === action.payload.productId
            )?.title,
            currentBid: action.payload.amount,
            status: "leading",
            timeLeft: state.products.find(
              (p) => p.id === action.payload.productId
            )?.timeLeft,
          },
        ],
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { ...action.payload, id: Date.now() },
        ],
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.id !== action.payload
        ),
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.productId) {
            return {
              ...item,
              deliveryOption: action.payload.deliveryOption,
              deliveryFee: action.payload.deliveryFee,
            };
          }
          return item;
        }),
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

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  // Initialize state with modeldata but ensure user is null
  const initialState = {
    ...modeldata(),
    user: null, // Override any user from modeldata
  };

  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user, isPending } = useAuth();

  // Sync Better Auth user with AppContext
  useEffect(() => {
    console.log("🟡 AppContext useEffect triggered");
    console.log("  - isPending:", isPending);
    console.log("  - Better Auth user:", user);
    console.log("  - Current state.user:", state.user);

    if (!isPending) {
      if (user) {
        console.log("✅ User is logged in, updating AppContext");
        console.log("  - User ID:", user.id);
        console.log("  - User Name:", user.name);
        console.log("  - User Role:", user.role);

        dispatch({
          type: "SET_USER",
          payload: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, // This should be "customer", "seller", or "admin"
            phone: user.phone,
            address: user.address,
            rating: user.rating || 0,
            total_reviews: user.total_reviews || 0,
            isLoggedIn: true,
          },
        });
      } else {
        console.log(". No user found, logging out");
        dispatch({ type: "LOGOUT" });
      }
    }
  }, [user, isPending]);

  // Debug: Log state changes
  useEffect(() => {
    console.log("📊 AppContext state changed:", {
      user: state.user,
      role: state.user?.role,
    });
  }, [state.user]);

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
