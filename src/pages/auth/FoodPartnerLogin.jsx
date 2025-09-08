import React, { useState } from 'react'
import '../../styles/auth.css'

const FoodPartnerLogin = () => {
  const [role, setRole] = useState('partner')

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-header">
          <h2>Partner sign in</h2>
          <p className="muted">Access your partner dashboard</p>
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

          <button className="btn-primary" type="button">Sign in</button>

          <p className="auth-foot">New here? <a href='/food-partner/register'>Create account</a></p>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
