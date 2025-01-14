import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import google from '../assets/googleicon.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "../firebase";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      console.log("User signed in");
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      return error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen bg-gray-100'>
      <div className="bg-blue/10 h-screen flex flex-col justify-center items-center">
        <div className='flex'>
          <img src={logo} className='h-7' alt="Lixt Logo" />
          <h1 className='text-dark text-2xl px-1 font-bold'>Lixt</h1>
        </div>
        <div className='text-center py-20 max-w-md mx-auto'>
          <h2 className='text-dark text-3xl md:text-4xl leading-normal font-semibold'>
            Think, <span className='text-blue'>Plan</span>, and Track <br /> <span className='text-neutral-900'>all in one place.</span>
          </h2>
          <p className='text-sm md:text-base py-3 text-dark'>
            Efficiently manage your tasks and boost productivity.
          </p>
          <button
            onClick={handleGoogleSignIn}
            className={`bg-transparent ring-1 ring-offset-blue text-white flex items-center justify-center rounded-full py-3 px-10 mx-auto mt-10 ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            <img className='h-5 mr-2 mb-1' src={google} alt="Google Icon" />
            <p className='text-blue font-semibold py-1'>Continue with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
