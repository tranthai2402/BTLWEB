import React, { useState } from 'react';

const LoginRegister = ({ onLogin, onRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoginMode) {
            onLogin(email, password);
        } else {
            onRegister(firstName, lastName, email, password);
        }
    };

    return (
        <div>
            <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLoginMode && (
                    <>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLoginMode ? 'Login' : 'Register Me'}</button>
            </form>
            <button onClick={() => setIsLoginMode(!isLoginMode)}>
                Switch to {isLoginMode ? 'Register' : 'Login'}
            </button>
        </div>
    );
};

export default LoginRegister;