import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../src/slices/userSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.user);

    const handleAuthAction = () => {
        if (isAuthenticated) {
            dispatch(logout());
            localStorage.removeItem('user'); 
        } else {
            navigate('/login'); 
        }
    };

    return (
        <nav className="bg-gray-900 p-4 flex justify-between items-center ">
            <div className="text-white text-xl font-semibold">
                MyApp
            </div>
            <button
                onClick={handleAuthAction}
                className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            >
                {isAuthenticated ? 'Logout' : 'Login'}
            </button>
        </nav>
    );
};

export default Navbar;
