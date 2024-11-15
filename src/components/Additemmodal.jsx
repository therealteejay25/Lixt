import React, { useState } from 'react';
import closeIcon from '../assets/Feather/x.svg';

const Additemmodal = ({ isVisible, onClose, onSaveTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveTask = async () => {
    if (!taskTitle) return;
    setLoading(true);
    await onSaveTask(taskTitle);
    setTaskTitle('');
    setLoading(false);
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center ${isVisible ? 'block' : 'hidden'}`}>
      <div className="bg-white w-[90%] max-w-lg mx-auto p-6 rounded-lg shadow-lg">
        <div className='flex justify-between items-center'>
          <h3 className="text-lg font-semibold my-4">Add a New Task</h3>
          <button onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task title"
          className="w-full border border-gray-300 p-2 px-4 rounded-full mb-4 outline-none"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSaveTask}
            className="w-full lg:w-auto px-6 py-2 bg-dark text-white rounded-full"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Additemmodal;
