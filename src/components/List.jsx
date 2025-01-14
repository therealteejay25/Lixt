import React, { useState } from 'react';
import plusIcon from '../assets/Feather/plus-circle.svg';
import { db, auth } from '../firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Listitem from './Listitem';
import Additemmodal from './Additemmodal';

const List = ({ tasks, showCompleted }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addTask = async (taskText) => {
    try {
      await addDoc(collection(db, "tasks"), {
        text: taskText,
        completed: false,
        userId: auth.currentUser.uid,
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const completeTask = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      try {
        await updateDoc(taskRef, { completed: !task.completed });
      } catch (error) {
        console.error("Error updating task completion status:", error);
      }
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = async (taskId, newText) => {
    const taskRef = doc(db, "tasks", taskId);
    try {
      await updateDoc(taskRef, { text: newText });
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const filteredTasks = showCompleted ? tasks.filter(task => task.completed) : tasks;

  return (
    <div className="px-20 py-16 lg:p-5 h-full min-h-screen">
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

      <button 
        onClick={() => setIsModalVisible(true)} 
        className="mt-6 mx-auto px-8 items-center justify-center py-3 shadow-2xl flex bg-dark text-white rounded-full"
      >
        <img src={plusIcon} className="h-5 mr-2" alt="Add Task" />
        <p className="text-light">Create new task</p>
      </button>

      <Additemmodal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSaveTask={addTask}
      />
    </div>
  );
};

export default List;