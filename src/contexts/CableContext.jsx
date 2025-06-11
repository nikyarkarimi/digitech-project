import { createContext, useContext, useState } from "react";

const CableContext = createContext();

// Provider Component
export function CableProvider({ children }) {
    const [selectedCableIndex, setSelectedCableIndex] = useState(null);

    return (
        <CableContext.Provider value={{ selectedCableIndex, setSelectedCableIndex }}>
            {children}
        </CableContext.Provider>
    );
}

// Custom Hook for easier access
export function useCable() {
    return useContext(CableContext);
}
