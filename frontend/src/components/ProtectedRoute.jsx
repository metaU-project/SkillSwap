import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../utils/authFetch';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const user = await checkAuth();
                setIsAuthenticated(!!user);
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    return children;
}

export default ProtectedRoute;
