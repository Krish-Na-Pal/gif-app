"use client"; // This is a client component 👈🏽

// components/Signup.tsx
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Signup successful, you can redirect the user or perform other actions
      toast.success("SignUp Successfull, Login GIF-APP");
      router.push('/')
    } catch (error) {
      toast.error("Enter valid Email and password\n [ >=6 characters ]...");
    }
  };

  return (
    <div className='grid gap-2 justify-items-center mt-20 bg-slate-800 p-4 rounded-md shadow-md shadow-slate-950'>
      <h2 className='font-bold text-lg  font-mono pt-5 pb-5'>Sign Up</h2>
      <form className='grid gap-2 w-full  pb-5'>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            className='text-black p-3 rounded-sm font-mono text-center'
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className='text-black p-3 rounded-sm font-mono text-center'
          />
        <button 
          type="button" 
          onClick={handleSignup}
          className='bg-slate-600 hover:bg-slate-950 p-3 rounded-md font-bold font-mono text-lg'
        >
          Sign Up
        </button>
      </form>
      <p className='bold text-sm m-3 font-mono'>Already have account? <Link href='/login' className='text-md font-bold underline'>Login</Link></p>
    </div>
  );
};

export default Signup;
