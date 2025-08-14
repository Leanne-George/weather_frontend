import React, { useState, useEffect, useRef } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState({
    city: "Mumbai",
    temperature: "",
    condition: "",
    isDay: true,
  });

  const lastTapRef = useRef(0);
  const longPressTimerRef = useRef(null);

  useEffect(() => {
    // Decide if it's day or night
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;

    // Fake temperature
    const temp = isDay
      ? `${Math.floor(Math.random() * 6) + 28}°C` // 28–33°C daytime
      : `${Math.floor(Math.random() * 4) + 24}°C` // 24–27°C night

    // Weather conditions pool
    const dayConditions = ["Sunny ☀️", "Partly Cloudy 🌤", "Cloudy ☁️"];
    const nightConditions = ["Clear 🌙", "Cloudy ☁️", "Fog 🌫"];

    const condition = isDay
      ? dayConditions[Math.floor(Math.random() * dayConditions.length)]
      : nightConditions[Math.floor(Math.random() * nightConditions.length)];

    setWeather({
      city: "Mumbai",
      temperature: temp,
      condition,
      isDay,
    });
  }, []);

  // SOS Trigger (Double Tap)
  const handleCityOrTempClick = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300 && now - lastTapRef.current > 0) {
      const lat = 19.076;
      const lon = 72.8777;
      const whatsappUrl = `https://wa.me/?text=SOS!%20I%20need%20help.%20My%20location:%20https://maps.google.com/?q=${lat},${lon}`;
      window.open(whatsappUrl, "_blank");
    }
    lastTapRef.current = now;
  };

  // Call Trigger (Long Press)
  const handleLongPressStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      window.location.href = "tel:+911234567890"; // Replace with actual number
    }, 800);
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimerRef.current);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-lg p-6 text-center select-none border border-gray-100">
      <h2
        className="text-lg font-semibold text-gray-800 tracking-wide cursor-pointer"
        onClick={handleCityOrTempClick}
      >
        {weather.city}
      </h2>

      <div
        className={`mt-2 text-4xl font-bold text-white rounded-lg py-2 cursor-pointer ${
          weather.isDay
            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
            : "bg-gradient-to-r from-blue-800 to-indigo-900"
        }`}
        onClick={handleCityOrTempClick}
      >
        {weather.temperature}
      </div>

      <p className="text-gray-500 mt-1">{weather.condition}</p>

      <button
        onMouseDown={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onMouseLeave={handleLongPressEnd}
        onTouchStart={handleLongPressStart}
        onTouchEnd={handleLongPressEnd}
        className={`mt-4 text-white px-4 py-2 rounded-lg shadow-md transition-colors font-medium ${
          weather.isDay
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        🔄 Refresh
      </button>
    </div>
  );
}
