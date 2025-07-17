
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi";
import React, { useState } from "react";
import { db } from "../../config/firebase";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function LoginCard({ contact, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: contact.name,
    email: contact.email,
    number: contact.number,
    password: contact.password,
  });

  //  Update Contact
  const handleSave = async () => {
    try {
      const contactRef = doc(db, "contacts", contact.id);
      await updateDoc(contactRef, { ...editData });

      toast.success("Contact updated successfully!");
      onUpdate({ ...contact, ...editData });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update contact!");
    }
  };

  // Delete Contact
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "contacts", contact.id));
      onDelete();
    //   toast.success("Contact deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete contact!");
    }
  };

  return (
    <div className="relative w-[300px] min-h-[330px] p-[7px] rounded-2xl bg-gradient-to-r from-yellow-400 to-red-500 shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Glow Effect */}
      <div className="absolute top-6 left-0 right-0 z-0 w-full h-full scale-90 blur-2xl opacity-70 bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl"></div>

      {/* Card Content */}
      <div className="relative bg-white rounded-xl p-6 flex flex-col items-center text-center z-10 shadow-md">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center shadow-inner mb-4">
          <HiOutlineUserCircle className="text-orange-500 text-6xl" />
        </div>

        {/* Content */}
        {isEditing ? (
          <div className="w-full space-y-3">
            <input
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              placeholder="Full Name"
              className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
            <input
              type="email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
            <input
              type="text"
              value={editData.number}
              onChange={(e) =>
                setEditData({ ...editData, number: e.target.value })
              }
              placeholder="Phone Number"
              className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
            <input
              type="text"
              value={editData.password}
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
              placeholder="Password"
              className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-1.5 rounded-md hover:bg-green-600 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-1.5 rounded-md hover:bg-gray-500 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-wide">
              {contact.name}
            </h2>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              <span className="font-medium text-gray-800">Email:</span>{" "}
              {contact.email}
            </p>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              <span className="font-medium text-gray-800">Phone:</span> +91{" "}
              {contact.number}
            </p>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              <span className="font-medium text-gray-800">Password:</span>{" "}
              {contact.password}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex justify-center gap-5 mt-5">
            <RiEditCircleLine
              onClick={() => setIsEditing(true)}
              className="text-blue-500 text-2xl cursor-pointer hover:scale-125 transition"
              title="Edit"
            />
            <IoMdTrash
              onClick={handleDelete}
              className="text-red-500 text-2xl cursor-pointer hover:scale-125 transition"
              title="Delete"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginCard;
