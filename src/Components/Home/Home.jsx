
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { db } from "../../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Card from "../Card/Card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); //  search input state

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(contactList);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  //  Filter & Sort Contacts (Searched card upar aayega)
  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !b.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return -1;
      }
      if (
        !a.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return 1; 
      }
      return 0;
    });

  return (
    <div>
      {/*  Search Section */}
      <div className="flex flex-col items-center mt-10 text-center gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          Search Your Data
        </h1>
        <div className="relative w-[300px] max-w-full">
          <input
            type="text"
            placeholder="Search your data"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} //  Update search
            className="bg-[#e5e5dfab] border border-black px-4 py-2 text-lg rounded-xl outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 w-full pr-10"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl pointer-events-none" />
        </div>
      </div>

      {/*  Cards Section */}
      <div className="max-w-6xl mx-auto mt-12 px-6">
        {filteredContacts.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="w-full sm:w-[48%] lg:w-[30%]">
                <Card contact={contact} showActions={false} />
              </div>
            ))}
          </div>
        ) : (
<div className="flex flex-col items-center justify-center mt-10">
  <img
    src="/img/download.png"
    alt="Data Not Found"
    className="w-32 h-32 object-contain mb-4"
  />
  <p className="text-center text-orange-500 font-bold text-2xl tracking-wide">
    Data Not Found
  </p>
</div>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </div>
  );
}

export default Home;
