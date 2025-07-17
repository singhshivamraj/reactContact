
import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import LoginCard from "../Logincard/Logincard";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = async () => {
    try {
      const contactsRef = collection(db, "contacts");
      const snapshot = await getDocs(contactsRef);
      const contactsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const user = contactsList.find(
        (c) => c.name === name && c.password === password
      );

      if (user) {
        setIsLoggedIn(true);
        setLoggedInUser(user);
      } else {
        toast.error("Name or Password incorrect!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setLoggedInUser(updatedUser);
  };

 
  const handleDeleteUser = () => {
    try {
      toast.success("Contact deleted successfully!");

      setTimeout(() => {
        setLoggedInUser(null);
        setIsLoggedIn(false);
      }, 1500);
    } catch (error) {
      toast.error("Failed to delete contact!");
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10">
        {!isLoggedIn ? (
          <div className="bg-white/20 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto text-gray-800 space-y-5">
            <h2 className="text-2xl font-bold text-center text-orange-600">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 text-center -mt-3 mb-3">
              Please login to continue
            </p>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/50 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/50 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition-all duration-300 shadow-md"
            >
              Login
            </button>
          </div>
        ) : loggedInUser ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">
               Welcome {loggedInUser.name}! 
            </h1>

            <div className="flex justify-center mt-6">
              <LoginCard
                key={loggedInUser.id}
                contact={loggedInUser}
                onUpdate={handleUpdateUser}
                onDelete={handleDeleteUser}
              />
            </div>
          </div>
        ) : (
          <h2 className="text-red-500 text-lg">Your account is deleted!</h2>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default Login;
