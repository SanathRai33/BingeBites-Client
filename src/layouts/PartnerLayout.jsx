import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BottomNav from '../component/partner/BottomNav';

const PartnerLayout = () => {
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

export default PartnerLayout;