/*import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
*/

// redux/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: !!localStorage.getItem('token'), // Initial check for token
        user: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
