import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import PartnerHome from '../foodPartners/PartnerHome'
import Home from '../pages/general/Home'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
            <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
            <Route path='/' element={<Home/>}/>
            <Route path='/foodPartner' element={<PartnerHome/>}/>
        </Routes>
    )
}

export default AppRoutes
4