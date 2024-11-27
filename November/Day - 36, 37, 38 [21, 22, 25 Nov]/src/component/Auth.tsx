import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { login } from '../redux/authSlice';
import { User } from '../types';

const Auth: React.FC = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'Team Manager' | 'Team Member'>('Team Member');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem("userCurrent");

        if (currentUser) {
            const user = JSON.parse(currentUser);
            const { password, username } = user;
            // console.log(username, password, "cred");
            const simulatedEvent = {
                preventDefault: () => { },
            } as React.FormEvent;
            setUsername(username);
            setPassword(password);
            handleLogin(simulatedEvent);
        }
    }, [username, password]);


    const arrayBufferToHex = (buffer: ArrayBuffer): string => {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    };

    const generateToken = async (userId: number, username: string): Promise<string> => {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 15);
        const dataToHash = `${userId}-${username}-${timestamp}-${randomString}`;

        const encoder = new TextEncoder();
        const data = encoder.encode(dataToHash);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashHex = arrayBufferToHex(hashBuffer);

        return hashHex.substring(0, 32);
    };

    const hashPassword = async (pwd: string): Promise<string> => {
        const encoder = new TextEncoder();
        const data = encoder.encode(pwd);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return arrayBufferToHex(hashBuffer);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!username || !password) return;

        try {
            const users = JSON.parse(localStorage.getItem('SignedUpUsers') || '[]');
            // const hashedPassword = await hashPassword(password);
            const hashedPassword = password;


            if (username === 'admin') {
                // const adminHashedPassword = await hashPassword('admin12');
                const adminHashedPassword = 'admin12';
                if (hashedPassword === adminHashedPassword) {
                    const adminToken = await generateToken(1, 'admin12');
                    const adminUser: User = {
                        id: 1,
                        username: 'admin',
                        role: 'Admin',
                        email: 'admin@gmail.com',
                        token: adminToken,
                        password: adminHashedPassword,
                        createdAt: new Date().toISOString()
                    };

                    dispatch(login({
                        user: adminUser,
                        token: adminToken,
                    }));
                    navigate('/dashboard');
                    return;
                }
            }

            // console.log(username, password, "received password")
            const user = users.find((u: User) =>
                u.username === username && u.password === hashedPassword
            );

            if (user) {
                const newToken = await generateToken(user.id, user.username);

                const updatedUsers = users.map((u: User) =>
                    u.username === user.username ? { ...u, token: newToken } : u
                );
                localStorage.setItem('SignedUpUsers', JSON.stringify(updatedUsers));

                const userForState: User = {
                    ...user,
                    token: newToken
                };

                console.log(userForState, "userForState");

                dispatch(login({
                    user: userForState,
                    token: newToken,
                }));

                navigate('/dashboard');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }

            const existingUsers = JSON.parse(localStorage.getItem('SignedUpUsers') || '[]');
            const userExists = existingUsers.find((u: User) => u.username === username);

            if (userExists) {
                alert('Username already exists!');
                return;
            }

            const userId = Date.now();
            // const hashedPassword = await hashPassword(password);
            const hashedPassword = password;
            const token = await generateToken(userId, username);

            const newUser: User = {
                id: userId,
                username,
                password: hashedPassword,
                role: role,
                token,
                createdAt: new Date().toISOString()
            };

            localStorage.setItem('SignedUpUsers',
                JSON.stringify([...existingUsers, newUser]));

            alert('Signup successful! Please login to continue.');
            setIsSignup(false);
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isSignup ? 'Signup' : 'Login'}
                </h2>
                <form onSubmit={isSignup ? handleSignup : handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            required
                            minLength={6}
                        />
                    </div>

                    {isSignup && (
                        <div className="mb-6">
                            <label htmlFor="role" className="block text-gray-700 mb-2">
                                Role
                            </label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value as 'Team Manager' | 'Team Member')}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="Team Member">Team Member</option>
                                <option value="Team Manager">Team Manager</option>
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition duration-300"
                    >
                        {isSignup ? 'Signup' : 'Login'}
                    </button>
                </form>

                <p className="text-center mt-4 text-gray-600">
                    {isSignup ? (
                        <>
                            Already have an account?{' '}
                            <button
                                className="text-black underline"
                                onClick={() => setIsSignup(false)}
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <button
                                className="text-black underline"
                                onClick={() => setIsSignup(true)}
                            >
                                Signup
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Auth;