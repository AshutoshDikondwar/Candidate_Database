import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../src/slices/userSlice';
import { Button } from './components/ui/button';
import { toast } from 'sonner';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.user);

    const handleAuthAction = () => {
        if (isAuthenticated) {
            dispatch(logout());
            localStorage.removeItem('user');
            navigate("/")
        } else {
            navigate('/login');
            toast("Please log in to continue.")
        }
    };

    return (
        <nav className="bg-gray-900 p-4 flex justify-between items-center ">
            <div className="text-white text-xl font-semibold cursor-pointer"  onClick={() => navigate("/")}>
                Candidate database
            </div>
            <div className='flex gap-4'>
                <Button
                    onClick={handleAuthAction}
                    variant="default"
                >
                    {isAuthenticated ? 'Logout' : 'Login'}
                </Button>
                {isAuthenticated && user.role === 'admin' && <Button
                    onClick={() => navigate("/admin/dashboard")}
                    variant="default"
                >
                    Dashboard
                </Button>}
            </div>
        </nav>
    );
};

export default Navbar;
