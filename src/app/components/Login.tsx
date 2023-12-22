"use client"; // This is a client component 👈🏽

// components/Login.tsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();


  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, you can redirect the user or perform other actions
      router.push('/');
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className='grid gap-2 justify-items-center'>
      <h2 className='font-bold text-lg mt-40 font-mono'>Login</h2>
      <form className='grid gap-2'>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            className='text-black p-2 rounded-sm font-mono text-center'
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className='text-black p-2 rounded-sm font-mono text-center'
          />
        <button 
          type="button" 
          onClick={handleLogin}
          className='bg-slate-900 p-3 rounded-sm font-bold font-mono text-lg'
        >
          Login
        </button>
      </form>
      <p className='bold text-sm m-3 font-mono'>Don't have account? <Link href='/signup' className='text-md font-bold underline'>SignUp</Link></p>
    </div>
  );
};

export default Login;
