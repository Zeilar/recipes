import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3000/api/auth");
            if (response.code === 200) {
                const data = await response.json();
                setUser(data);
            } else {
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

    const isLoggedIn = user != null;
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
