import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Car, Shield, Store, Users } from 'lucide-react';
import { useAppContext } from '../../../../config/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { authClient } from '../../../../lib/auth';
import { useAuth } from '../../../../hooks/useAuth';

function Auth() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const { refreshSession , user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user ]);

  const [selectedRole, setSelectedRole] = useState('customer');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  // Role configurations
  const roles = [
    {
      id: 'customer',
      name: 'Customer',
      icon: Users,
      description: 'Browse and buy car parts'
    },
    {
      id: 'seller',
      name: 'Seller',
      icon: Store,
      description: 'Sell your car parts'
    },
    {
      id: 'admin',
      name: 'Admin',
      icon: Shield,
      description: 'Manage the platform'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Sign up specific validations
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      }
      if (!formData.address) {
        newErrors.address = 'Address is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login with Better Auth
        const result = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });

        console.log('Login result:', result); // Debug log

        if (result.error) {
          throw new Error(result.error.message || 'Login failed');
        }

        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'success',
            message: `Welcome back! Logged in successfully.`
          }
        });

        // Refresh session after successful login
        await refreshSession();
      } else {
        // Signup with Better Auth
        const result = await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          // Additional fields that match your Better Auth schema
          role: selectedRole,
          phone: formData.phone,
          address: formData.address,
        });

        console.log('Signup result:', result); // Debug log

        if (result.error) {
          throw new Error(result.error.message || 'Signup failed');
        }

        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'success',
            message: `Account created successfully! Welcome to Gearsey as a ${selectedRole}.`
          }
        });

        // Refresh session after successful signup
        await refreshSession();
      }

      // Navigate to homepage
      navigate('/');
      
    } catch (error) {
      console.error('Auth error:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'error',
          message: error.message || (isLogin ? 'Login failed. Please try again.' : 'Signup failed. Please try again.')
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      address: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-gray-400">
            {isLogin 
              ? 'Sign in to your Gearsey account' 
              : 'Join the ultimate car parts marketplace'
            }
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            {isLogin ? 'Login as' : 'Join as'}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedRole === role.id
                      ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <IconComponent className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-xs font-medium">{role.name}</div>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            {roles.find(role => role.id === selectedRole)?.description}
          </p>
        </div>

        {/* Authentication Type Toggle */}
        <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              resetForm();
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              isLogin
                ? 'bg-orange-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              resetForm();
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              !isLogin
                ? 'bg-orange-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
            <div className="space-y-4">
              {/* Sign Up Fields */}
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2 bg-gray-700 border ${
                          errors.name ? 'border-red-500' : 'border-gray-600'
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-gray-700 border ${
                        errors.phone ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-gray-700 border ${
                        errors.address ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500`}
                      placeholder="123 Main St, City, State"
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                </>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 bg-gray-700 border ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-2 bg-gray-700 border ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 bg-gray-700 border ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password (Login Only) */}
            {isLogin && (
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 bg-gray-700 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-orange-400 hover:text-orange-300"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                <>
                  {isLogin ? `Sign In as ${roles.find(r => r.id === selectedRole)?.name}` : `Create ${roles.find(r => r.id === selectedRole)?.name} Account`}
                </>
              )}
            </button>
          </div>
        </form>

        {/* Role Description */}
        <div className="text-center bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Signing in' : 'Creating account'} as a <span className="text-orange-400 font-medium">{roles.find(r => r.id === selectedRole)?.name}</span>
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {roles.find(r => r.id === selectedRole)?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;