import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import Cookies from "js-cookie";
import axios from "axios";

import { update } from "../../store/userDetailSlice.js";

import "../../style/edit profile/EditProfile.scss";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import backendBaseURL from "../../backendBaseURL.js";


function EditProfile() {

	// ============================================================
	// Initialize Navigation and Redux Dispatch - starts
	// ============================================================
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// ============================================================
	// Initialize Navigation and Redux Dispatch - ends
	// ============================================================



	// ============================================================
	// Initialize Update and Error State Variables - starts
	// ============================================================
	const [infoUpdated, setInfoUpdated] = useState(false);
	const [isError, setIsError] = useState(false);
	// ============================================================
	// Initialize Update and Error State Variables - ends
	// ============================================================



	// ============================================================
	// Check User Authentication and Redirect to Login - starts
	// ============================================================
	useEffect(
		function () {
			if (!localStorage.getItem("user")) {
				navigate("/login");
			}
		},
		[infoUpdated]
	);
	// ============================================================
	// Check User Authentication and Redirect to Login - ends
	// ============================================================



	// ============================================================
	// Get Logged-In User Information from Redux Store - starts
	// ============================================================
	const user = useSelector((user) => user.userSlice.userDetail);
	// ============================================================
	// Get Logged-In User Information from Redux Store - ends
	// ============================================================



	// ============================================================
	// Initialize User Information Variables - starts
	// ============================================================
	let FIRST_NAME = "";
	let MIDDLE_NAME = "";
	let LAST_NAME = "";
	let USERNAME = "";
	let GENDER = "";
	let DATE_OF_BIRTH = "";
	let EMAIL_ADDRESS = "";

	if (user != null) {
		FIRST_NAME = user.firstName;
		MIDDLE_NAME = user.middleName;
		LAST_NAME = user.lastName;
		USERNAME = user.username;
		GENDER = user.gender;
		DATE_OF_BIRTH = moment(user.dob).format("YYYY-MM-DD");
		EMAIL_ADDRESS = user.emailAddress;
	}
	// ============================================================
	// Initialize User Information Variables - ends
	// ============================================================



	// ============================================================
	// Initialize Password and Profile Photo Input Fields - starts
	// ============================================================
	const [profilePhoto, setProfilePhoto] = useState();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	// ============================================================
	// Initialize Password and Profile Photo Input Fields - ends
	// ============================================================



	// ============================================================
	// Initialize User Information Input Fields - starts
	// ============================================================
	const [firstName, setFirstName] = useState(FIRST_NAME);
	const [middleName, setMiddleName] = useState(MIDDLE_NAME);
	const [lastName, setLastName] = useState(LAST_NAME);
	const [username, setUsername] = useState(USERNAME);
	const [gender, setGender] = useState(GENDER);
	const [dob, setDob] = useState(DATE_OF_BIRTH);
	const [email, setEmail] = useState(EMAIL_ADDRESS);
	// ============================================================
	// Initialize User Information Input Fields - ends
	// ============================================================



	// ============================================================
	// Initialize Input Field Validation States - starts
	// ============================================================
	const [isValidFirstName, setIsValidFirstName] = useState(true);
	const [isValidLastName, setIsValidLarstName] = useState(true);
	const [isValidDateOfBirth, setIsValidDateOfBirth] = useState(true);
	const [isValidGender, setIsValidGender] = useState(true);
	const [isValidUserName, setIsValidUserName] = useState(true);
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidOldPassword, setIsValidOldPassword] = useState(true);
	const [isValidNewPassword, setIsValidNewPassword] = useState(true);
	const [isValidConfirmNewPassword, setIsValidConfirmNewPassword] =
		useState(true);
	// ============================================================
	// Initialize Input Field Validation States - ends
	// ============================================================



	// ============================================================
	// Initialize Error Messages - starts
	// ============================================================
	const [profilePhotoErrorMessage, setProfilePhotoErrorMessage] = useState("");
	const [basicInfoErrorMessage, setBasicInfoErrorMessage] = useState("");
	const [usernameEmailErrorMessage, setUsernameEmailErrorMessage] =
		useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	// ============================================================
	// Initialize Error Messages - ends
	// ============================================================



	// ============================================================
	// Initialize Success Messages - starts
	// ============================================================
	const [profilePhotoSuccessMessage, setProfilePhotoSuccessMessage] =
		useState("");
	const [basicInfoSuccessMessage, setBasicInfoSuccessMessage] = useState("");
	const [usernameEmailSuccessMessage, setUsernameEmailSuccessMessage] =
		useState("");
	const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");
	// ============================================================
	// Initialize Success Messages - ends
	// ============================================================



	// ============================================================
	// Handle First Name Change - starts
	// ============================================================
	function firstNameChangleHandler(event) {
		setFirstName(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidFirstName(true);
		} else {
			setIsValidFirstName(false);
		}
	}
	// ============================================================
	// Handle First Name Change - ends
	// ============================================================



	// ============================================================
	// Handle Middle Name Change - starts
	// ============================================================
	function middleNameChangleHandler(event) {
		setMiddleName(event.target.value);
	}
	// ============================================================
	// Handle Middle Name Change - ends
	// ============================================================



	// ============================================================
	// Handle Last Name Change - starts
	// ============================================================
	function lastNameChangleHandler(event) {
		setLastName(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidLarstName(true);
		} else {
			setIsValidLarstName(false);
		}
	}
	// ============================================================
	// Handle Last Name Change - ends
	// ============================================================



	// ============================================================
	// Handle Gender Change - starts
	// ============================================================
	function genderChangleHandler(event) {
		setGender(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidGender(true);
		} else {
			setIsValidGender(false);
		}
	}
	// ============================================================
	// Handle Gender Change - ends
	// ============================================================



	// ============================================================
	// Handle Date of Birth Change - starts
	// ============================================================
	function dateOfBirthChangleHandler(event) {
		setDob(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidDateOfBirth(true);
		} else {
			setIsValidDateOfBirth(false);
		}
	}
	// ============================================================
	// Handle Date of Birth Change - ends
	// ============================================================



	// ============================================================
	// Handle Username Change - starts
	// ============================================================
	function usernameChangleHandler(event) {
		setUsername(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidUserName(true);
		} else {
			setIsValidUserName(false);
		}
	}
	// ============================================================
	// Handle Username Change - ends
	// ============================================================



	// ============================================================
	// Handle Email Address Change - starts
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
	// Handle Email Address Change - ends
	// ============================================================



	// ============================================================
	// Handle Old Password Change - starts
	// ============================================================
	function oldPasswordChangleHandler(event) {
		setOldPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidOldPassword(true);
		} else {
			setIsValidOldPassword(false);
		}
	}
	// ============================================================
	// Handle Old Password Change - ends
	// ============================================================



	// ============================================================
	// Handle New Password Change - starts
	// ============================================================
	function newPasswordChangleHandler(event) {
		setNewPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidNewPassword(true);
		} else {
			setIsValidNewPassword(false);
		}
	}
	// ============================================================
	// Handle New Password Change - ends
	// ============================================================



	// ============================================================
	// Handle Confirm New Password Change - starts
	// ============================================================
	function confirmNewPasswordChangleHandler(event) {
		setConfirmNewPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidConfirmNewPassword(true);
		} else {
			setIsValidConfirmNewPassword(false);
		}
	}
	// ============================================================
	// Handle Confirm New Password Change - ends
	// ============================================================



	// ============================================================
	// Validate Basic Information Inputs - starts
	// ============================================================
	function isBasicInfoInputsValid() {
		if (
			firstName.trim().length === 0 ||
			lastName.trim().length === 0 ||
			gender.trim().length === 0 ||
			dob.length === 0
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

			if (dob.length === 0) {
				setIsValidDateOfBirth(false);
			}

			return false;
		}

		return true;
	}
	// ============================================================
	// Validate Basic Information Inputs - ends
	// ============================================================




	// ============================================================
	// Update Basic Information - starts
	// ============================================================
	async function basicInfoUpdateHandler(event) {
		event.preventDefault();

		// Check Basic Information Inputs Validation
		const isAllBasicInfoValid = isBasicInfoInputsValid();

		// Get authentication details for updating user information
		const token = Cookies.get("jwt_access_token");

		if (isAllBasicInfoValid) {
			// Prepare Basic Information for API Request
			const inputs = { 
				firstName, 
				middleName, 
				lastName, 
				gender, 
				dob, 
				token 
			};

			try {

				if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
                    console.log(inputs);
                }

				// Call Update Basic Information API
				const response = await axios.put(
					`${backendBaseURL}/api/blogUser/update/basicInfo/${user.userID}`,
					inputs
				);

				if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
					console.log(response);
				}

				setBasicInfoSuccessMessage(response.data);
				setBasicInfoErrorMessage("");

				// Generate Updated User Full Name
				let fullName;

				if (middleName.trim() === "") {
					fullName = firstName + " " + lastName;
				} else {
					fullName = firstName + " " + middleName + " " + lastName;
				}

				// Prepare Updated User Information
				const updatedUser = {
					...user,
					fullName: fullName,
					firstName: firstName,
					middleName: middleName,
					lastName: lastName,
					gender: gender,
					dob: dob,
				};

				// Update User Information in Redux and Local Storage
				dispatch(update(updatedUser));
				localStorage.setItem("user", JSON.stringify(updatedUser));

				setIsError(false);
				setInfoUpdated(true);
			} catch (error) {
				if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
					console.error(error);
				}
				
				// Handle Basic Information Update Error
				if (error.message === "Request failed with status code 403") {
					setBasicInfoErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 417") {
					setBasicInfoErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 401") {
					setBasicInfoErrorMessage(error.response.data);
				} else {
					setBasicInfoErrorMessage(error.message);
				}

				setBasicInfoSuccessMessage("");
				setIsError(true);
			}
		}
	}
	// ============================================================
	// Update Basic Information - ends
	// ============================================================



	// ============================================================
	// Validate Username and Email Inputs - starts
	// ============================================================
	function isUsernameEmailInputsValid() {
		if (email.trim().length === 0 || username.trim().length === 0) {
			if (email.trim().length === 0) {
				setIsValidEmail(false);
			}

			if (username.trim().length === 0) {
				setIsValidUserName(false);
			}

			return false;
		}

		return true;
	}
	// ============================================================
	// Validate Username and Email Inputs - ends
	// ============================================================



	// ============================================================
	// Update Username and Email Address - starts
	// ============================================================
	async function usernameEmailUpdateHandler(event) {
		event.preventDefault();

		// Check Username and Email Inputs Validation
		const isUsernameEmailValid = isUsernameEmailInputsValid();

		// Get authentication details for updating user information
		const token = Cookies.get("jwt_access_token");

		if (isUsernameEmailValid) {
			// Prepare Username and Email for API Request
			const inputs = { 
				email, 
				username, 
				token 
			};

			try {
				if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
					console.log(inputs);
				}
				// Call Update Username and Email API
				const response = await axios.put(
					`${backendBaseURL}/api/blogUser/update/usernameEmail/${user.userID}`,
					inputs
				);

				if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
					console.log(response);
				}

				setUsernameEmailSuccessMessage(response.data);
				setUsernameEmailErrorMessage("");

				// Prepare Updated User Information
				const updatedUser = {
					...user,
					username: username,
					emailAddress: email,
				};

				// Update User Information in Redux and Local Storage
				dispatch(update(updatedUser));
				localStorage.setItem("user", JSON.stringify(updatedUser));

				setIsError(false);
				setInfoUpdated(true);
			} catch (error) {
				if (process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT") {
					console.error(error);
				}

				// Handle Username and Email Update Error
				if (error.message === "Request failed with status code 409") {
					setUsernameEmailErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 401") {
					setUsernameEmailErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 403") {
					setUsernameEmailErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 417") {
					setUsernameEmailErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 404") {
					setUsernameEmailErrorMessage(error.response.data);
				} else {
					setUsernameEmailErrorMessage(error.message);
				}

				setUsernameEmailSuccessMessage("");
				setIsError(true);
			}
		}
	}
	// ============================================================
	// Update Username and Email Address - ends
	// ============================================================



	// ============================================================
	// Validate Password Inputs - starts
	// ============================================================
	function isPasswordsInputsValid() {
		if (
			oldPassword.trim().length === 0 ||
			newPassword.trim().length === 0 ||
			confirmNewPassword.trim().length === 0
		) {
			if (oldPassword.trim().length === 0) {
				setIsValidOldPassword(false);
			}

			if (newPassword.trim().length === 0) {
				setIsValidNewPassword(false);
			}

			if (confirmNewPassword.trim().length === 0) {
				setIsValidConfirmNewPassword(false);
			}

			return false;
		}

		return true;
	}
	// ============================================================
	// Validate Password Inputs - ends
	// ============================================================



	// ============================================================
	// Update Password - starts
	// ============================================================
	async function passwordUpdateHandler(event) {
		event.preventDefault();

		// Check Password Inputs Validation
		const isPasswordsValid = isPasswordsInputsValid();

		// Get authentication details for updating user information
		const token = Cookies.get("jwt_access_token");

		if (isPasswordsValid) {
			// Prepare Password Information for API Request
			const inputs = {
				oldPassword,
				newPassword,
				confirmNewPassword,
				token
			};

			try {
				if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
					console.log(inputs);
				}
				// Call Update Password API
				const response = await axios.put(
					`${backendBaseURL}/api/blogUser/update/password/${user.userID}`,
					inputs
				);

				if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
					console.log(response);
				}

				setPasswordSuccessMessage(response.data);
				setPasswordErrorMessage("");
				setIsError(false);
				setInfoUpdated(true);
			} catch (error) {
				if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
					console.error(error);
				}

				// Handle Password Update Error
				if (error.message === "Request failed with status code 401") {
					setPasswordErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 403") {
					setPasswordErrorMessage(error.response.data);
				} else {
					setPasswordErrorMessage(error.message);
				}

				setPasswordSuccessMessage("");
				setIsError(true);
			}
		}
	}
	// ============================================================
	// Update Password - ends
	// ============================================================



	// ============================================================
	// Upload Profile Photo - starts
	// ============================================================
	async function handleProfilePhotoUpload() {
		// Create Form Data for Profile Photo Upload
		const formData = new FormData();

		// Add Profile Photo to Form Data
		formData.append("profilePhoto", profilePhoto);

		// Get Logged-In User ID
		const userID = user.userID;

		try {
			// Call Profile Photo Upload API
			const response = await axios.post(
				`${backendBaseURL}/api/imageUpload/profilePhoto?userID=${userID}`,
				formData
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			return response.data;
		} catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
			console.log(error);
		}
	}
	// ============================================================
	// Upload Profile Photo - ends
	// ============================================================



	// ============================================================
	// Update Profile Photo - starts
	// ============================================================
	async function profilePhotoUpdateHandler(event) {
		event.preventDefault();

		// Upload Profile Photo
		const imageDetail = await handleProfilePhotoUpload();

		if (process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT") {
			console.log(imageDetail);
		}

		// Get Authentication Token
		const token = Cookies.get("jwt_access_token");

		// Prepare Profile Photo Update Request
		const inputs = { imageDetail, token };

		try {
			if (process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT") {
				console.log(inputs);
			}

			// Call Update Profile Photo API
			const response = await axios.put(
				`${backendBaseURL}/api/blogUser/update/profilePhoto/${user.userID}`,
				inputs
			);

			if (process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT") {
				console.log(response);
			}

			// Update Profile Photo Success Message
			setProfilePhotoSuccessMessage(response.data);
			setProfilePhotoErrorMessage("");

			// Update User Information in Redux and Local Storage
			const updatedUser = { ...user, profilePhoto: imageDetail.path };
			dispatch(update(updatedUser));
			localStorage.setItem("user", JSON.stringify(updatedUser));

			setIsError(false);
			setInfoUpdated(true);
		} catch (error) {
			// Handle Profile Photo Update Error
			if (process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT") {
				console.error(error);
			}

			setProfilePhotoErrorMessage(error.message);
			setProfilePhotoSuccessMessage("");
			setIsError(true);
		}
	}
	// ============================================================
	// Update Profile Photo - ends
	// ============================================================



	
	// ============================================================
    // JSX Section - starts
    // ============================================================

	return (
		<div className="edit-profile-page">
			{/* ===========================
					Account Settings Header
				=========================== */}
			<div className="account-settings-hero">
				<div className="account-settings-icon">
					<div className="icon-circle">
						<i className="fa-regular fa-user"></i>
					</div>
				</div>

				<div className="account-settings-details">
					<h2>Account Settings</h2>
					<p>Manage your account preferences and information</p>
				</div>
			</div>

			{/* ===========================
					Settings Accordion
				=========================== */}

			<Accordion
				alwaysOpen
				defaultActiveKey={["0"]}
				className="account-settings-accordion"
			>
				{/* ======================================================
						PROFILE PHOTO
					====================================================== */}

				<Accordion.Item eventKey="0" className="settings-card">
					<Accordion.Header>
						<div className="settings-header">
							<div className="settings-icon profile-photo-icon">
								<i className="fa-solid fa-camera"></i>
							</div>

							<div className="settings-header-content">
								<h4>Change the Profile Photo</h4>
								<p>Upload a new profile picture for your account</p>
							</div>
						</div>
					</Accordion.Header>

					<Accordion.Body>
						<div className="profile-photo-section">
							{/* Left Side */}
							<div className="profile-photo-preview">
								<div className="profile-photo-image">
									{user && (
										<Image
											src={`${user.profilePhoto}`}
											roundedCircle
										/>
									)}
								</div>

								<h5>Profile Photo</h5>

								<p>
									This image will appear on your profile and
									across the platform.
								</p>
							</div>

							{/* Right Side */}
							<div className="profile-photo-upload">
								<h4>Upload New Photo</h4>

								<p>
									Choose a JPG, PNG or WEBP image. Use a square
									image for the best appearance.
								</p>

								<div className="upload-box">
									<div className="upload-icon">
										<i className="fa-solid fa-cloud-arrow-up"></i>
									</div>

									<h5>Click to upload</h5>

									<p>or drag and drop</p>

									<input
										type="file"
										name="profilePhoto"
										onChange={function (event) {
											setProfilePhoto(event.target.files[0]);
										}}
									/>
								</div>

								<div className="selected-file">
									{profilePhoto && (
										<div className="selected-file-name">
											<i className="fa-solid fa-image"></i>
											<span>{profilePhoto.name}</span>
										</div>
									)}
								</div>

								<div className="profile-photo-actions">
									<Button
										variant="primary"
										className="save-btn"
										onClick={profilePhotoUpdateHandler}
									>
										Update Profile Photo
									</Button>
								</div>

								<div className="success-error-container">
									{isError ? (
										<p className="error-update-message">
											{profilePhotoErrorMessage}
										</p>
									) : (
										<p className="success-update-message">
											{profilePhotoSuccessMessage}
										</p>
									)}
								</div>
							</div>
						</div>
					</Accordion.Body>

					<Accordion.Body>
						<form>
							<div className="basic-info-section">
								{/* ================= Name ================= */}

								<div className="setting-form-card">
									<h4>Personal Information</h4>

									<div className="input-grid three-column">
										<div className="input-group">
											<label>
												First Name
												<span className="mandatory">*</span>
											</label>

											<input
												className={
													isValidFirstName
														? "modern-input"
														: "modern-input invalid"
												}
												type="text"
												value={firstName}
												onChange={firstNameChangleHandler}
											/>
										</div>

										<div className="input-group">
											<label>Middle Name</label>

											<input
												className="modern-input"
												type="text"
												value={middleName}
												onChange={middleNameChangleHandler}
											/>
										</div>

										<div className="input-group">
											<label>
												Last Name
												<span className="mandatory">*</span>
											</label>

											<input
												className={
													isValidLastName
														? "modern-input"
														: "modern-input invalid"
												}
												type="text"
												value={lastName}
												onChange={lastNameChangleHandler}
											/>
										</div>
									</div>
								</div>

								{/* ================= Other Information ================= */}

								<div className="setting-form-card">
									<h4>Additional Information</h4>

									<div className="input-grid two-column">
										<div className="input-group">
											<label>
												Gender
												<span className="mandatory">*</span>
											</label>

											<div className="gender-selection">
												<label
													className={
														gender === "Male"
															? "gender-card active"
															: "gender-card"
													}
												>
													<input
														type="radio"
														name="gender"
														value="Male"
														checked={gender === "Male"}
														onChange={
															genderChangleHandler
														}
													/>

													<span>Male</span>
												</label>

												<label
													className={
														gender === "Female"
															? "gender-card active"
															: "gender-card"
													}
												>
													<input
														type="radio"
														name="gender"
														value="Female"
														checked={
															gender === "Female"
														}
														onChange={
															genderChangleHandler
														}
													/>

													<span>Female</span>
												</label>
											</div>
										</div>

										<div className="input-group">
											<label>
												Date of Birth
												<span className="mandatory">*</span>
											</label>

											<input
												type="date"
												value={dob}
												onChange={dateOfBirthChangleHandler}
												className={
													isValidDateOfBirth
														? "modern-input"
														: "modern-input invalid"
												}
											/>
										</div>
									</div>
								</div>

								{/* ================= Update Button ================= */}

								<div className="settings-action">
									<Button
										variant="primary"
										className="save-btn"
										onClick={basicInfoUpdateHandler}
									>
										Update Information
									</Button>
								</div>

								<div className="success-error-container">
									{isError ? (
										<p className="error-update-message">
											{basicInfoErrorMessage}
										</p>
									) : (
										<p className="success-update-message">
											{basicInfoSuccessMessage}
										</p>
									)}
								</div>
							</div>
						</form>
					</Accordion.Body>

					<Accordion.Body>
						<form>
							<div className="username-email-section">
								<div className="setting-form-card">
									<h4>Account Information</h4>

									<p className="setting-description">
										Update your username and email address.
										These details are used for login and account
										identification.
									</p>

									<div className="input-grid two-column">
										{/* Username */}

										<div className="input-group">
											<label>
												Username
												<span className="mandatory">*</span>
											</label>

											<div className="input-wrapper">
												<span className="input-icon">
													<i className="fa-regular fa-user"></i>
												</span>

												<input
													type="text"
													value={username}
													onChange={
														usernameChangleHandler
													}
													className={
														isValidUserName
															? "modern-input"
															: "modern-input invalid"
													}
												/>
											</div>
										</div>

										{/* Email */}

										<div className="input-group">
											<label>
												Email Address
												<span className="mandatory">*</span>
											</label>

											<div className="input-wrapper">
												<span className="input-icon">
													<i className="fa-regular fa-envelope"></i>
												</span>

												<input
													type="email"
													value={email}
													onChange={
														emailAddressChangleHandler
													}
													className={
														isValidEmail
															? "modern-input"
															: "modern-input invalid"
													}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="settings-action">
									<Button
										variant="primary"
										className="save-btn"
										onClick={usernameEmailUpdateHandler}
									>
										Update Account
									</Button>
								</div>

								<div className="success-error-container">
									{isError ? (
										<p className="error-update-message">
											{usernameEmailErrorMessage}
										</p>
									) : (
										<p className="success-update-message">
											{usernameEmailSuccessMessage}
										</p>
									)}
								</div>
							</div>
						</form>
					</Accordion.Body>

					<Accordion.Body>
						<form>
							<div className="password-section">
								<div className="setting-form-card">
									<h4>Security Settings</h4>

									<p className="setting-description">
										Choose a strong password to keep your
										account secure.
									</p>

									<div className="input-grid one-column">
										{/* Old Password */}

										<div className="input-group">
											<label>
												Current Password
												<span className="mandatory">*</span>
											</label>

											<div className="input-wrapper">
												<span className="input-icon">
													<i className="fa-solid fa-lock"></i>
												</span>

												<input
													type="password"
													value={oldPassword}
													onChange={
														oldPasswordChangleHandler
													}
													className={
														isValidOldPassword
															? "modern-input"
															: "modern-input invalid"
													}
													placeholder="Enter current password"
												/>
											</div>
										</div>

										{/* New Password */}

										<div className="input-group">
											<label>
												New Password
												<span className="mandatory">*</span>
											</label>

											<div className="input-wrapper">
												<span className="input-icon">
													<i className="fa-solid fa-key"></i>
												</span>

												<input
													type="password"
													value={newPassword}
													onChange={
														newPasswordChangleHandler
													}
													className={
														isValidNewPassword
															? "modern-input"
															: "modern-input invalid"
													}
													placeholder="Enter new password"
												/>
											</div>
										</div>

										{/* Confirm Password */}

										<div className="input-group">
											<label>
												Confirm New Password
												<span className="mandatory">*</span>
											</label>

											<div className="input-wrapper">
												<span className="input-icon">
													<i className="fa-solid fa-shield-halved"></i>
												</span>

												<input
													type="password"
													value={confirmNewPassword}
													onChange={
														confirmNewPasswordChangleHandler
													}
													className={
														isValidConfirmNewPassword
															? "modern-input"
															: "modern-input invalid"
													}
													placeholder="Re-enter new password"
												/>
											</div>
										</div>
									</div>

									<div className="password-tips">
										<h6>Password Requirements</h6>

										<ul>
											<li>Minimum 8 characters</li>
											<li>
												Include uppercase and lowercase
												letters
											</li>
											<li>Include at least one number</li>
											<li>
												Include at least one special
												character
											</li>
										</ul>
									</div>
								</div>

								<div className="settings-action">
									<Button
										variant="primary"
										className="save-btn"
										onClick={passwordUpdateHandler}
									>
										Update Password
									</Button>
								</div>

								<div className="success-error-container">
									{isError ? (
										<p className="error-update-message">
											{passwordErrorMessage}
										</p>
									) : (
										<p className="success-update-message">
											{passwordSuccessMessage}
										</p>
									)}
								</div>
							</div>
						</form>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);

	// ============================================================
    // JSX Section - ends
    // ============================================================

}

export default EditProfile;
