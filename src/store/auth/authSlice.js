import { createSlice } from '@reduxjs/toolkit';

export const TYPE_CHECKING = "checking"
export const TYPE_AUTHENTICATED = "authenticated"
export const TYPE_NOT_AUTHENTICATED = "not-authenticated"

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'authenticated','not-authenticated',
        user: {},
        errorMessage: null,
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user   = {};
            state.errorMessage = null;
        },
        onLogin: ( state, {payload}) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = null;
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user   = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;