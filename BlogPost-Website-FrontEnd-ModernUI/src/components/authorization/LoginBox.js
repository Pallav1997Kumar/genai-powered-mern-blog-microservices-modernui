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

    //All inputs fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [agree, setAgree] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //All input fields validation check
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    function emailAddressChangleHandler(event) {
        setEmail(event.target.value);
        if (event.target.value.trim().length > 0) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    }

    function passwordChangleHandler(event) {
        setPassword(event.target.value);
        if (event.target.value.trim().length > 0) {
            setIsValidPassword(true);
        } else {
            setIsValidPassword(false);
        }
    }

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

    async function submitHandler(event) {
        event.preventDefault();
        const isValidInputs = isAllInputsValid();
        if (isValidInputs) {
            const inputs = { email, password };
            try {
                const response = await axios.post(
                    `${backendBaseURL}/api/authorization/login`,
                    inputs
                );

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
                
                localStorage.setItem("user", JSON.stringify(storage));
                const userDetail = JSON.parse(localStorage.getItem("user"));
                Cookies.set("jwt_access_token", jwtToken);
                dispatch(login(userDetail));
                navigate("/");
            } catch (error) {
                console.log(error)
                setErrorMessage(error.response.data);
            }
        }
    }

    
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

                        <div className={isValidEmail ? "input-box" : "input-box invalid"}>
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

                        <div className={isValidPassword ? "input-box" : "input-box invalid"}>
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

                            <Button
                                type="button"
                                variant="secondary"
                            >
                                Log In

                                <FaArrowRight />
                            </Button>

                        )}

                    </div>

                    {errorMessage && (
                        <p className="error-message">
                            {errorMessage}
                        </p>
                    )}

                    <div className="bottom-links">

                        <p>
                            Don't have an account?
                        </p>

                        <Link to="/register">
                            Create Account
                        </Link>

                    </div>

                </form>

            </div>
        </motion.div>
    );
}

export default LoginBox;
