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
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//Initialization of update
	const [infoUpdated, setInfoUpdated] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(
		function () {
			if (!localStorage.getItem("user")) {
				navigate("/login");
			}
		},
		[infoUpdated]
	);

	//Getting logged-in user information from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);
	// const currentUser = localStorage.getItem("user");
	// const currentUserObject = JSON.parse(currentUser);
	// const user = currentUserObject;

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

	//All inputs fields
	const [profilePhoto, setProfilePhoto] = useState();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	//All inputs fields initialized with value which saved to database
	const [firstName, setFirstName] = useState(FIRST_NAME);
	const [middleName, setMiddleName] = useState(MIDDLE_NAME);
	const [lastName, setLastName] = useState(LAST_NAME);
	const [username, setUsername] = useState(USERNAME);
	const [gender, setGender] = useState(GENDER);
	const [dob, setDob] = useState(DATE_OF_BIRTH);
	const [email, setEmail] = useState(EMAIL_ADDRESS);

	//All input fields validation check
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

	//Initialization of error messages
	const [profilePhotoErrorMessage, setProfilePhotoErrorMessage] = useState("");
	const [basicInfoErrorMessage, setBasicInfoErrorMessage] = useState("");
	const [usernameEmailErrorMessage, setUsernameEmailErrorMessage] =
		useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

	//Initialization of success messages
	const [profilePhotoSuccessMessage, setProfilePhotoSuccessMessage] =
		useState("");
	const [basicInfoSuccessMessage, setBasicInfoSuccessMessage] = useState("");
	const [usernameEmailSuccessMessage, setUsernameEmailSuccessMessage] =
		useState("");
	const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");

	function firstNameChangleHandler(event) {
		setFirstName(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidFirstName(true);
		} else {
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
		} else {
			setIsValidLarstName(false);
		}
	}

	function genderChangleHandler(event) {
		setGender(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidGender(true);
		} else {
			setIsValidGender(false);
		}
	}

	function dateOfBirthChangleHandler(event) {
		setDob(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidDateOfBirth(true);
		} else {
			setIsValidDateOfBirth(false);
		}
	}

	function usernameChangleHandler(event) {
		setUsername(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidUserName(true);
		} else {
			setIsValidUserName(false);
		}
	}

	function emailAddressChangleHandler(event) {
		setEmail(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidEmail(true);
		} else {
			setIsValidEmail(false);
		}
	}

	function oldPasswordChangleHandler(event) {
		setOldPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidOldPassword(true);
		} else {
			setIsValidOldPassword(false);
		}
	}

	function newPasswordChangleHandler(event) {
		setNewPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidNewPassword(true);
		} else {
			setIsValidNewPassword(false);
		}
	}

	function confirmNewPasswordChangleHandler(event) {
		setConfirmNewPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidConfirmNewPassword(true);
		} else {
			setIsValidConfirmNewPassword(false);
		}
	}

	//Function to check whether basic information input is valid.
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

	//Function for updating basic information
	async function basicInfoUpdateHandler(event) {
		event.preventDefault();
		const isAllBasicInfoValid = isBasicInfoInputsValid();
		const token = Cookies.get("jwt_access_token");
		if (isAllBasicInfoValid) {
			const inputs = { firstName, middleName, lastName, gender, dob, token };
			try {
				const response = await axios.put(
					`${backendBaseURL}/api/blogUser/update/basicInfo/${user.userID}`,
					inputs
				);
				setBasicInfoSuccessMessage(response.data);
				setBasicInfoErrorMessage("");
				let fullName;
				if (middleName.trim() === "") {
					fullName = firstName + " " + lastName;
				} else {
					fullName = firstName + " " + middleName + " " + lastName;
				}
				const updatedUser = {
					...user,
					fullName: fullName,
					firstName: firstName,
					middleName: middleName,
					lastName: lastName,
					gender: gender,
					dob: dob,
				};
				dispatch(update(updatedUser));
				localStorage.setItem("user", JSON.stringify(updatedUser));
				setIsError(false);
				setInfoUpdated(true);
			} catch (error) {
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

	//Function to check whether email address and password is valid
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

	//Function for updating username and email address
	async function usernameEmailUpdateHandler(event) {
		event.preventDefault();
		const isUsernameEmailValid = isUsernameEmailInputsValid();
		const token = Cookies.get("jwt_access_token");
		if (isUsernameEmailValid) {
			const inputs = { email, username, token };
			try {
				const response = await axios.put(
					`${backendBaseURL}/api/blogUser/update/usernameEmail/${user.userID}`,
					inputs
				);
				setUsernameEmailSuccessMessage(response.data);
				setUsernameEmailErrorMessage("");
				const updatedUser = {
					...user,
					username: username,
					emailAddress: email,
				};
				dispatch(update(updatedUser));
				localStorage.setItem("user", JSON.stringify(updatedUser));
				setIsError(false);
				setInfoUpdated(true);
			} catch (error) {
				console.log(error)
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

	//Function to check whether passwords are valid
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

	//Function for updating password
	async function passwordUpdateHandler(event) {
		event.preventDefault();
		const isPasswordsValid = isPasswordsInputsValid();
		const token = Cookies.get("jwt_access_token");
		if (isPasswordsValid) {
			const inputs = { oldPassword, newPassword, confirmNewPassword, token };
			try {
				const response = await axios.put(
					`${backendBaseURL}/api/blogUser/update/password/${user.userID}`,
					inputs
				);
				setPasswordSuccessMessage(response.data);
				setPasswordErrorMessage("");
				setIsError(false);
				setInfoUpdated(true);
			} catch (error) {
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

	async function handleProfilePhotoUpload() {
		const formData = new FormData();
		formData.append("profilePhoto", profilePhoto);
		const userID = user.userID;
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/imageUpload/profilePhoto?userID=${userID}`,
				formData
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}

	async function profilePhotoUpdateHandler(event) {
		event.preventDefault();
		const imageDetail = await handleProfilePhotoUpload();
		console.log(imageDetail)
		const token = Cookies.get("jwt_access_token");
		const inputs = { imageDetail, token };
		try {
			const response = await axios.put(
				`${backendBaseURL}/api/blogUser/update/profilePhoto/${user.userID}`,
				inputs
			);
			setProfilePhotoSuccessMessage(response.data);
			setProfilePhotoErrorMessage("");
			const updatedUser = { ...user, profilePhoto: imageDetail.path };
			dispatch(update(updatedUser));
			localStorage.setItem("user", JSON.stringify(updatedUser));
			setIsError(false);
			setInfoUpdated(true);
		} catch (error) {
			setProfilePhotoErrorMessage(error.message);
			setProfilePhotoSuccessMessage("");
			setIsError(true);
		}
	}

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
					<p>
						Manage your account preferences and information
					</p>
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

				<Accordion.Item
					eventKey="0"
					className="settings-card"
				>

					<Accordion.Header>

						<div className="settings-header">

							<div className="settings-icon profile-photo-icon">
								<i className="fa-solid fa-camera"></i>
							</div>

							<div className="settings-header-content">
								<h4>Change the Profile Photo</h4>
								<p>
									Upload a new profile picture for your account
								</p>
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
									This image will appear on your profile and across the platform.
								</p>

							</div>

							{/* Right Side */}
							<div className="profile-photo-upload">

								<h4>Upload New Photo</h4>

								<p>
									Choose a JPG, PNG or WEBP image. Use a square image for the
									best appearance.
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
														onChange={genderChangleHandler}
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
														checked={gender === "Female"}
														onChange={genderChangleHandler}
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
										Update your username and email address. These details are used
										for login and account identification.
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
													onChange={usernameChangleHandler}
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
													onChange={emailAddressChangleHandler}
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
										Choose a strong password to keep your account secure.
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
													onChange={oldPasswordChangleHandler}
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
													onChange={newPasswordChangleHandler}
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
													onChange={confirmNewPasswordChangleHandler}
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
											<li>Include uppercase and lowercase letters</li>
											<li>Include at least one number</li>
											<li>Include at least one special character</li>
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
}

export default EditProfile;
