import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [userEmail, setUserEmail] = useState("")
    const [token, setToken] = useState(localStorage.getItem('token'))

    const initializeWebSocket = () => {
        const newSocket = new WebSocket(`ws://localhost:8080?token=${token}`);
        setSocket(newSocket);
    };

    useEffect(() => {
        if (token) {
            initializeWebSocket();
        }
    }, [token]);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);

    return (
        <AppContext.Provider
            value={{
                socket, setSocket,
                userEmail, setUserEmail,
                token, setToken,
                initializeWebSocket
            }}
        >
            {children}
        </AppContext.Provider>
    )
};