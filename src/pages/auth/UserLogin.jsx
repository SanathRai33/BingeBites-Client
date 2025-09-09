import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'                
import '../../styles/auth.css'

const UserLogin = () => {
  const navigate = useNavigate()

  const [role, setRole] = useState('user')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {

      await axios.post(
        'http://localhost:3000/api/auth/user/login',
        {
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      )

      navigate('/')
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message)
    }
  }

  const handleRoleChange = (newRole, path) => {
    setRole(newRole)
    navigate(path)
  }

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
            onClick={() => handleRoleChange('user', '/user/login')}
            type="button"
          >
            User
          </button>
          <button
            className={`role-btn ${role === 'partner' ? 'active' : ''}`}
            onClick={() => handleRoleChange('partner', '/food-partner/login')}
            type="button"
          >
            Partner
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="partner@business.com"
          />

          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          {role === 'user' && (
            <div className="row-between">
              <label className="checkbox">
                <input type="checkbox" /> Remember me
              </label>
              <a className="muted small" href="#">
                Forgot?
              </a>
            </div>
          )}

          <button className="btn-primary" type="submit">
            Sign in
          </button>

          <p className="auth-foot">
            New here?{' '}
            <a href='/user/register'>
              Create account
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default UserLogin
