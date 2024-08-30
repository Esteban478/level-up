import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import Notification from '../components/Notification';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import '../styles/AuthPage.css';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const validateForm = () => {
    if (isLogin && (!email || !password)) {
      setError('Please fill in all fields');
      return false;
    }
    if (!isLogin && (!username || !email || !password)) {
      setError('Please fill in all fields');
      return false;
    }
    if (!isLogin && !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(username, email, password);
      }
      navigate('/success');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="auth-page">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        )}
        <input
          type={isLogin ? "text" : "email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isLogin ? "Username or Email" : "Email"}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {!isLogin && password.length > 0 && <PasswordStrengthMeter password={password} />}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need to create an account?' : 'Already have an account?'}
      </button>
      {error && <Notification message={error} type="error" />}
    </div>
  );
};

export default Auth;