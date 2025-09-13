import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/auth.css'

const FoodPartnerRegister = () => {
  const navigate = useNavigate()

  const [role, setRole] = useState('partner')
  
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    password: '',
    address: ''
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
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/foodPartner/register`,
        {
          name: formData.businessName,
          contactName: formData.contactName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          address: formData.address
        },
        { withCredentials: true }
      )

      console.log(res.data) // optional: to see response
      navigate('/foodPartner')
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message)
    }
  }

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
          Food partner
        </button>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Business name</label>
          <input
            className="form-input"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Tasty Bites"
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label">Contact name</label>
            <input
              className="form-input"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Jane Doe"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 555 123 4567"
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="business@example.com"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Address</label>
          <input
            className="form-input"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Market Street"
          />
          <p className="helper">Full address helps customers find you faster</p>
        </div>

        <div className="divider" />

        <button className="btn-primary" type="submit">
          Create Partner Account
        </button>

        <p className="auth-foot">
          Already a partner? <a href="/food-partner/login">Sign in</a>
        </p>
      </form>
    </div>
    </div >
  )
}

export default FoodPartnerRegister
