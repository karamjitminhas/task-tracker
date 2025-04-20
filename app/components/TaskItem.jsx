"use client";

import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const toggleCompleted = async () => {
    await updateDoc(doc(db, "tasks", task.id), {
      completed: !task.completed,
    });
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "tasks", task.id), {
      title: newTitle,
    });
    setIsEditing(false);
  };

  return (
    <li className="bg-zinc-800 px-4 py-2 rounded flex justify-between items-center">
      {isEditing ? (
        <form onSubmit={handleEdit} className="w-full flex space-x-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 bg-zinc-700 px-2 py-1 rounded text-white"
          />
          <button type="submit" className="bg-green-600 px-3 py-1 rounded text-sm">
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setNewTitle(task.title);
            }}
            className="bg-gray-500 px-3 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div
            onClick={toggleCompleted}
            className={`flex-1 cursor-pointer ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            <div>{task.title}</div>
            {task.dueDate && (
              <div className="text-xs text-zinc-400">Due: {task.dueDate}</div>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-400 text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-400 text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
