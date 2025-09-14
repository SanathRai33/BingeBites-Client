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
import More from '../pages/general/More'
import Terms from '../pages/general/Terms'
import HelpCenter from '../pages/general/HelpCenter'
import LikedVideo from '../pages/general/LikedVideo'
import SavedVideo from '../pages/general/SavedVideo'
import NotFound from '../pages/general/NotFound'

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
            <Route path='/user/liked' element={<LikedVideo/>}/>
            <Route path='/user/saved' element={<SavedVideo/>}/>
            <Route path='/user/more' element={<More/>}/>
            <Route path='/terms' element={<Terms/>}/>
            <Route path='/user/help' element={<HelpCenter/>}/>
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

export default AppRoutes