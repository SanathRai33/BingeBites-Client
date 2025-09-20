import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../component/BottomNav';
import { useSelector } from 'react-redux';

const MainLayout = () => {
  const { pathname } = useLocation();

  const user = useSelector((state) => state.auth.user);

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
      {!hide && <BottomNav user={user} />}
    </>
  );
};

export default MainLayout;