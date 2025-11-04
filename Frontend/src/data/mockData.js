// Mock data matching your backend schema exactly

export const mockAuctions = [
  {
    _id: "auction1",
    partId: "part123",
    sellerId: "seller1",
    title: "Vintage Car Engine V8",
    description: "Rare 1965 V8 engine in excellent condition",
    imageUrl:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    start_price: 5000,
    current_price: 7500,
    reserve_price: 8000,
    start_time: new Date("2024-01-01"),
    end_time: new Date("2024-12-31"),
    status: "Active",
    winnerId: null,
    totalBids: 12,
    bidders: ["user1", "user2", "user3"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date(),
  },
  {
    _id: "auction2",
    partId: "part124",
    sellerId: "seller1",
    title: "Racing Transmission Gearbox",
    description: "High-performance 6-speed racing transmission",
    imageUrl:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400",
    start_price: 3000,
    current_price: 4200,
    start_time: new Date("2024-01-15"),
    end_time: new Date("2024-12-25"),
    status: "Active",
    winnerId: null,
    totalBids: 8,
    bidders: ["user1", "user4"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date(),
  },
  {
    _id: "auction3",
    partId: "part125",
    sellerId: "seller1",
    title: "Classic Chrome Bumper Set",
    description: "Original chrome bumpers from 1970s muscle car",
    imageUrl:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
    start_price: 800,
    current_price: 1200,
    start_time: new Date("2024-02-01"),
    end_time: new Date("2024-03-01"),
    status: "Closed",
    winnerId: "user1",
    totalBids: 15,
    bidders: ["user1", "user2"],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    _id: "auction4",
    partId: "part126",
    sellerId: "seller1",
    title: "Performance Turbocharger Kit",
    description: "Twin turbo setup for high-performance builds",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
    start_price: 2500,
    current_price: 2500,
    start_time: new Date("2024-12-15"),
    end_time: new Date("2025-01-15"),
    status: "Pending",
    winnerId: null,
    totalBids: 0,
    bidders: [],
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    _id: "auction5",
    partId: "part127",
    sellerId: "seller1",
    title: "Leather Racing Seats (Pair)",
    description: "Premium bucket seats with 5-point harness mounting",
    imageUrl:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400",
    start_price: 1500,
    current_price: 2100,
    start_time: new Date("2024-02-10"),
    end_time: new Date("2024-11-20"),
    status: "Active",
    winnerId: null,
    totalBids: 6,
    bidders: ["user2", "user3"],
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date(),
  },
];

export const mockBids = [
  {
    _id: "bid1",
    auctionId: "auction1",
    userId: "user1",
    userName: "John Doe",
    bid_amount: 7500,
    status: "Active",
    isWinning: true,
    createdAt: new Date("2024-11-01T10:30:00"),
    updatedAt: new Date("2024-11-01T10:30:00"),
  },
  {
    _id: "bid2",
    auctionId: "auction1",
    userId: "user2",
    userName: "Jane Smith",
    bid_amount: 7200,
    status: "Outbid",
    isWinning: false,
    createdAt: new Date("2024-11-01T09:15:00"),
    updatedAt: new Date("2024-11-01T10:30:00"),
  },
  {
    _id: "bid3",
    auctionId: "auction2",
    userId: "user1",
    userName: "John Doe",
    bid_amount: 4200,
    status: "Active",
    isWinning: true,
    createdAt: new Date("2024-11-02T14:20:00"),
    updatedAt: new Date("2024-11-02T14:20:00"),
  },
  {
    _id: "bid4",
    auctionId: "auction3",
    userId: "user1",
    userName: "John Doe",
    bid_amount: 1200,
    status: "Won",
    isWinning: true,
    createdAt: new Date("2024-02-28T16:45:00"),
    updatedAt: new Date("2024-03-01T00:00:00"),
  },
  {
    _id: "bid5",
    auctionId: "auction5",
    userId: "user1",
    userName: "John Doe",
    bid_amount: 1900,
    status: "Outbid",
    isWinning: false,
    createdAt: new Date("2024-11-01T11:00:00"),
    updatedAt: new Date("2024-11-02T12:00:00"),
  },
  {
    _id: "bid6",
    auctionId: "auction5",
    userId: "user2",
    userName: "Jane Smith",
    bid_amount: 2100,
    status: "Active",
    isWinning: true,
    createdAt: new Date("2024-11-02T12:00:00"),
    updatedAt: new Date("2024-11-02T12:00:00"),
  },
];

export const mockOrders = [
  {
    _id: "order1",
    userId: "user1",
    sellerId: "seller1",
    auctionId: "auction3",
    orderItems: ["item1"],
    total_amount: 1200,
    payment_status: "Paid",
    delivery_status: "Delivered",
    shippingAddress: {
      street: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    orderType: "Auction",
    createdAt: new Date("2024-03-02"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    _id: "order2",
    userId: "user1",
    sellerId: "seller2",
    orderItems: ["item2", "item3"],
    total_amount: 450,
    payment_status: "Paid",
    delivery_status: "Shipped",
    shippingAddress: {
      street: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    orderType: "Regular",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-20"),
  },
  {
    _id: "order3",
    userId: "user1",
    sellerId: "seller1",
    orderItems: ["item4"],
    total_amount: 890,
    payment_status: "Pending",
    delivery_status: "Pending",
    shippingAddress: {
      street: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    orderType: "Regular",
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-01"),
  },
];

// Analytics data for charts
export const mockAnalyticsData = {
  salesByMonth: [
    { month: "Jan", sales: 12, revenue: 15000 },
    { month: "Feb", sales: 19, revenue: 24000 },
    { month: "Mar", sales: 15, revenue: 18500 },
    { month: "Apr", sales: 22, revenue: 28000 },
    { month: "May", sales: 25, revenue: 32000 },
    { month: "Jun", sales: 20, revenue: 26000 },
    { month: "Jul", sales: 28, revenue: 35000 },
    { month: "Aug", sales: 24, revenue: 30000 },
    { month: "Sep", sales: 30, revenue: 38000 },
    { month: "Oct", sales: 27, revenue: 34000 },
    { month: "Nov", sales: 18, revenue: 23000 },
  ],
  bidsByAuction: [
    { name: "V8 Engine", bids: 12 },
    { name: "Gearbox", bids: 8 },
    { name: "Bumpers", bids: 15 },
    { name: "Racing Seats", bids: 6 },
  ],
  auctionStatus: [
    { status: "Active", count: 2 },
    { status: "Closed", count: 1 },
    { status: "Pending", count: 1 },
    { status: "Cancelled", count: 0 },
  ],
};

// Line 262-269 - Better user ID handling
export const getCurrentUserId = (user) => {
  if (!user || !user.id) {
    console.warn("⚠️ No user logged in, returning null");
    return null; // ✅ Return null instead of default "user1"
  }
  return user.id;
};

export const getCurrentSellerId = (user) => {
  if (!user || !user.id) {
    console.warn("⚠️ No user logged in, returning null");
    return null;
  }
  return user.id;
};