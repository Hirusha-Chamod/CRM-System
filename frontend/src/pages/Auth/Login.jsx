import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/user';



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    }

    return (
        <div className='bg-gray-200 flex items-center justify-center min-h-screen'>
            <div className='bg-white p-8 w-full max-w-sm shadow-lg rounded-lg hover:shadow-2xl'>
                <h1 className='font-bold text-2xl text-center'>Log In</h1>
                <form className='space-y-4'>
                    <div className='flex flex-col space-y-1'>
                        <label>Email:</label>
                        <input
                            className='border border-gray-300 p-2 rounded-lg'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" />
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <label>Password:</label>
                        <input
                            className='border border-gray-300 p-2 rounded-lg'
                            type="password"
                            required
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <button type="submit" onClick={login} className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Log in
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot your password?</a>
                </div>
            </div>
        </div>



    )
}

export default Login
