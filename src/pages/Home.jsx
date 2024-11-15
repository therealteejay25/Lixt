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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='home h-screen bg-gray-100'>
      <div className="bg-gray-50 h-screen flex flex-col justify-center items-center">
        <div className='flex p-4'>
          <img src={logo} className='h-7' alt="Lixt Logo" />
          <h1 className='text-dark text-2xl px-1 font-bold'>Lixt</h1>
        </div>
        <div className='text-center py-20 px-4 max-w-sm mx-auto'>
          <h2 className='text-dark text-3xl md:text-4xl font-semibold'>
            Think, Plan, and Track <br /> <span className='text-grey'>all in one place.</span>
          </h2>
          <p className='text-sm md:text-base py-3 text-dark'>
            Efficiently manage your tasks and boost productivity.
          </p>
          <button
            onClick={handleGoogleSignIn}
            className={`bg-blue text-white flex items-center justify-center rounded-full py-3 px-10 mx-auto mt-5 ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            <img className='h-5 mr-2' src={google} alt="Google Icon" />
            <p>Continue with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
