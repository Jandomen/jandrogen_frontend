import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeHeader from '../components/shop/HomeHeader';
import HomeFooter from '../components/shop/HomeFooter';

const ShopLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f4] text-[#333]">
      <HomeHeader />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <HomeFooter />
    </div>
  );
};

export default ShopLayout;