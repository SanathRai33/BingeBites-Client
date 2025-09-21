import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../component/BottomNav';

const MainLayout = () => {
  const { pathname } = useLocation();

  // exact auth paths to hide the bottom nav
  const hideOn = [
    '/user/login',
    '/user/register',
    '/food-partner/login',
    '/food-partner/register'
  ];

  const hide = hideOn.includes(pathname);

  return (
    <>
      <Outlet />
      {!hide && <BottomNav />}
    </>
  );
};

export default MainLayout;