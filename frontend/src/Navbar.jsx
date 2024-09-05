import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../src/slices/userSlice';
import { Button } from './components/ui/button';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.user);

    const handleAuthAction = () => {
        if (isAuthenticated) {
            dispatch(logout());
            localStorage.removeItem('user');
            navigate("/login")
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="bg-gray-900 p-4 flex justify-between items-center ">
            <div className="text-white text-xl font-semibold">
                MyApp
            </div>
            <div className='flex gap-4'>
                <Button
                    onClick={handleAuthAction}
                    variant="default"
                >
                    {isAuthenticated ? 'Logout' : 'Login'}
                </Button>
                {isAuthenticated && user.role === 'admin' && <Button
                    onClick={()=>navigate("/admin/dashboard")}
                    variant="default"
                >
                    Dashboard
                </Button>}
            </div>
        </nav>
    );
};

export default Navbar;
