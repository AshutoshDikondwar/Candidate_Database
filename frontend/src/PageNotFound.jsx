import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl">Page Not Found</p>
                <p className="mt-2">The page you are looking for does not exist.</p>
                <Button type="button" onClick={() => navigate("/")} variant="ghost">Click Here</Button>
            </div>
        </div>
    );
}

export default PageNotFound