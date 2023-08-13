import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "./assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import styles from "../styles/Username.module.css";


const Login = ({ handleLogin }) => {
  // State variables to manage the username and password input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formik = useFormik({});


  // Function to handle the form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Call the 'handleLogin' function provided by the parent component, passing the username and password as arguments
    handleLogin(username, password);
  };


  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: '45%', height: '90%' }}>
          <div className="title flex flex-col items-center" >
            <h4 className="text-5xl font-bold">
              Hello
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={styles.textbox}
                type="Password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?{" "}
                <Link className="text-red-500" to="/">
                  Recover Now
                </Link>
              </span>
            </div>
            <div className="text-center py-4">
              <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
