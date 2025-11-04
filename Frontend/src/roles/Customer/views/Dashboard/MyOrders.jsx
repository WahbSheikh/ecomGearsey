import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { useUserOrders } from '../../hooks/useUserOrders';
import OrderList from '../../components/OrderList';

const MyOrders = () => {
    const { orders, loading } = useUserOrders();
    const [filter, setFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const getFilteredOrders = () => {
        let filtered = orders;
        
        if (filter !== 'all') {
            filtered = filtered.filter(o => o.delivery_status === filter);
        }
        
        if (typeFilter !== 'all') {
            filtered = filtered.filter(o => o.orderType === typeFilter);
        }
        
        return filtered;
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-font-main mb-2">My Orders</h1>
                <p className="text-font-secondary">View and track all your orders</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="card p-6">
                    <p className="text-font-secondary text-sm mb-1">Total Orders</p>
                    <h3 className="text-2xl font-bold text-font-main">{orders.length}</h3>
                </div>
                <div className="card p-6">
                    <p className="text-font-secondary text-sm mb-1">Pending</p>
                    <h3 className="text-2xl font-bold text-warning-500">
                        {orders.filter(o => o.delivery_status === 'Pending').length}
                    </h3>
                </div>
                <div className="card p-6">
                    <p className="text-font-secondary text-sm mb-1">Shipped</p>
                    <h3 className="text-2xl font-bold text-primary-500">
                        {orders.filter(o => o.delivery_status === 'Shipped').length}
                    </h3>
                </div>
                <div className="card p-6">
                    <p className="text-font-secondary text-sm mb-1">Delivered</p>
                    <h3 className="text-2xl font-bold text-success-500">
                        {orders.filter(o => o.delivery_status === 'Delivered').length}
                    </h3>
                </div>
            </div>

            {/* Filters */}
            <div className="card p-6 mb-6">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-font-main mb-2 block">Status:</label>
                        <div className="flex gap-2 flex-wrap">
                            {['all', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                <button 
                                    key={status}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                                        filter === status 
                                            ? 'bg-primary-500 text-white' 
                                            : 'bg-surface-elevated border border-border text-font-secondary hover:border-primary-500'
                                    }`}
                                    onClick={() => setFilter(status)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <label className="text-sm font-semibold text-font-main mb-2 block">Type:</label>
                        <div className="flex gap-2 flex-wrap">
                            {['all', 'Regular', 'Auction'].map(type => (
                                <button 
                                    key={type}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                        typeFilter === type 
                                            ? 'bg-primary-500 text-white' 
                                            : 'bg-surface-elevated border border-border text-font-secondary hover:border-primary-500'
                                    }`}
                                    onClick={() => setTypeFilter(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            {getFilteredOrders().length > 0 ? (
                <OrderList orders={getFilteredOrders()} />
            ) : (
                <div className="card p-12 text-center">
                    <Package size={48} className="mx-auto text-border mb-4" />
                    <p className="text-font-secondary text-lg">No orders found</p>
                    <p className="text-font-secondary mt-2">Orders matching your filters will appear here</p>
                </div>
            )}
        </div>
    );
};

export default MyOrders;