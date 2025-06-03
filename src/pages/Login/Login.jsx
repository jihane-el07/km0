// LoginForm.jsx
import React, { useState } from 'react';
import styles from './Login.module.css';
import { Facebook, Eye, EyeOff, Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });
    setIsLoading(true);

    try {
      const response = await axios.post('https://km0-api.vercel.app/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.log('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';

      if (errorMessage.includes('For input password')) {
        setErrors(prev => ({ ...prev, password: 'For input password' }));
      } else if (errorMessage.toLowerCase().includes('user not found') ||
        errorMessage.toLowerCase().includes('email not found') ||
        errorMessage.toLowerCase().includes('no user found')) {
        setErrors(prev => ({ ...prev, email: 'Invalid email' }));
      } else {
        setErrors(prev => ({ ...prev, general: errorMessage }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Link to='/'><img src="images/M.png" alt="Logo" className={styles.logo} /></Link>
        <h2 className={styles.title}>Log in</h2>
        <p className={styles.subtitle}>Don't have an account? <Link to='/signup'>Sign up</Link> </p>
        <button className={styles.socialBtn}>
          <Facebook size={20} style={{ marginRight: '8px' }} />
          Log in with Facebook
        </button>

        <button className={styles.socialBtn}>
          <FcGoogle size={20} style={{ marginRight: '8px' }} />
          Log in with Google
        </button>

        <div className={styles.separator}>OR</div>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Your email</label>
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
          {errors.general && <p className={styles.error} style={{ color: 'red' }}>{errors.general}</p>}
          <Link to='/signup' className={styles.forgot}>Forget your password</Link>

          <button type="submit" className={styles.loginBtn} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className={styles.spinner} size={20} />
                <span>Logging in...</span>
              </>
            ) : (
              'Log in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;