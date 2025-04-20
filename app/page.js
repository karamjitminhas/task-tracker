"use client";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundColor: "rgba(0,0,0,0.85)",
        backgroundBlendMode: "overlay",
      }}
    >
      {user && (
        <div className="absolute top-4 left-4 text-sm text-white space-y-2">
          <p>Welcome, {user.displayName || user.email?.split("@")[0] || "User"}</p>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Sign Out
          </button>
        </div>
      )}

      <div className="flex justify-center items-center min-h-screen">
        <div className="p-8 max-w-xl w-full bg-black/60 rounded-lg">
          <img src="/logo.png" alt="Task Tracker" className="mx-auto h-32 mb-6" />
          {user ? (
            <>
              <AddTask />
              <TaskList />
            </>
          ) : (
            <p>
              Please{" "}
              <a href="/login" className="text-blue-500 underline">
                sign in
              </a>{" "}
              first.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
