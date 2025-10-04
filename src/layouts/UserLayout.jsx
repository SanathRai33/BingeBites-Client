import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../component/BottomNav';
import { useSelector } from 'react-redux';

const UserLayout = () => {
  const { pathname } = useLocation();

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

export default UserLayout;