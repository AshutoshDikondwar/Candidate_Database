import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { toast } from 'sonner';

const Home = () => {

    const { isAuthenticated, user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleOnClick = () => {
        if (!isAuthenticated) {
            navigate("/login")
            toast("Please log in to continue.")
        } else {
            navigate("/candidates")
        }
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4 text-gray-100">Candidate Database</h1>
                <p className="text-xl mb-8 text-gray-400">
                    Manage and track top candidates effortlessly with our powerful platform.
                </p>

                <Button
                    className="bg-gray-800 text-gray-300 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition duration-200"
                    onClick={handleOnClick}
                >
                    Explore Candidates
                </Button>
            </div>
        </div>
    );
};

export default Home;
