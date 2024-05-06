import React, { createContext, useState } from "react";

const GlobalState = createContext();

const GlobalStateProvider = ({ children }) => {
  const [profile, setProfile] = useState({});

  return (
    <GlobalState.Provider value={{ setProfile, profile }}>
      {children}
    </GlobalState.Provider>
  );
};
export { GlobalStateProvider, GlobalState };
