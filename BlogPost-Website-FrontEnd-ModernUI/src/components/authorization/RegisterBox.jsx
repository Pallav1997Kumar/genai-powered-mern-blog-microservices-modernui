import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import axios from "axios";

import "../../style/authorization/RegisterBox.scss";

import Button from "react-bootstrap/Button";
import {
	FaArrowRight,
	FaUserPlus,
	FaUser,
	FaEnvelope,
	FaLock,
	FaCalendarAlt,
	FaAt
} from "react-icons/fa";
import { FiEye } from "react-icons/fi";

import backendBaseURL from "../../backendBaseURL.js";


function RegisterBox() {
	//All inputs fields
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [gender, setGender] = useState("Male");
	const [dob, setDob] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [agree, setAgree] = useState(false);
	const [isErrorWhileRegistration, setIsErrorWhileRegistration] =
		useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	//All input fields validation check
	const [isValidFirstName, setIsValidFirstName] = useState(true);
	const [isValidLastName, setIsValidLarstName] = useState(true);
	const [isValidUserName, setIsValidUserName] = useState(true);
	const [isValidDateOfBirth, setIsValidDateOfBirth] = useState(true);
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
	const [isValidGender, setIsValidGender] = useState(true);

	function firstNameChangleHandler(event) {
		setFirstName(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidFirstName(true);
		} 
        else {
			setIsValidFirstName(false);
		}
	}

	function middleNameChangleHandler(event) {
		setMiddleName(event.target.value);
	}

	function lastNameChangleHandler(event) {
		setLastName(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidLarstName(true);
		} 
        else {
			setIsValidLarstName(false);
		}
	}

	function genderChangleHandler(event) {
		setGender(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidGender(true);
		} 
        else {
			setIsValidGender(false);
		}
	}

	function dateOfBirthChangleHandler(event) {
		setDob(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidDateOfBirth(true);
		} 
        else {
			setIsValidDateOfBirth(false);
		}
	}

	function usernameChangleHandler(event) {
		setUsername(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidUserName(true);
		} 
        else {
			setIsValidUserName(false);
		}
	}

	function emailAddressChangleHandler(event) {
		setEmail(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidEmail(true);
		} 
        else {
			setIsValidEmail(false);
		}
	}

	function passwordChangleHandler(event) {
		setPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidPassword(true);
		} 
        else {
			setIsValidPassword(false);
		}
	}

	function confirmPasswordChangleHandler(event) {
		setConfirmPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidConfirmPassword(true);
		} 
        else {
			setIsValidConfirmPassword(false);
		}
	}

	function isAllInputsValid() {
		if (
			firstName.trim().length === 0 ||
			lastName.trim().length === 0 ||
			gender.trim().length === 0 ||
			email.trim().length === 0 ||
			dob.length === 0 ||
			username.trim().length === 0 ||
			password.trim().length === 0 ||
			confirmPassword.trim().length === 0
		) {
			if (firstName.trim().length === 0) {
				setIsValidFirstName(false);
			}
			if (lastName.trim().length === 0) {
				setIsValidLarstName(false);
			}
			if (gender.trim().length === 0) {
				setIsValidGender(false);
			}
			if (email.trim().length === 0) {
				setIsValidEmail(false);
			}
			if (dob.length === 0) {
				setIsValidDateOfBirth(false);
			}
			if (username.trim().length === 0) {
				setIsValidUserName(false);
			}
			if (password.trim().length === 0) {
				setIsValidPassword(false);
			}
			if (confirmPassword.trim().length === 0) {
				setIsValidConfirmPassword(false);
			}
			return false;
		}
		return true;
	}

	async function submitHandler(event) {
		event.preventDefault();
		const isValidInputs = isAllInputsValid();
		if (isValidInputs) {
			const inputs = {
				firstName,
				middleName,
				lastName,
				gender,
				username,
				dob,
				email,
				password,
				confirmPassword,
			};
			try {
				const response = await axios.post(
					`${backendBaseURL}/api/authorization/register`,
					inputs
				);
				setSuccessMessage(response.data);
				setFirstName("");
				setMiddleName("");
				setLastName("");
				setUsername("");
				setGender("Male");
				setDob("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
				setErrorMessage("");
				setIsErrorWhileRegistration(false);
			} catch (error) {
                console.error(error)
				if (error.message === "Request failed with status code 401") {
					setErrorMessage(error.response.data);
				} 
                else if (error.message === "Request failed with status code 409") {
					setErrorMessage(error.response.data);
				} 
                else if (error.message === "Request failed with status code 400") {
					setErrorMessage(error.response.data);
				} 
                else {
					setErrorMessage(error.message);
				}
				setSuccessMessage("");
				setIsErrorWhileRegistration(true);
			}
		}
	}

	return (
        <motion.div
            className="register-box"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
        >
            <div className="register-card">

                <div className="register-icon">
                    <FaUserPlus />
                </div>

                <h2>Create Your Account</h2>

                <p className="subtitle">
                    Start your blogging journey in less than a minute.
                </p>

                <form>

                    <div className="mandatory-text">
                        Fields marked with <span>*</span> are required
                    </div>

                    <div className="register-grid">

                        {/* LEFT COLUMN */}

                        <div className="column">

                            <div className="form-group">
                                <label>
                                    First Name <span>*</span>
                                </label>

                                <div className={isValidFirstName ? "input-box" : "input-box invalid"}>
                                    <FaUser />
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={firstNameChangleHandler}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Middle Name</label>

                                <div className="input-box">
                                    <FaUser />
                                    <input
                                        type="text"
                                        placeholder="Middle name"
                                        value={middleName}
                                        onChange={middleNameChangleHandler}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    Last Name <span>*</span>
                                </label>

                                <div className={isValidLastName ? "input-box" : "input-box invalid"}>
                                    <FaUser />
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={lastNameChangleHandler}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    Gender <span>*</span>
                                </label>

                                <div className="gender-group">

                                    <label className="radio-card">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={gender === "Male"}
                                            onChange={genderChangleHandler}
                                        />
                                        <span>Male</span>
                                    </label>

                                    <label className="radio-card">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={gender === "Female"}
                                            onChange={genderChangleHandler}
                                        />
                                        <span>Female</span>
                                    </label>

                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    Date of Birth <span>*</span>
                                </label>

                                <div className={isValidDateOfBirth ? "input-box" : "input-box invalid"}>
                                    <FaCalendarAlt />

                                    <input
                                        type="date"
                                        value={dob}
                                        onChange={dateOfBirthChangleHandler}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN */}

                        <div className="column">

                            <div className="form-group">
                                <label>
                                    Username <span>*</span>
                                </label>

                                <div className={isValidUserName ? "input-box" : "input-box invalid"}>
                                    <FaAt />

                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={usernameChangleHandler}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    Email <span>*</span>
                                </label>

                                <div className={isValidEmail ? "input-box" : "input-box invalid"}>
                                    <FaEnvelope />

                                    <input
                                        type="email"
                                        placeholder="Email address"
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
                                        placeholder="Password"
                                        value={password}
                                        onChange={passwordChangleHandler}
                                    />

                                    <FiEye className="eye-icon" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    Confirm Password <span>*</span>
                                </label>

                                <div className={isValidConfirmPassword ? "input-box" : "input-box invalid"}>
                                    <FaLock />

                                    <input
                                        type="password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={confirmPasswordChangleHandler}
                                    />

                                    <FiEye className="eye-icon" />
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="agree-section">

                        <label className="checkbox">

                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                            />

                            <span>
                                I agree to the <b>Terms & Conditions</b>
                            </span>

                        </label>

                    </div>

                    <div className="register-button">

                        {agree ? (
                            <Button
                                type="button"
                                onClick={submitHandler}
                                variant="primary"
                            >
                                Create Account
                                <FaArrowRight />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                variant="secondary"
                            >
                                Create Account
                                <FaArrowRight />
                            </Button>
                        )}

                    </div>

                    {isErrorWhileRegistration ? (
                        <p className="error-message">
                            {errorMessage}
                        </p>
                    ) : (
                        <p className="success-message">
                            {successMessage}
                        </p>
                    )}

                    <div className="bottom-links">
                        <p>Already have an account?</p>

                        <Link to="/login">
                            Login Here
                        </Link>
                    </div>

                </form>

            </div>
        </motion.div>
    );
}

export default RegisterBox;
