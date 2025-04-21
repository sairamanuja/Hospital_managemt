import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const navigate = useNavigate(); // Fixed typo in variable name

    const [isAdmin, setIsAdmin] = useState(
        localStorage.getItem('adminToken') !== null
    );

    const login = (token) => {
        localStorage.setItem('adminToken', token);
        setIsAdmin(true);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAdmin(false);
        navigate('/admin/signin'); // Using correct variable name
    };

    return (
        <AdminContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
