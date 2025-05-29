// LoginForm.jsx
import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { Facebook, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

import { Link } from 'react-router-dom';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]=useState('')
  const [username, setUsername]=useState('')
  const [password ,setPassword]=useState('')

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Link to='/'><img src="images/M.png" alt="Logo" className={styles.logo} /></Link>
        <h2 className={styles.title}>Sign up</h2>
        <p className={styles.subtitle}>Don't have an account? <Link to='/signup'>Log in</Link> </p>
        <h2>Welcome to KM 0</h2>
        <form action="">
             <label className={styles.label}>Email</label>
              <input type="email" className={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)} />
              <label className={styles.label}>Username</label>
              <input type="text" className={styles.input} value={username} onChange={(e)=>setUsername(e.target.value)} />
              <label className={styles.label}>Your password</label>
              <div className={styles.passwordWrapper}>
                <input type={showPassword ? 'text' : 'password'} className={styles.input}  value={password} onChange={(e)=>setPassword(e.target.value)} />
                <span onClick={() => setShowPassword(!showPassword)} className={styles.eyeIcon}>
                  {showPassword ?  <Eye size={16} />   :<EyeOff size={16} />}
                </span>
              </div>
              <input type="checkbox" name="" id="" />I want to receive emails about the product, feature updates, events, and marketing promotions.
              <button className={styles.loginBtn}>Create Account</button>
        </form>
       
      </div>
    </div>
  );
};

export default SignUp;