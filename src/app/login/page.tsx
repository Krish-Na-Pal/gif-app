// pages/page.tsx
import React from 'react';
import Login from '../components/Login';

const Home: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-bold text-6xl font-mono mt-10'>gif-app</h1>
      <Login />
    </div>
  );
};

export default Home;
