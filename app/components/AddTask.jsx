"use client";

import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addDoc(collection(db, "tasks"), {
      title,
      dueDate,
      createdAt: serverTimestamp(),
      completed: false,
    });

    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a task"
        className="px-4 py-2 border rounded w-full bg-zinc-700 text-white"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="px-4 py-2 border rounded w-full bg-zinc-700 text-white"
      />
      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded w-full">
        Add Task
      </button>
    </form>
  );
}
