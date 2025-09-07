import React, { useState } from 'react'
import '../styles/auth.css'

const FoodPartnerRegister = () => {
  const [role, setRole] = useState('partner')

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-header">
          <h2>Partner sign up</h2>
          <p className="muted">Grow your business with our platform.</p>
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
            Food partner
          </button>
        </div>

        <div className="form">
          <div className="form-field">
            <label className="form-label">Business name</label>
            <input className="form-input" placeholder="Tasty Bites" />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Contact name</label>
              <input className="form-input" placeholder="Jane Doe" />
            </div>

            <div className="form-field">
              <label className="form-label">Phone</label>
              <input className="form-input" placeholder="+1 555 123 4567" />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="business@example.com" />
          </div>

          <div className="form-field">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Create password" />
          </div>

          <div className="form-field">
            <label className="form-label">Address</label>
            <input className="form-input" placeholder="123 Market Street" />
            <p className="helper">Full address helps customers find you faster</p>
          </div>



          <div className="divider" />

          <button className="btn-primary" type="button">Create Partner Account</button>

          <p className="auth-foot">Already a partner? <a href="/food-partner/login">Sign in</a></p>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
