import { createContext, useState } from "react";

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(new WebSocket('ws://localhost:8080'))
    const [userEmail, setUserEmail] = useState("")
    const [token, setToken] = useState(localStorage.getItem('token'))

    return (
        <AppContext.Provider
            value={{
                socket, setSocket,
                userEmail, setUserEmail,
                token, setToken
            }}
        >
            {children}
        </AppContext.Provider>
    )
};