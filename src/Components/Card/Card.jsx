
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { db } from "../../config/firebase";
import { ToastContainer, toast } from "react-toastify";

function Card({ contact, showActions = false, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [editData, setEditData] = useState({
    name: contact.name,
    email: contact.email,
    number: contact.number,
    password: contact.password,
  });

  const deleteContact = async (id) => {
    try {
      setIsDeleting(true);
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully!");
      setTimeout(() => {
        if (onDelete) onDelete();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete contact!");
    }
  };

  const handleEditSave = async () => {
    try {
      const contactRef = doc(db, "contacts", contact.id);
      await updateDoc(contactRef, { ...editData });
      toast.success("Contact updated successfully!");
      setIsEditing(false);
      if (onUpdate) onUpdate({ ...contact, ...editData });
    } catch (error) {
      console.log(error);
      toast.error("Failed to update contact!");
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className={`bg-white/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg 
        flex justify-between items-start transition-all duration-300 hover:shadow-2xl 
        ${isDeleting ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
      >
        {/* Left: Icon + Info */}
        <div className="flex gap-5 items-start w-full">
          <HiOutlineUserCircle className="text-orange-500 text-6xl flex-shrink-0" />

          <div className="space-y-2 w-full">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="border rounded p-2 w-full text-sm"
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="border rounded p-2 w-full text-sm"
                />
                <input
                  type="text"
                  value={editData.number}
                  onChange={(e) =>
                    setEditData({ ...editData, number: e.target.value })
                  }
                  className="border rounded p-2 w-full text-sm"
                />
                <input
                  type="text"
                  value={editData.password}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
                  className="border rounded p-2 w-full text-sm"
                />

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={handleEditSave}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold text-gray-900">
                  {contact.name}
                </h2>
                <p className="text-sm text-gray-700">
                  <strong>Email:</strong> {contact.email}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Contact:</strong> +91 {contact.number}
                </p>

                <div className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="min-w-[150px]">
                    <strong>Password:</strong>{" "}
                    {showPassword ? contact.password : "••••••••"}
                  </span>
                  {showPassword ? (
                    <FaEyeSlash
                      className="text-gray-500 cursor-pointer hover:text-orange-500 transition"
                      onClick={() => setShowPassword(false)}
                      title="Hide Password"
                    />
                  ) : (
                    <FaEye
                      className="text-gray-500 cursor-pointer hover:text-orange-500 transition"
                      onClick={() => setShowPassword(true)}
                      title="Show Password"
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col items-center gap-4 ml-5 relative">
          {showActions && !isEditing ? (
            <>
              {/*  Edit Button */}
              <div className="relative group">
                <RiEditCircleLine
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600 transition"
                />
                <span
                  className="
                    absolute 
                    right-full mr-2 top-1/2 -translate-y-1/2
                    bg-gray-900 text-white text-xs font-medium
                    px-3 py-1 rounded-lg shadow-md
                    opacity-0 scale-90 
                    group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-out
                    whitespace-nowrap
                    z-50
                  "
                >
                  Edit Contact
                </span>
              </div>

              {/*  Delete Button */}
              <div className="relative group">
                <IoMdTrash
                  onClick={() => deleteContact(contact.id)}
                  className="text-red-500 text-2xl cursor-pointer hover:text-red-600 transition"
                />
                <span
                  className="
                    absolute 
                    right-full mr-2 top-1/2 -translate-y-1/2
                    bg-gray-800 text-white text-xs font-medium
                    px-3 py-1 rounded-lg shadow-md
                    opacity-0 scale-90 
                    group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-out
                    whitespace-nowrap
                    z-50
                  "
                >
                  Delete Contact
                </span>
              </div>
            </>
          ) : (
            <>
              {/*  Disabled Edit */}
              <div className="relative group">
                <RiEditCircleLine className="text-blue-600 text-2xl opacity-100 cursor-not-allowed hover:text-blue-600 hover:opacity-60 transition" />
                <span
                  className="
                    absolute 
                    right-full mr-2 top-1/2 -translate-y-1/2
                    bg-orange-600 text-white text-xs font-medium
                    px-4 py-2 rounded-lg shadow-md
                    opacity-0 scale-90 
                    group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-out
                    whitespace-nowrap
                    z-50
                  "
                >
                  Editing after login
                </span>
              </div>

              {/*  Disabled Delete */}
              <div className="relative group">
                <IoMdTrash className="text-orange-500 text-2xl opacity-100 cursor-not-allowed hover:text-orange-500 hover:opacity-60 transition" />
                <span
                  className="
                    absolute 
                    right-full mr-2 top-1/2 -translate-y-1/2
                    bg-orange-500 text-white text-xs font-medium
                    px-4 py-2 rounded-lg shadow-md
                    opacity-0 scale-90 
                    group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-out
                    whitespace-nowrap
                    z-50
                  "
                >
                  Delete after login
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default Card;














