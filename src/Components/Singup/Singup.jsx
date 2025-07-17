import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, "Number must be exactly 10 digits")
    .required("Number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});



function Signup() {

const addConatct = async (contact) =>{
  try {
    const contactRef = collection(db, 'contacts');
    await addDoc(contactRef, contact)
    toast.success('Contact add successfully')
  } catch (error) {
    console.log(error);
    
  }
}

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Formik
       validationSchema={contactSchemaValidation}
        initialValues={{ name: '', email: '', password: '', number: '' }}
        onSubmit={(values) => {
          console.log('Form Submitted:', values);
          addConatct(values)
        }}
      >
        <Form className="bg-white/20 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl p-8 w-full max-w-md text-gray-800 space-y-5">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-orange-600">Create Your Account</h2>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
            <Field
              name="name"
              className="bg-white/50 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400"
              placeholder="Enter your full name"
            />
            <div className="text-red-600 text-sm">
              <ErrorMessage name="name" />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
            <Field
              name="email"
              type="email"
              className="bg-white/50 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400"
              placeholder="Enter your email"
            />
            <div className="text-red-600 text-sm">
              <ErrorMessage name="email" />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Field
              name="password"
              type="password"
              className="bg-white/50 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400"
              placeholder="••••••••"
            />
            <div className="text-red-600 text-sm">
              <ErrorMessage name="password" />
            </div>
          </div>

          {/* Number */}
          <div className="flex flex-col gap-1">
            <label htmlFor="number" className="text-sm font-medium">Phone Number</label>
            <Field
              name="number"
              type="tel"
              className="bg-white/50 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400"
              placeholder="Enter your number"
            />
            <div className="text-red-600 text-sm">
              <ErrorMessage name="number" />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition-all duration-300 shadow-md"
          >
            Submit
          </button>
        </Form>
      </Formik>
<ToastContainer
  position="top-center"
  autoClose={2000}
  theme="colored"
/>


    </div>
  );
}

export default Signup;
