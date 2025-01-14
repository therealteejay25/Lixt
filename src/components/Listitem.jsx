import React, { useState } from 'react';
import trashIcon from '../assets/Feather/trash-2.svg';
import editIcon from '../assets/Feather/edit.svg';

const Listitem = ({ task, onComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    onEdit(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between bg-light transition shadow my-2 mx-5 w-72 lg:w-[40rem] rounded p-3 px-3">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onComplete}
          className="custom-checkbox p-2 m-1 mt-[6.2px] appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-black cursor-pointer"
          style={{ padding: '0.5rem' }}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="text-gray font-medium mx-1 bg-transparent border-b border-gray-400 outline-none"
            onBlur={handleSaveEdit}
            autoFocus
          />
        ) : (
          <p
            className={`text-gray font-medium mx-1 cursor-pointer ${task.completed ? 'line-through' : ''}`}
            onDoubleClick={handleEditToggle}
          >
            {task.text}
          </p>
        )}
      </div>
      <div className="flex p-2 space-x-2">
        <img
          src={editIcon}
          onClick={handleEditToggle}
          className="h-[18px] cursor-pointer"
          alt="Edit"
        />
        <img
          src={trashIcon}
          onClick={onDelete}
          className="h-[18px] cursor-pointer"
          alt="Delete"
        />
      </div>
    </div>
  );
};

export default Listitem;
