// pages/page.tsx
import React from 'react';
import Signup from '../components/Signup';

const Home: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-bold text-6xl font-mono mt-10'>gif-app</h1>
      <Signup />
    </div>
  );
};

export default Home;
