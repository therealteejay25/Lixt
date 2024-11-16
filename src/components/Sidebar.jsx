import React from 'react';
import homeIcon from '../assets/Feather/home.svg';
import checkIcon from '../assets/Feather/check-circle.svg';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const Sidebar = ({ onShowCompleted, onShowAllTasks, totalTasks, completedTasks, isOpen, toggleSidebar, closeSidebar }) => {
  return (
    <div>
      {/* Sidebar Button for Mobile */}
      
      {/* Sidebar Container */}
      <div className={`bg-light z-50 md:h-[95vh] h-screen fixed lg:relative w-64 lg:w-72 p-4 lg:m-2 rounded-md transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className='flex p-4'>
          <img src={logo} className='h-7' alt="Lixt Logo" />
          <h1 className='text-dark text-2xl px-1 font-bold'>Lixt</h1>
        </div>
        <div>
          <button 
            className='flex justify-between hover:bg-grey focus:bg-grey transition py-[6px] px-4 rounded-md m-2'
            onClick={() => { onShowAllTasks(); closeSidebar(); }}
          >
            <div className='flex'>
              <img src={homeIcon} className='w-10 py-2 h-10' alt="Home" />
              <p className='font-medium text-[19px] pt-2'>Home</p>
            </div>
            <span className='py-[2px] px-[10px] border border-grey rounded-full h-7 m-2 bg-light'>{totalTasks}</span>
          </button>
          
          <button 
            onClick={() => { onShowCompleted(true); closeSidebar(); }} 
            className='flex justify-between hover:bg-grey focus:bg-grey transition py-[6px] px-4 rounded-md m-2'
          >
            <div className='flex'>
              <img src={checkIcon} className='w-10 py-2 pr-[5px] h-10' alt="Completed" />
              <p className='font-medium text-[19px] pt-2'>Completed</p>
            </div>
            <span className='py-[2px] px-[10px] border border-grey rounded-full h-7 m-2 bg-light'>{completedTasks}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
