import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader } from '../utils/getToken';


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    users: [],
};

const handleApiError = (error) => {
    return error.response?.data?.message || error.message || 'An error occurred';
};

// Async Thunks
export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', credentials);
            localStorage.setItem('jwtToken', data.token); // Store JWT
            return data;
        } catch (error) {
            console.error('Login Error:', error); // Log error
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const signupUser = createAsyncThunk(
    'user/signup',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/signup', userData);
            return data;
        } catch (error) {

            if (error.response) {
                if (error.response.status === 409) {
                    alert(error.response.data.message);
                }
            }
            console.error('Signup Error:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            localStorage.removeItem('jwtToken');
            return null;
        } catch (error) {
            console.error('Logout Error:', error);
            return rejectWithValue(handleApiError(error));
        }
    }
);


export const authCheck = createAsyncThunk(
    'user/authCheck',
    async (_, { rejectWithValue }) => {
        try {
            const config = getAuthHeader();
            const { data } = await axios.get('http://localhost:5000/api/auth/authCheck', config);
            return data;
        } catch (error) {
            console.error('Auth Check Error:', error);
            return rejectWithValue(handleApiError(error));
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {

        //Login 
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        //Authentication Check
        builder
            .addCase(authCheck.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authCheck.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.isAuthenticated = true;
            })
            .addCase(authCheck.rejected, (state, { payload }) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = payload;
            });

        // Signup
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signupUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        });
        builder.addCase(signupUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.isAuthenticated = false;
        });

        // Logout
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('jwtToken');
        });

    },
});
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
