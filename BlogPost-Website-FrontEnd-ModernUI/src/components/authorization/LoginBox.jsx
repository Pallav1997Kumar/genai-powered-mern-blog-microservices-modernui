import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import axios from "axios";
import Cookies from "js-cookie";

import { useDispatch } from "react-redux";
import { login } from "../../store/userDetailSlice.js";
import {
	FaLock,
	FaEnvelope,
	FaArrowRight
} from "react-icons/fa";
import { FiEye } from "react-icons/fi";

import "../../style/authorization/LoginBox.scss";
import Button from "react-bootstrap/Button";

import backendBaseURL from "../../backendBaseURL.js";


function LoginBox() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ============================================================
    // Login Form State - starts
    // ============================================================

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [agree, setAgree] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // ============================================================
    // Login Form State - ends
    // ============================================================

    

    // ============================================================
    // Input Validation State - starts
    // ============================================================

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    
    // ============================================================
    // Input Validation State - ends
    // ============================================================



    // ============================================================
    // Email Input Change Handler - starts
    // ============================================================

    function emailAddressChangleHandler(event) {
        setEmail(event.target.value);
        if (event.target.value.trim().length > 0) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    }

    // ============================================================
    // Email Input Change Handler - ends
    // ============================================================



    // ============================================================
    // Password Input Change Handler - starts
    // ============================================================

    function passwordChangleHandler(event) {
        setPassword(event.target.value);
        if (event.target.value.trim().length > 0) {
            setIsValidPassword(true);
        } else {
            setIsValidPassword(false);
        }
    }

    // ============================================================
    // Password Input Change Handler - ends
    // ============================================================



    // ============================================================
    // Validate Login Inputs - starts
    // ============================================================

    function isAllInputsValid() {
        if (email.trim().length === 0 || password.trim().length === 0) {
            if (email.trim().length === 0) {
                setIsValidEmail(false);
            }
            if (password.trim().length === 0) {
                setIsValidPassword(false);
            }
            return false;
        }
        return true;
    }

    // ============================================================
    // Validate Login Inputs - ends
    // ============================================================



    // ============================================================
    // Login Form Submission Handler - starts
    // ============================================================

    async function submitHandler(event) {

        // Prevent the browser from refreshing the page
        event.preventDefault();

        // Validate all required login fields
        const isValidInputs = isAllInputsValid();
        if (isValidInputs) {

            // Prepare login request payload
            const inputs = { 
                email, 
                password 
            };

            try {
                if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
                    console.log(inputs);
                }

                // Send login request to the backend
                const response = await axios.post(
                    `${backendBaseURL}/api/authorization/login`,
                    inputs
                );

                if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
                    console.log(response);
                }

                // Extract user details and JWT token from response
                const {
                    firstName,
                    middleName,
                    lastName,
                    emailAddress,
                    fullName,
                    userID,
                    jwtToken,
                    username,
                    gender,
                    dob,
                    profilePhoto,
                } = response.data;


                // Prepare user details for local storage
                const storage = {
                    firstName,
                    middleName,
                    lastName,
                    emailAddress,
                    fullName,
                    userID,
                    username,
                    gender,
                    dob,
                    profilePhoto,
                };
                

                // Store authenticated user details locally
                localStorage.setItem("user", JSON.stringify(storage));

                // Retrieve stored user details for Redux state
                const userDetail = JSON.parse(localStorage.getItem("user"));
                
                // Store JWT access token in browser cookie
                Cookies.set("jwt_access_token", jwtToken);

                // Update global authentication state
                dispatch(login(userDetail));

                // Redirect user after successful login
                navigate("/");
            } catch (error) {
                if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
                    console.error(error);
                }

                setErrorMessage(error.response.data);
            }
        }
    }

    // ============================================================
    // Login Form Submission Handler - ends
    // ============================================================

    


    // ============================================================
    // JSX Section - starts
    // ============================================================
    
    return (
        <motion.div
            className="login-box"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
        >
            <div className="login-card">
                <div className="login-icon">
                    <FaLock />
                </div>

                <h2>Welcome Back</h2>

                <p className="subtitle">
                    Sign in to continue your blogging journey.
                </p>

                <form>
                    <div className="mandatory-text">
                        Fields marked with <span>*</span> are required
                    </div>

                    <div className="form-group">
                        <label>
                            Email Address <span>*</span>
                        </label>

                        <div
                            className={
                                isValidEmail ? "input-box" : "input-box invalid"
                            }
                        >
                            <FaEnvelope />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={emailAddressChangleHandler}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            Password <span>*</span>
                        </label>

                        <div
                            className={
                                isValidPassword ? "input-box" : "input-box invalid"
                            }
                        >
                            <FaLock />

                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={passwordChangleHandler}
                            />

                            <FiEye className="eye-icon" />
                        </div>
                    </div>

                    <div className="remember-row">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                            />

                            <span>
                                I agree to the
                                <b> Terms & Conditions</b>
                            </span>
                        </label>
                    </div>

                    <div className="button-area">
                        {agree ? (
                            <Button
                                onClick={submitHandler}
                                type="button"
                                variant="primary"
                            >
                                Log In
                                <FaArrowRight />
                            </Button>
                        ) : (
                            <Button type="button" variant="secondary">
                                Log In
                                <FaArrowRight />
                            </Button>
                        )}
                    </div>

                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}

                    <div className="bottom-links">
                        <p>Don't have an account?</p>

                        <Link to="/register">Create Account</Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );

    // ============================================================
    // JSX Section - ends
    // ============================================================

}

export default LoginBox;
