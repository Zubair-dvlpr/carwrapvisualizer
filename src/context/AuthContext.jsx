import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // live domain http://34.106.73.252/backend
  const domain = 'http://localhost/carApi/';
  const localhost = 'http://localhost/carApi/';

  const navigate = useNavigate();
  const [credits, setCredits] = useState();
  const [countLogin, setCountLogin] = useState();
  const [user, setUser] = useState(() => {
    // Initialize from localStorage on first load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState(false);

  // Load user from localStorage when the app is reloaded
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user data from localStorage
    }
    setLoading(false); // Stop loading after checking localStorage
  }, []);


  const [todayBookings, setTodayBookings] = useState([]);
  const [tomorrowBookings, setTomorrowBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingsByDate, setBookingsByDate] = useState([]);


  const brandOptions = [
    "3M", "Avery Dennison", "Oracal (Orafol)", "KPMF (Kay Premium Marking Films)", "Hexis",
    "Inozetek", "Arlon", "APA America (APA Spa)", "TeckWrap", "VViViD Vinyl",
    "Rwraps (Rvinyl)", "SOTT", "CheetahWrap", "PremiumTech", "Metro Wrap (by Metro Restyling)",
    "FEELISONG", "Icarus Wraps", "NDFOS", "TactiColor", "G-SWELL"
  ];
  const wrapColors = {
    '3M': [
      { name: 'Gloss Black (G12)', colorCode: '#000000' },
      { name: 'Gloss White (G10)', colorCode: '#FFFFFF' },
      { name: 'Gloss Hot Rod Red (G13)', colorCode: '#C8102E' },
      { name: 'Gloss Burnt Orange (G14)', colorCode: '#BF5700' },
      { name: 'Gloss Bright Yellow (G15)', colorCode: '#FFD100' },
      { name: 'Gloss Sunflower (G25)', colorCode: '#FFC72C' },
      { name: 'Gloss Kelly Green (G46)', colorCode: '#00843D' },
      { name: 'Gloss Intense Blue (G47)', colorCode: '#005EB8' },
      { name: 'Gloss Sky Blue (G77)', colorCode: '#00B2A9' },
      { name: 'Gloss Light Ivory (G79)', colorCode: '#F6E6C3' },
      { name: 'Gloss Dark Red (G83)', colorCode: '#8B0000' },
      { name: 'Gloss Hot Pink (G103)', colorCode: '#FF69B4' },
      { name: 'Gloss White Aluminum (G120)', colorCode: '#D6D6D6' },
      { name: 'Gloss Boat Blue (G127)', colorCode: '#0033A0' },
      { name: 'Gloss Anthracite (G201)', colorCode: '#383838' },
      { name: 'Gloss Red Metallic (G203)', colorCode: '#B22222' },
      { name: 'Gloss Charcoal Metallic (G211)', colorCode: '#36454F' },
      { name: 'Gloss Black Metallic (G212)', colorCode: '#1C1C1C' },
      { name: 'Gloss Deep Blue Metallic (G217)', colorCode: '#003366' },
      { name: 'Gloss Blue Metallic (G227)', colorCode: '#1F75FE' },
      { name: 'Gloss Gold Metallic (G241)', colorCode: '#D4AF37' },
      { name: 'Gloss Lemon Sting (G335)', colorCode: '#FFF700' },
      { name: 'Gloss Green Envy (G336)', colorCode: '#00FF00' },
      { name: 'Gloss Blue Fire (G337)', colorCode: '#007FFF' },
      { name: 'Gloss Liquid Copper (G344)', colorCode: '#B87333' },
      { name: 'Gloss Fierce Fuchsia (G348)', colorCode: '#C154C1' },
      { name: 'Satin Black (S12)', colorCode: '#1C1C1C' },
      { name: 'Satin White (S10)', colorCode: '#D3D3D3' },
      { name: 'Satin Battleship Gray (S51)', colorCode: '#7A7A7A' },
      { name: 'Satin Key West (S57)', colorCode: '#00D6B4' },
      { name: 'Satin Apple Green (S196)', colorCode: '#8DB600' },
      { name: 'Satin Pearl White (SP10)', colorCode: '#D8D8D8' },
      { name: 'Satin Frozen Vanilla (SP240)', colorCode: '#F5E9B8' },
      { name: 'Satin Flip Psychedelic (SP281)', colorCode: '#6B3F99' },
      { name: 'Satin Smoldering Red (S363)', colorCode: '#9E1B32' },
      { name: 'Matte Black (M12)', colorCode: '#212121' },
      { name: 'Matte White (M10)', colorCode: '#D3D3D3' },
      { name: 'Matte Red (M13)', colorCode: '#9B1B30' },
      { name: 'Matte Yellow (M15)', colorCode: '#F4D03F' },
      { name: 'Matte Military Green (M26)', colorCode: '#4B5320' },
      { name: 'Matte Indigo (M27)', colorCode: '#3D4F8A' },
      { name: 'Matte Riviera Blue (M67)', colorCode: '#3C6B8B' },
      { name: 'Matte Dark Gray (M261)', colorCode: '#585858' },
      { name: 'Matte Charcoal Metallic (M211)', colorCode: '#333333' },
      { name: 'Gloss Flip Psychedelic (FPE)', colorCode: '#6B3F99' },
      { name: 'Gloss Flip Ghost Pearl (FPG)', colorCode: '#D1B2FF' },
      { name: 'Gloss Flip Electric Wave (FPEW)', colorCode: '#00B2FF' },
      { name: 'Brushed Steel (BRF)', colorCode: '#B0B0B0' },
      { name: 'Brushed Aluminum (BRM)', colorCode: '#A8A8A8' },
      { name: 'Carbon Fiber Black (CF12)', colorCode: '#1C1C1C' },
      { name: 'Carbon Fiber Charcoal (CF21)', colorCode: '#333333' }
    ],
    'Avery Dennison': [
      { name: 'Satin Black (S12)', colorCode: '#1C1C1C' },
      { name: 'Satin White (S10)', colorCode: '#D3D3D3' },
      { name: 'Satin Battleship Gray (S51)', colorCode: '#7A7A7A' },
      { name: 'Satin Key West (S57)', colorCode: '#00D6B4' },
      { name: 'Satin Apple Green (S196)', colorCode: '#8DB600' },
      { name: 'Satin Pearl White (SP10)', colorCode: '#D8D8D8' },
      { name: 'Satin Frozen Vanilla (SP240)', colorCode: '#F5E9B8' },
      { name: 'Satin Flip Psychedelic (SP281)', colorCode: '#6B3F99' },
      { name: 'Satin Smoldering Red (S363)', colorCode: '#9E1B32' },
      { name: 'Matte Black (M12)', colorCode: '#212121' },
      { name: 'Matte White (M10)', colorCode: '#D3D3D3' },
      { name: 'Matte Red (M13)', colorCode: '#9B1B30' },
      { name: 'Matte Yellow (M15)', colorCode: '#F4D03F' },
      { name: 'Matte Military Green (M26)', colorCode: '#4B5320' },
      { name: 'Matte Indigo (M27)', colorCode: '#3D4F8A' },
      { name: 'Matte Riviera Blue (M67)', colorCode: '#3C6B8B' },
      { name: 'Matte Dark Gray (M261)', colorCode: '#585858' },
      { name: 'Matte Charcoal Metallic (M211)', colorCode: '#333333' },
      { name: 'Gloss Flip Psychedelic (FPE)', colorCode: '#6B3F99' },
      { name: 'Gloss Flip Ghost Pearl (FPG)', colorCode: '#D1B2FF' },
      { name: 'Gloss Flip Electric Wave (FPEW)', colorCode: '#00B2FF' },
      { name: 'Brushed Steel (BRF)', colorCode: '#B0B0B0' },
      { name: 'Brushed Aluminum (BRM)', colorCode: '#A8A8A8' },
      { name: 'Carbon Fiber Black (CF12)', colorCode: '#1C1C1C' },
      { name: 'Carbon Fiber Charcoal (CF21)', colorCode: '#333333' }
    ]
    // Add other brand color options here
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        credits,
        countLogin,
        setCountLogin,

        loading,
        animation,
        setAnimation,
        todayBookings,
        domain,
        tomorrowBookings,
        cancelledBookings,
        selectedDate,
        setSelectedDate,
        bookingsByDate,
        brandOptions,
        wrapColors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
