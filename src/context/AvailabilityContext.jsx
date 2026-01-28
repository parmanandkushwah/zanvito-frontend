import { createContext, useContext, useState, useEffect } from "react";

const AvailabilityContext = createContext();

export const AvailabilityProvider = ({ children }) => {
  const [serviceAvailable, setServiceAvailable] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("service_available");
    if (saved !== null) {
      setServiceAvailable(saved === "true");
    }
  }, []);

  return (
    <AvailabilityContext.Provider
      value={{ serviceAvailable, setServiceAvailable }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
};

export const useAvailability = () => useContext(AvailabilityContext);
