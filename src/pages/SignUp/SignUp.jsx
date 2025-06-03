// LoginForm.jsx
import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { Facebook, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    general: ''
  });
  const [newsletter, setNewsletter] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      username: '',
      password: '',
      general: ''
    };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('https://km0-api.vercel.app/auth/register', {
        name: username,
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';

      if (errorMessage.toLowerCase().includes('email')) {
        setErrors(prev => ({ ...prev, email: 'Email already exists' }));
      } else if (errorMessage.toLowerCase().includes('username')) {
        setErrors(prev => ({ ...prev, username: 'Username already exists' }));
      } else {
        setErrors(prev => ({ ...prev, general: errorMessage }));
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Link to='/'><img src="images/M.png" alt="Logo" className={styles.logo} /></Link>
        <h2 className={styles.title}>Sign up</h2>
        <p className={styles.subtitle}>Already have an account? <Link to='/login'>Log in</Link> </p>
        <h2>Welcome to KM 0</h2>

        {errors.general && <p className={styles.error}>{errors.general}</p>}

        <form onSubmit={handleSignUp}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: '' }));
              }}
              required
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors(prev => ({ ...prev, username: '' }));
              }}
              required
            />
            {errors.username && <p className={styles.errorText}>{errors.username}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Your password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(prev => ({ ...prev, password: '' }));
                }}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)} className={styles.eyeIcon}>
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </span>
            </div>
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>

          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              id="newsletter"
            />
            <label htmlFor="newsletter">
              I want to receive emails about the product, feature updates, events, and marketing promotions.
            </label>
          </div>
          <button type="submit" className={styles.loginBtn}>Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;