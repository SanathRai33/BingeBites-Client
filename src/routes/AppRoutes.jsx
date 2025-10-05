// ...existing code...
import React from 'react'
import { Routes, Route } from 'react-router-dom'
//Layout 
import UserLayout from '../layouts/UserLayout';
import PartnerLayout from '../layouts/PartnerLayout';

//Authention
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'

//Pages
import PartnerHome from '../pages/foodPartners/PartnerHome'
import PartnerOrder from '../pages/foodPartners/Order'
import Profile from '../pages/foodPartners/Profile'
import CreateFood from '../pages/foodPartners/CreateFood'
import Home from '../pages/user/Home'
import More from '../pages/user/More'
import Terms from '../pages/user/Terms'
import HelpCenter from '../pages/user/HelpCenter'
import LikedVideo from '../pages/user/LikedVideo'
import SavedVideo from '../pages/user/SavedVideo'
import NotFound from '../pages/user/NotFound'
import UserProfile from '../pages/user/UserProfile'
import Order from '../pages/user/Order'

const AppRoutes = () => {
    return (
        <Routes>
            {/* Authention */}
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
            <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

            {/* Partner profile */}
            <Route element={<PartnerLayout/>}>
                <Route path='/foodPartner' element={<PartnerHome />} />
                <Route path='/food-partner/create-food' element={<CreateFood />} />
                <Route path='/food-partner/orders' element={<PartnerOrder />} />
            </Route>

            {/* User profile */}
            <Route element={<UserLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/food-partner/:id' element={<Profile />} />
                <Route path='/user/profile/:id' element={<UserProfile />} />
                <Route path='/user/liked' element={<LikedVideo />} />
                <Route path='/user/saved' element={<SavedVideo />} />
                <Route path='/user/more' element={<More />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/user/help' element={<HelpCenter />} />
                <Route path='/user/order/:id' element={<Order />} />
            </Route>

            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
// ...existing code...