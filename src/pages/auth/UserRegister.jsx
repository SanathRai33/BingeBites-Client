import React, { useState } from 'react'
import '../../styles/auth.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

  const navigate = useNavigate();

  const [role, setRole] = useState('user');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await axios.post(`http://localhost:3000/api/auth/user/register`, {
      fullName: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.password
    }, {
      withCredentials: true
    })

    navigate('/')

    console.log("Response", res.data)
  }

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

        <form className="form" onSubmit={handleSubmit}>
          {role === 'user' ? (
            <>
              <div className="form-row">
                <div>
                  <label className="form-label">First name</label>
                  <input
                    name="firstName"
                    className="form-input"
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Last name</label>
                  <input
                    name="lastName"
                    className="form-input"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label className="form-label">Email</label>
              <input
                name="email"
                className="form-input"
                type="email"
                placeholder="you@domain.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label className="form-label">Password</label>
              <input
                name="password"
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button className="btn-primary" type="submit">Create account</button>

              <p className="auth-foot">Already have an account? <a href="/user/login">Sign in</a></p>
            </>
          ) : (
            <>
              <label className="form-label">Business name</label>
              <input
                name="businessName"
                className="form-input"
                placeholder="Tasty Bites"
                value={formData.businessName}
                onChange={handleChange}
                required
              />

              <label className="form-label">Contact email</label>
              <input
                name="contactEmail"
                className="form-input"
                type="email"
                placeholder="partner@business.com"
                value={formData.contactEmail}
                onChange={handleChange}
                required
              />

              <label className="form-label">Password</label>
              <input
                name="partnerPassword"
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={formData.partnerPassword}
                onChange={handleChange}
                required
              />

              <button className="btn-primary" type="submit">Create partner account</button>

              <p className="auth-foot">Already a partner? <a href="/food-partner/login">Sign in</a></p>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default UserRegister
