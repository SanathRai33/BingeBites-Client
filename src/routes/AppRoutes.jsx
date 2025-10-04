// ...existing code...
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import PartnerHome from '../pages/foodPartners/PartnerHome'
import Home from '../pages/user/Home'
import Profile from '../pages/foodPartners/Profile'
import CreateFood from '../pages/foodPartners/CreateFood'
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
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
            <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

            <Route element={<MainLayout />}>
                <Route path='/' element={<Home/>}/>
                <Route path='/foodPartner' element={<PartnerHome/>}/>
                <Route path='/food-partner/:id' element={<Profile/>}/>
                <Route path='/user/profile/:id' element={<UserProfile/>}/>
                <Route path='/food-partner/create-food' element={<CreateFood/>}/>
                <Route path='/user/liked' element={<LikedVideo/>}/>
                <Route path='/user/saved' element={<SavedVideo/>}/>
                <Route path='/user/more' element={<More/>}/>
                <Route path='/terms' element={<Terms/>}/>
                <Route path='/user/help' element={<HelpCenter/>}/>
                <Route path='/user/order/:id' element={<Order/>} />
            </Route>

            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

export default AppRoutes
// ...existing code...