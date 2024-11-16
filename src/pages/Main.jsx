import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from "../firebase";
import { collection, onSnapshot, query, where } from "../firebase";
import Sidebar from '../components/Sidebar';
import List from '../components/List';
import logo from '../assets/logo.svg';
import menuIcon from '../assets/Feather/menu.svg';

const Main = () => {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening');
  }, []);

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("userId", "==", auth.currentUser?.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const handleShowAllTasks = () => {
    setShowCompleted(false);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-grey flex flex-col lg:flex-row min-h-screen max-w-screen">
      {/* Sidebar */}
      <Sidebar 
        onShowCompleted={setShowCompleted} 
        onShowAllTasks={handleShowAllTasks}
        totalTasks={totalTasks} 
        completedTasks={completedTasks} 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="relative flex flex-col w-full lg:pl-64 px-4 lg:px-16 py-4">
        {/* Logo and Sidebar Toggle */}
        <div className="flex items-center justify-between lg:hidden fixed top-0 left-0 w-full p-4 bg-white shadow z-10">
          <div className="flex items-center space-x-2">
            <img src={logo} className="h-6" alt="Logo" />
            <h1 className="text-dark text-xl py-[2px] font-bold">Lixt</h1>
          </div>
          <button onClick={toggleSidebar} className="text-dark focus:outline-none px-3">
            <span className="material-icons"><img src={menuIcon} alt="" /></span>
          </button>
        </div>

        {/* Greeting & Profile */}
        <div className="flex items-center ml-3 bg-light/75 w-60 lg:w-40 p-2 h-14 rounded-md mb-4 mt-[4.5rem] lg:mt-0">
          <img src={user?.photoURL} className="w-9 h-9 rounded-md object-cover" alt="User Profile" />
          <div className="justify-center items-center px-1">
            <p className="text-gray text-sm">{greeting},</p>
            <h4 className="text-dark font-medium -translate-y-1">{user?.displayName}</h4>
          </div>
        </div>

        {/* Task List */}
        <List tasks={tasks} showCompleted={showCompleted} />
      </div>
    </div>
  );
};

export default Main;
