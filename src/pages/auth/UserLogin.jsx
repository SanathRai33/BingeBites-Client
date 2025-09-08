import React, { useState } from 'react'
import '../../styles/auth.css'

const UserLogin = () => {
  const [role, setRole] = useState('user')

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p className="muted">Sign in to continue to BingeBites</p>
        </div>
        
        <div className="role-toggle">
          <button
            className={`role-btn ${role === 'user' ? 'active' : ''}`}
            onClick={() => {setRole('user'); navigate('/user/login')}}
            type="button"
          >
            User
          </button>
          <button
            className={`role-btn ${role === 'partner' ? 'active' : ''}`}
            onClick={() => {setRole('partner'); navigate('/food-partner/login')}}
            type="button"
          >
            Partner
          </button>
        </div>

        <div className="form">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder='partner@business.com' />

          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" />

          {role === 'user' && (
            <div className="row-between">
              <label className="checkbox">
                <input type="checkbox" /> Remember me
              </label>
              <a className="muted small" href="#">Forgot?</a>
            </div>
          )}

          <button className="btn-primary" type="button">Sign in</button>

          <p className="auth-foot">New here? <a href='/user/register'>Create account</a></p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
