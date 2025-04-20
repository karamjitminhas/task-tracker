"use client";

import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleSignIn}
        className="bg-black text-white px-6 py-3 rounded hover:bg-zinc-800"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
