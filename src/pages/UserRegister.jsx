import React, { useState } from 'react'
import '../styles/auth.css'

const UserRegister = () => {
  const [role, setRole] = useState('user')

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        
        <div className="auth-header">
          <h2>{role === 'user' ? 'Create account' : 'Partner sign up'}</h2>
          <p className="muted">
            {role === 'user'
              ? 'Sign up to start enjoying BingeBites'
              : 'Create a partner account to list your food'}
          </p>
        </div>

        <div className="role-toggle">
          <button
            className={`role-btn ${role === 'user' ? 'active' : ''}`}
            onClick={() => setRole('user')}
            type="button"
          >
            User
          </button>
          <button
            className={`role-btn ${role === 'partner' ? 'active' : ''}`}
            onClick={() => setRole('partner')}
            type="button"
          >
            Partner
          </button>
        </div>

        <div className="form">
          {role === 'user' ? (
            <>
              <label className="form-label">Full name</label>
              <input className="form-input" placeholder="Jane Doe" />

              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="you@domain.com" />

              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••" />

              <button className="btn-primary" type="button">Create account</button>

              <p className="auth-foot">Already have an account? <a href="/user/login">Sign in</a></p>
            </>
          ) : (
            <>
              <label className="form-label">Business name</label>
              <input className="form-input" placeholder="Tasty Bites" />

              <label className="form-label">Contact email</label>
              <input className="form-input" type="email" placeholder="partner@business.com" />

              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••" />

              <button className="btn-primary" type="button">Create partner account</button>

              <p className="auth-foot">Already a partner? <a href="/food-partner/login">Sign in</a></p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserRegister
