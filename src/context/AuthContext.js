import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (name, email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            setUser(res.data);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setUser(res.data);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login }}>
            {children}
        </AuthContext.Provider>
    );
};
