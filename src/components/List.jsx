import React, { useState } from 'react';
import plusIcon from '../assets/Feather/plus-circle.svg';
import { db, auth } from '../firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from "../firebase";
import Listitem from './Listitem';
import Additemmodal from './Additemmodal';

const List = ({ tasks, showCompleted }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addTask = async (taskText) => {
    await addDoc(collection(db, "tasks"), {
      text: taskText,
      completed: false,
      userId: auth.currentUser.uid,
    });
  };

  const completeTask = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    const task = tasks.find(t => t.id === taskId);
    await updateDoc(taskRef, { completed: !task.completed });
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
  };

  const editTask = async (taskId, newText) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { text: newText });
  };

  const filteredTasks = showCompleted ? tasks.filter(task => task.completed) : tasks;

  return (
    <div className="px-20  py-16 lg:p-5 h-full min-h-screen">
      {/* Task List Container */}
      <div className="flex flex-col items-center space-y-4 px-20 lg:mx-auto lg:max-w-3xl">
        {filteredTasks.map(task => (
          <Listitem
            key={task.id}
            task={task}
            onComplete={() => completeTask(task.id)}
            onDelete={() => deleteTask(task.id)}
            onEdit={editTask}
          />
        ))}
      </div>

      {/* "Create New Task" Button */}
      <button 
        onClick={() => setIsModalVisible(true)} 
        className="mt-6 w-96 lg:w-64 mx-auto py-3 fixed lg:top-[40rem] top-[50rem] left-4 lg:left-[50rem] shadow-2xl px-2 flex items-center justify-center bg-dark text-white rounded-full"
      >
        <img src={plusIcon} className="h-5 mr-2" alt="Add Task" />
        <p className="text-light">Create new task</p>
      </button>

      {/* Add Task Modal */}
      <Additemmodal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSaveTask={addTask}
      />
    </div>
  );
};

export default List;
