import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:3000/api/auth");
                const data = await response.json();
                setUser(data);
            } catch (e) {
                setUser(null);
            }
        })();
    }, []);

    function updateUser(user) {
        if (!user) {
            return;
        }
        setUser(user);
    }

    async function logout() {
        if (!user) {
            return;
        }
        const response = await fetch('/api/auth/logout');
        if (response.code === 200) {
            setUser(null);
        }
    }

    const isLoggedIn = Boolean(user);
    const loading = user === undefined;

    const values = {
        user,
        isLoggedIn,
        loading,
        updateUser,
        logout,
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
}
