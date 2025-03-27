import React, { createContext, useState, useContext } from "react";

// Create Context
const MarketContext = createContext();

// Provider Component
export const MarketProvider = ({ children }) => {
  const [marketLands, setMarketLands] = useState([]);

  // Function to add land to market
  const addToMarket = (land) => {
    setMarketLands((prevLands) => {
      // Prevent duplicate additions
      if (prevLands.find((item) => item.id === land._id)) return prevLands;
      return [...prevLands, land];
    });
  };

  return (
    <MarketContext.Provider value={{ marketLands, addToMarket }}>
      {children}
    </MarketContext.Provider>
  );
};

// Custom Hook to Use Context
export const useMarket = () => useContext(MarketContext);
