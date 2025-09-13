import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import PartnerHome from '../foodPartners/PartnerHome'
import Home from '../pages/general/Home'
import Profile from '../foodPartners/Profile'
import CreateFood from '../foodPartners/CreateFood'
import Collection from '../pages/general/Collections'
import More from '../pages/general/More'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
            <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
            <Route path='/' element={<Home/>}/>
            <Route path='/foodPartner' element={<PartnerHome/>}/>
            <Route path='/food-partner/:id' element={<Profile/>}/>
            <Route path='/food-partner/create-food' element={<CreateFood/>}/>
            <Route path='/user/collection' element={<Collection/>}/>
            <Route path='/user/more' element={<More/>}/>
        </Routes>
    )
}

export default AppRoutes
4