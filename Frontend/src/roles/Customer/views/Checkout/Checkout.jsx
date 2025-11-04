import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, CheckCircle } from "lucide-react";
import { useAppContext } from "../../../../config/context/AppContext";

const Checkout = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
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

  const handlePlaceOrder = () => {
    // Clear cart and redirect
    dispatch({ type: "CLEAR_CART" });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { type: "success", message: "Order placed successfully!" },
    });
    navigate("/dashboard/user");
  };

  if (state.cart.length === 0 && step < 3) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <button
        onClick={() => (step === 1 ? navigate("/cart") : setStep(step - 1))}
        className="flex items-center gap-2 text-font-secondary hover:text-primary-500 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        {step === 1 ? "Back to Cart" : "Previous Step"}
      </button>

      <h1 className="text-3xl font-bold text-font-main mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 ${
              step >= 1 ? "text-primary-500" : "text-font-secondary"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? "bg-primary-500 text-white" : "bg-surface-elevated"
              }`}
            >
              {step > 1 ? "✓" : "1"}
            </div>
            <span className="font-semibold">Shipping</span>
          </div>
          <div className="w-16 h-0.5 bg-border"></div>
          <div
            className={`flex items-center gap-2 ${
              step >= 2 ? "text-primary-500" : "text-font-secondary"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? "bg-primary-500 text-white" : "bg-surface-elevated"
              }`}
            >
              {step > 2 ? "✓" : "2"}
            </div>
            <span className="font-semibold">Payment</span>
          </div>
          <div className="w-16 h-0.5 bg-border"></div>
          <div
            className={`flex items-center gap-2 ${
              step >= 3 ? "text-primary-500" : "text-font-secondary"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? "bg-primary-500 text-white" : "bg-surface-elevated"
              }`}
            >
              3
            </div>
            <span className="font-semibold">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Truck className="text-primary-500" size={24} />
                <h2 className="text-xl font-semibold text-font-main">
                  Shipping Information
                </h2>
              </div>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-font-secondary mb-2">
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
                    <label className="block text-sm font-semibold text-font-secondary mb-2">
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
                  <label className="block text-sm font-semibold text-font-secondary mb-2">
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
                  <label className="block text-sm font-semibold text-font-secondary mb-2">
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
                    <label className="block text-sm font-semibold text-font-secondary mb-2">
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
                    <label className="block text-sm font-semibold text-font-secondary mb-2">
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
                    <label className="block text-sm font-semibold text-font-secondary mb-2">
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
                <button type="submit" className="btn-primary w-full">
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="text-primary-500" size={24} />
                <h2 className="text-xl font-semibold text-font-main">
                  Payment Information
                </h2>
              </div>
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-font-secondary mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        cardNumber: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-font-secondary mb-2">
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
                    <label className="block text-sm font-semibold text-font-secondary mb-2">
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
                    <label className="block text-sm font-semibold text-font-secondary mb-2">
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
                <button type="submit" className="btn-primary w-full">
                  Review Order
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Review & Place Order */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle className="text-primary-500" size={24} />
                  <h2 className="text-xl font-semibold text-font-main">
                    Review Your Order
                  </h2>
                </div>

                {/* Shipping Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-font-main mb-3">
                    Shipping Information
                  </h3>
                  <div className="bg-surface-elevated p-4 rounded-lg">
                    <p className="text-font-main font-semibold">
                      {shippingInfo.fullName}
                    </p>
                    <p className="text-font-secondary">
                      {shippingInfo.address}
                    </p>
                    <p className="text-font-secondary">
                      {shippingInfo.city}, {shippingInfo.state}{" "}
                      {shippingInfo.zipCode}
                    </p>
                    <p className="text-font-secondary mt-2">
                      {shippingInfo.email}
                    </p>
                    <p className="text-font-secondary">{shippingInfo.phone}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-font-main mb-3">
                    Payment Method
                  </h3>
                  <div className="bg-surface-elevated p-4 rounded-lg">
                    <p className="text-font-main">
                      Card ending in {paymentInfo.cardNumber.slice(-4)}
                    </p>
                    <p className="text-font-secondary">
                      {paymentInfo.cardName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="btn-primary w-full"
                >
                  Place Order - ${total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-font-main mb-4">
              Order Summary
            </h3>
            <div className="space-y-4 mb-6">
              {state.cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={
                      Array.isArray(item.images) ? item.images[0] : item.image
                    }
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-font-main text-sm">
                      {item.title}
                    </p>
                    <p className="text-font-secondary text-xs">
                      ${(item.price + (item.deliveryFee || 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-font-secondary">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-font-secondary">
                <span>Shipping</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-font-main pt-2 border-t border-border">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
