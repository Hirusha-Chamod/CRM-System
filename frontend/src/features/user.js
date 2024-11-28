import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader } from '../utils/getToken';

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    users: [],
};

// Utility for extracting error messages
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
            console.error('Signup Error:', error);
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            localStorage.removeItem('jwtToken'); // Clear JWT
            return null;
        } catch (error) {
            console.error('Logout Error:', error);
            return rejectWithValue(handleApiError(error));
        }
    }
);




export const updateUser = createAsyncThunk(
    'user/update',
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const config = getAuthHeader();
            const { data } = await axios.put(`http://localhost:5000/api/users/${id}`, userData, config);
            return data;
        } catch (error) {
            console.error('Update User Error:', error);
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

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
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

        // Auth Check
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
            state.user = payload;
            state.isAuthenticated = true;
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
        });

        
        // Update User
        builder.addCase(updateUser.fulfilled, (state, { payload }) => {
            const index = state.users.findIndex((user) => user.id === payload.id);
            if (index !== -1) {
                state.users[index] = payload;
            }
            if (state.user?.id === payload.id) {
                state.user = payload;
            }
        });
    },
});

// Export actions and reducer
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
