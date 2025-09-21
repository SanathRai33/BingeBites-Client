import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/UserProfile.css'

export default function UserProfile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', address: '' })
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, { withCredentials: true })
      .then((res) => {
        if (!mounted) return
        console.log(res)
        setUser(res.data?.user)
        setForm({
          fullName: res.data?.user?.fullName || '',
          phone: res.data?.user?.phone || '',
          email: res.data?.user?.email || '',
          address: res.data?.user?.address || ''
        })
      })
      .catch((err) => {
        if (err.response?.status === 401) {
            navigate('/user/login')
        } else {
          setError('Failed to load profile')
          console.error(err)
        }
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
        { fullName: form.fullName, phone: form.phone, address: form.address },
        { withCredentials: true }
      )
      setUser(res.data?.user)
      setEditing(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user/logout`, {}, { withCredentials: true })
    } catch (err) {
      console.error(err)
    }
    navigate('/user/login')
  }

  if (loading) {
    return (
      <div className="profile-root">
        <div className="profile-card">
          <div className="skeleton avatar" />
          <div className="skeleton line short" />
          <div className="skeleton line" />
          <div className="skeleton line" />
        </div>
      </div>
    )
  }

  return (
    <div className="profile-root">
      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar-wrap">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'}
              alt={user?.fullName || 'User avatar'}
              className="avatar"
            />
          </div>
          <div className="profile-info">
            <h3 className="name">{user?.fullName || 'No fullName'}</h3>
            <p className="muted small">{user?.email}</p>
            <p className="muted tiny">{user?.phone}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-outline" onClick={() => setEditing((s) => !s)}>
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
          <button className="btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {!editing && (
          <div className="profile-details">
            {/* <h4>About</h4>
            <p className="detail-item">{user?.address || 'No address provided'}</p> */}

            <h4>Preferences</h4>
            <div className="prefs">
              <div className="pref">Order History: <span className="muted">{user?.ordersCount ?? 0}</span></div>
              <div className="pref">Saved Places: <span className="muted">{user?.savedPlaces ?? 0}</span></div>
            </div>
          </div>
        )}

        {editing && (
          <form className="profile-form" onSubmit={handleSave}>
            {error && <div className="error">{error}</div>}

            <label className="form-label">Name</label>
            <input className="form-input" name="fullName" value={form.fullName} onChange={handleChange} />

            <label className="form-label">Phone</label>
            <input className="form-input" name="phone" value={form.phone} onChange={handleChange} />

            <label className="form-label">Email (readonly)</label>
            <input className="form-input" name="email" value={form.email} readOnly />

            <label className="form-label">Address</label>
            <input className="form-input" name="address" value={form.address} onChange={handleChange} />

            <div className="form-row">
              <button className="btn-primary" type="submit">
                Save changes
              </button>
              <button type="button" className="btn-outline" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
