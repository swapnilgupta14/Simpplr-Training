import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { login } from '../redux/authSlice';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === 'admin' && password === 'admin') {
            dispatch(login({
                user: {
                    id: 1,
                    username: 'admin',
                    email: 'admin@example.com',
                    role: 'admin'
                },
                token: '1234567899098765431'
            }));
            navigate('/dashboard');
        } else if (username === 'user' && password === 'user') {
            dispatch(login({
                user: {
                    id: 2,
                    username: 'user',
                    email: 'user@example.com',
                    role: 'user'
                },
                token: '123456789876xwdxaxsa'
            }));
            navigate('/dashboard');
        } else if (username === 'user2' && password === 'user2') {
            dispatch(login({
                user: {
                    id: 3,
                    username: 'user2',
                    email: 'user2@gmail.com',
                    role: 'user'
                },
                token: 'dwhjsahxsabbahss'
            }));
            navigate('/dashboard');
        }
        else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

const Unauthorized: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h2>
                <p className="text-gray-700 mb-6">Not Allowed: Invalid Authorization Permission</p>
                <a
                    href="/login"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Return to Login
                </a>
            </div>
        </div>
    );
};

export { Login, Unauthorized };