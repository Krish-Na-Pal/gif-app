// pages/page.tsx
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <Signup />
      {/* <Login /> */}
    </div>
  );
};

export default Home;
