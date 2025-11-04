import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useAppContext } from "../../../../config/context/AppContext";

// Predefined delivery options with fees
const DELIVERY_OPTIONS = [
  { label: "Standard (3-5 days)", value: "standard", fee: 0 },
  { label: "Express (1-2 days)", value: "express", fee: 15 },
  { label: "Next-Day", value: "next-day", fee: 30 },
];

function Cart() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  // Update delivery option and fee per item in cart state
  const handleDeliveryOptionChange = (productId, value) => {
    const selectedOption = DELIVERY_OPTIONS.find(
      (option) => option.value === value
    );

    dispatch({
      type: "UPDATE_CART_ITEM",
      payload: {
        productId,
        deliveryOption: selectedOption.value,
        deliveryFee: selectedOption.fee,
      },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  };

  // Calculate item price including delivery fee
  const getItemPrice = (item) => {
    return item.price + (item.deliveryFee || 0);
  };

  // Calculate total price across all cart items including fees
  const total = state.cart.reduce((sum, item) => sum + getItemPrice(item), 0);

  // Navigate to checkout page
  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  if (state.cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center animate-fade-in">
          <ShoppingCart className="mx-auto text-border" size={64} />
          <h2 className="text-2xl font-bold text-font-main mt-4">
            Your cart is empty
          </h2>
          <p className="text-font-secondary mt-2 mb-6">
            Start shopping to add items to your cart
          </p>
          <Link to="/" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8 animate-slide-down">
        <Link
          to="/"
          className="flex items-center gap-2 text-font-secondary hover:text-primary-500 transition-colors"
        >
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold text-font-main">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {state.cart.map((item, index) => (
            <div
              key={item.id}
              className={`card p-6 animate-slide-up animate-delay-${Math.min(
                index * 100,
                900
              )}`}
            >
              <div className="flex gap-4 items-center">
                <img
                  src={
                    Array.isArray(item.images) && item.images.length > 0
                      ? item.images[0]
                      : item.image
                  }
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-font-main text-lg">
                    {item.title}
                  </h3>
                  <p className="text-font-secondary text-sm">
                    Condition: {item.condition}
                  </p>
                  <p className="text-font-secondary text-sm mb-3">
                    Seller: {item.seller}
                  </p>

                  <label className="block text-font-secondary text-sm mb-1 font-medium">
                    Select Delivery Option:
                  </label>
                  <select
                    value={item.deliveryOption || "standard"}
                    onChange={(e) =>
                      handleDeliveryOptionChange(item.id, e.target.value)
                    }
                    className="input-field max-w-xs"
                  >
                    {DELIVERY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                        {option.fee > 0 ? ` (+$${option.fee})` : " (Free)"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-right flex flex-col items-end gap-4">
                  <div>
                    <p className="text-sm text-font-secondary mb-1">Price:</p>
                    <p className="text-2xl font-bold text-primary-500">
                      ${getItemPrice(item).toFixed(2)}
                    </p>
                    {item.deliveryFee > 0 && (
                      <p className="text-xs text-font-secondary">
                        (incl. ${item.deliveryFee} delivery)
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-error-500 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-surface-elevated"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <Trash2 size={18} />
                    <span className="text-sm font-medium">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-8 animate-slide-up animate-delay-200">
            <h3 className="text-xl font-semibold text-font-main mb-6">
              Order Summary
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-font-secondary">
                  Items ({state.cart.length})
                </span>
                <span className="font-semibold text-font-main">
                  $
                  {state.cart
                    .reduce((sum, item) => sum + item.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-font-secondary">Delivery Fees</span>
                <span className="font-semibold text-font-main">
                  $
                  {state.cart
                    .reduce((sum, item) => sum + (item.deliveryFee || 0), 0)
                    .toFixed(2)}
                </span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-lg">
                <span className="font-bold text-font-main">Total</span>
                <span className="font-bold text-primary-500 text-xl">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            <button onClick={proceedToCheckout} className="btn-primary w-full">
              Proceed to Checkout
            </button>
            <p className="text-xs text-font-secondary mt-4 text-center">
              You can adjust delivery options per item above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
