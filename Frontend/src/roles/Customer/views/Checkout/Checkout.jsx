import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  CheckCircle,
  Package,
  Loader2,
} from "lucide-react";
import { useAppContext } from "../../../../config/context/AppContext";
import { orderService } from "../../../../services/orderService";

const Checkout = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: state.user?.name || "",
    email: state.user?.email || "",
    phone: state.user?.phone || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const total = state.cart.reduce(
    (sum, item) => sum + (item.price + (item.deliveryFee || 0)),
    0
  );

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      // Prepare order items for backend - backend expects partId, quantity, price
      const orderItems = state.cart.map((item) => ({
        partId: String(item.id), // Backend expects string partId
        quantity: item.quantity || 1,
        price: item.price + (item.deliveryFee || 0), // Include delivery fee in item price
      }));

      // Create order via backend API
      const orderData = {
        userId: state.user.id,
        total_amount: total,
        items: orderItems,
      };

      console.log(
        "📦 Creating order with data:",
        JSON.stringify(orderData, null, 2)
      );
      console.log("📦 User ID:", state.user.id);
      console.log("📦 Cart items:", state.cart);

      const response = await orderService.createOrder(orderData);
      console.log("✅ Order created successfully:", response);

      // Store order details locally
      const newOrder = {
        _id: response.order.insertedId,
        userId: state.user.id,
        total_amount: total,
        payment_status: "Pending",
        delivery_status: "Pending",
        items: state.cart,
        shippingInfo,
        paymentInfo: {
          cardLast4: paymentInfo.cardNumber.slice(-4),
          cardName: paymentInfo.cardName,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add order to user's orders in context
      dispatch({ type: "ADD_ORDER", payload: newOrder });

      // Clear cart
      dispatch({ type: "CLEAR_CART" });

      // Show success notification
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: `Order placed successfully! Redirecting...`,
        },
      });

      // Set success state and stop loading
      setOrderSuccess(true);
      setLoading(false);

      // Redirect to user dashboard
      setTimeout(() => {
        navigate("/dashboard/user", {
          state: { newOrderId: response.order.insertedId },
        });
      }, 1500);
    } catch (err) {
      console.error("❌ Error creating order:", err);
      console.error("❌ Error details:", err.message);

      const errorMessage =
        err.message || "Failed to place order. Please try again.";
      setError(errorMessage);

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: errorMessage,
        },
      });

      // IMPORTANT: Reset loading state on error
      setLoading(false);
    }
  };

  // Redirect if cart is empty
  if (state.cart.length === 0 && !loading && !orderSuccess) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <button
        onClick={() => (step === 1 ? navigate("/cart") : setStep(step - 1))}
        className="flex items-center gap-2 text-font-secondary hover:text-primary-500 mb-6 transition-colors animate-slide-down"
        disabled={loading || orderSuccess}
      >
        <ArrowLeft size={20} />
        {step === 1 ? "Back to Cart" : "Previous Step"}
      </button>

      <h1 className="text-3xl font-bold text-font-main mb-8 animate-slide-down animate-delay-100">
        Checkout
      </h1>

      {/* Error Alert */}
      {error && (
        <div className="bg-error-500 bg-opacity-10 border border-error-500 text-error-500 px-4 py-3 rounded-lg mb-6 animate-fade-in">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12 animate-fade-in">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 transition-all duration-300 ${
              step >= 1 ? "text-primary-500" : "text-font-secondary"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step >= 1
                  ? "bg-primary-500 text-white"
                  : "bg-surface-elevated text-font-secondary"
              }`}
            >
              {step > 1 ? "✓" : "1"}
            </div>
            <span className="font-semibold hidden sm:inline">Shipping</span>
          </div>
          <div
            className={`w-16 h-0.5 transition-colors duration-300 ${
              step >= 2 ? "bg-primary-500" : "bg-border"
            }`}
          ></div>
          <div
            className={`flex items-center gap-2 transition-all duration-300 ${
              step >= 2 ? "text-primary-500" : "text-font-secondary"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step >= 2
                  ? "bg-primary-500 text-white"
                  : "bg-surface-elevated text-font-secondary"
              }`}
            >
              {step > 2 ? "✓" : "2"}
            </div>
            <span className="font-semibold hidden sm:inline">Payment</span>
          </div>
          <div
            className={`w-16 h-0.5 transition-colors duration-300 ${
              step >= 3 ? "bg-primary-500" : "bg-border"
            }`}
          ></div>
          <div
            className={`flex items-center gap-2 transition-all duration-300 ${
              step >= 3 ? "text-primary-500" : "text-font-secondary"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step >= 3
                  ? "bg-primary-500 text-white"
                  : "bg-surface-elevated text-font-secondary"
              }`}
            >
              3
            </div>
            <span className="font-semibold hidden sm:inline">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="card p-6 animate-slide-up">
              <div className="flex items-center gap-2 mb-6">
                <Truck className="text-primary-500" size={24} />
                <h2 className="text-xl font-semibold text-font-main">
                  Shipping Information
                </h2>
              </div>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-font-main mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.fullName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          fullName: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-font-main mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          email: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-font-main mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        phone: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-font-main mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        address: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-font-main mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          city: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="Los Angeles"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-font-main mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.state}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          state: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="CA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-font-main mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          zipCode: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="90001"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full mt-6">
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <div className="card p-6 animate-slide-up">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="text-primary-500" size={24} />
                <h2 className="text-xl font-semibold text-font-main">
                  Payment Information
                </h2>
              </div>
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-font-main mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        cardNumber: e.target.value.replace(/\s/g, ""),
                      })
                    }
                    className="input-field"
                    placeholder="1234 5678 9012 3456"
                    maxLength="16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-font-main mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.cardName}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        cardName: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-font-main mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.expiryDate}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          expiryDate: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-font-main mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.cvv}
                      onChange={(e) =>
                        setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                      }
                      className="input-field"
                      placeholder="123"
                      maxLength="4"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full mt-6">
                  Review Order
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Review & Place Order */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="card p-6 animate-scale-in">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle className="text-success-500" size={24} />
                  <h2 className="text-xl font-semibold text-font-main">
                    Review Your Order
                  </h2>
                </div>

                {/* Shipping Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-font-main mb-3 flex items-center gap-2">
                    <Truck size={18} className="text-primary-500" />
                    Shipping Information
                  </h3>
                  <div className="bg-surface-elevated p-4 rounded-lg border border-border">
                    <p className="text-font-main font-semibold">
                      {shippingInfo.fullName}
                    </p>
                    <p className="text-font-secondary text-sm mt-1">
                      {shippingInfo.address}
                    </p>
                    <p className="text-font-secondary text-sm">
                      {shippingInfo.city}, {shippingInfo.state}{" "}
                      {shippingInfo.zipCode}
                    </p>
                    <p className="text-font-secondary text-sm mt-2">
                      {shippingInfo.email}
                    </p>
                    <p className="text-font-secondary text-sm">
                      {shippingInfo.phone}
                    </p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-font-main mb-3 flex items-center gap-2">
                    <CreditCard size={18} className="text-primary-500" />
                    Payment Method
                  </h3>
                  <div className="bg-surface-elevated p-4 rounded-lg border border-border">
                    <p className="text-font-main font-medium">
                      •••• •••• •••• {paymentInfo.cardNumber.slice(-4)}
                    </p>
                    <p className="text-font-secondary text-sm mt-1">
                      {paymentInfo.cardName}
                    </p>
                    <p className="text-font-secondary text-sm">
                      Expires: {paymentInfo.expiryDate}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-semibold text-font-main mb-3 flex items-center gap-2">
                    <Package size={18} className="text-primary-500" />
                    Order Items ({state.cart.length})
                  </h3>
                  <div className="bg-surface-elevated p-4 rounded-lg border border-border space-y-3">
                    {state.cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-font-main text-sm">
                          {item.title}
                        </span>
                        <span className="text-font-secondary text-sm font-medium">
                          ${(item.price + (item.deliveryFee || 0)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || orderSuccess}
                  className={`w-full text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
                    orderSuccess
                      ? "bg-success-500 hover:bg-success-600 text-white font-semibold py-3 px-6 rounded-lg"
                      : "btn-primary"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processing Order...
                    </>
                  ) : orderSuccess ? (
                    <>
                      <CheckCircle size={20} />
                      Order Placed! Redirecting...
                    </>
                  ) : (
                    <>Place Order - ${total.toFixed(2)}</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-8 animate-slide-up animate-delay-200">
            <h3 className="text-lg font-semibold text-font-main mb-4">
              Order Summary
            </h3>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {state.cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={
                      Array.isArray(item.images) && item.images.length > 0
                        ? item.images[0]
                        : item.image
                    }
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded border border-border"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-font-main text-sm line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-font-secondary text-xs">
                      ${item.price.toFixed(2)}
                      {item.deliveryFee > 0 &&
                        ` + $${item.deliveryFee} delivery`}
                    </p>
                    <p className="text-primary-500 text-sm font-bold">
                      ${(item.price + (item.deliveryFee || 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-font-secondary text-sm">
                <span>Subtotal ({state.cart.length} items)</span>
                <span>
                  $
                  {state.cart
                    .reduce((sum, item) => sum + item.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-font-secondary text-sm">
                <span>Delivery Fees</span>
                <span>
                  $
                  {state.cart
                    .reduce((sum, item) => sum + (item.deliveryFee || 0), 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-font-main pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary-500">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
