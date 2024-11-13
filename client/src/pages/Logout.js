// src/pages/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../redux/reducers/authReducer';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem('token'); // Clear the token
        dispatch(logoutSuccess()); // Update Redux state
        navigate('/');
    }, [dispatch, navigate]);

    return (
        <div>
            <h3>You have been logged out.</h3>
        </div>
    );
};

export default Logout;
