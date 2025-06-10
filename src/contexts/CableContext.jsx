// 1. Notwendige Hooks importieren
import { createContext, useContext, useState } from "react";

// 2. Erstelle einen neuen React Context
const CableContext = createContext();

// 3. Provider-Komponente, die Zustand und Setter bereitstellt
export function CableProvider({ children }) {
    const [selectedCableIndex, setSelectedCableIndex] = useState(null);

    return (
        <CableContext.Provider value={{ selectedCableIndex, setSelectedCableIndex }}>
            {children}
        </CableContext.Provider>
    );
}

// 4. Custom Hook für einfachen Zugriff in anderen Komponenten
export function useCable() {
    return useContext(CableContext);
}
