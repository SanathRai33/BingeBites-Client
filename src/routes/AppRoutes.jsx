import React from 'react'
import { Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/user/register" element={<h1>User register</h1>} />
            <Route path="/user/login" element={<h1>User login</h1>} />
            <Route path="/food-partner/register" element={<h1>Food register</h1>} />
            <Route path="/food-partner/login" element={<h1>Food login</h1>} />
        </Routes>
    )
}

export default AppRoutes
