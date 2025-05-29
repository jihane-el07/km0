// LoginForm.jsx
import React, { useState } from 'react';
import styles from './Login.module.css';
import { Facebook, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
        <form action="">
             <label className={styles.label}>Your email</label>
              <input type="email" className={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)} />
              <label className={styles.label}>Your password</label>
              <div className={styles.passwordWrapper}>
                <input type={showPassword ? 'text' : 'password'} className={styles.input}  value={password} onChange={(e)=>setPassword(e.target.value)} />
                <span onClick={() => setShowPassword(!showPassword)} className={styles.eyeIcon}>
                  {showPassword ?  <Eye size={16} />   :<EyeOff size={16} />}
                </span>
              </div>

              <Link to='/signup' className={styles.forgot}>Forget your password</Link>

              <button className={styles.loginBtn}>Log in</button>
        </form>
       
      </div>
    </div>
  );
};

export default Login;