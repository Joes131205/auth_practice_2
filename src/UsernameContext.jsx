import { createContext, useState, useContext } from "react";

const UsernameContext = createContext(null);

export const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    return (
        <UsernameContext.Provider value={{ username, setUsername }}>
            {children}
        </UsernameContext.Provider>
    );
};

export const useUsername = () => {
    const context = useContext(UsernameContext);
    if (context === undefined) {
        throw new Error("useUsername must be used within a UsernameProvider");
    }
    return context;
};
