import React, { useState } from 'react'
import '../../styles/auth.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

  const navigate = useNavigate();

  const [role, setRole] = useState('user')
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

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user/register`, {
      fullName: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.password
    }, {
      withCredentials: true
    })

    navigate('/')
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-header">
          <h2>Create account</h2>
          <p className="muted"> Sign up to start enjoying BingeBites</p>
        </div>

        <div className="role-toggle">
          <button
            className={`role-btn ${role === 'user' ? 'active' : ''}`}
            onClick={() => {setRole('user'); navigate('/user/register')}}
            type="button"
          >
            User
          </button>
          <button
            className={`role-btn ${role === 'partner' ? 'active' : ''}`}
            onClick={() => {setRole('partner'); navigate('/food-partner/register')}}
            type="button"
          >
            Partner
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
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
        </form>
      </div>
    </div>
  )
}

export default UserRegister
