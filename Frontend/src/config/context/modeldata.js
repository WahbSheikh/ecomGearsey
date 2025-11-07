function ModelData() {
  const initialState = {
    user: null, // Will be populated from Better Auth
    cart: [],
    notifications: [],
    products: [
      {
        id: 1,
        title: "1968 Mustang Carburetor",
        seller: "John's Auto Parts",
        price: 120,
        type: "fixed",
        condition: "Used (Good)",
        category: "engines",
        description:
          "Original carburetor, fits 1968 Mustang models. Excellent working condition with all original parts intact.",
        images: [
          "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=500",
          "https://images.pexels.com/photos/3807278/pexels-photo-3807278.jpeg?auto=compress&cs=tinysrgb&w=500",
        ],
        inStock: true,
      },
      {
        id: 2,
        title: "Vintage Steering Wheel (1960s)",
        seller: "Classic Car Vault",
        currentBid: 250,
        startingPrice: 200,
        type: "auction",
        condition: "Excellent",
        category: "accessories",
        description:
          "Beautiful vintage steering wheel from the 1960s. Perfect for classic car restoration projects.",
        images: [
          "https://images.pexels.com/photos/3807275/pexels-photo-3807275.jpeg?auto=compress&cs=tinysrgb&w=500",
          "https://images.pexels.com/photos/3807279/pexels-photo-3807279.jpeg?auto=compress&cs=tinysrgb&w=500",
        ],
        timeLeft: { hours: 2, minutes: 15 },
        bids: [
          { bidder: "Alex P.", amount: 250, time: "2 mins ago" },
          { bidder: "Sara K.", amount: 240, time: "10 mins ago" },
        ],
      },
      {
        id: 3,
        title: "Chrome Exhaust Tips Set",
        seller: "Performance Parts Pro",
        price: 85,
        type: "fixed",
        condition: "New",
        category: "body",
        description:
          "High-quality chrome exhaust tips, universal fit for most vehicles.",
        images: [
          "https://images.pexels.com/photos/3807276/pexels-photo-3807276.jpeg?auto=compress&cs=tinysrgb&w=500",
          "https://images.pexels.com/photos/3807280/pexels-photo-3807280.jpeg?auto=compress&cs=tinysrgb&w=500",
        ],
        inStock: true,
      },
    ],
    userBids: [],
    userListings: [],
    filters: {
      show: "all",
      category: "all", 
      sortBy: "latest",
      priceMin: null,
      priceMax: null,
    },
  };
  return initialState;
}

export default ModelData;
