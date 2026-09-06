import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import { logout } from "../../store/userDetailSlice.js";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import "../../style/fixed component/NavbarDesktop.scss";

import logo from "../../images/logo.jpg";

import backendBaseURL from "../../backendBaseURL.js";


function NavbarDesktop() {

	// ============================================================
	// Navigation - starts
	// ============================================================
	const navigate = useNavigate();
	// ============================================================
	// Navigation - ends
	// ============================================================



	// ============================================================
	// Redux - starts
	// ============================================================

	const dispatch = useDispatch();

	// Get logged in user details from Redux store
	const user = useSelector((user) => user.userSlice.userDetail);

	// ============================================================
	// Redux - ends
	// ============================================================



	// ============================================================
	// Get Current User From Local Storage - starts
	// ============================================================

	const currentUser = localStorage.getItem("user");
	const currentUserObject = JSON.parse(currentUser);
	
	// ============================================================
	// Get Current User From Local Storage - ends
	// ============================================================


	
	// ============================================================
	// Account Modal State - starts
	// ============================================================

	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
	
	// ============================================================
	// Account Modal State - ends
	// ============================================================



	// ============================================================
	// Update User Details - starts
	// ============================================================

	useEffect(function () {
		// This effect runs when the current user object changes
	}, [currentUserObject]);

	// ============================================================
	// Update User Details - ends
	// ============================================================



	// ============================================================
	// Logout User - starts
	// ============================================================

	async function logoutHandler() {

		// Get authentication token from cookies
		const token = Cookies.get("jwt_access_token");
		const values = { token };
		try {

			// Send logout request to the backend
			const response = await axios.post(
				`${backendBaseURL}/api/authorization/logout`,
				values
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			// Remove user authentication data
			localStorage.removeItem("user");
			Cookies.remove("jwt_access_token");

			// Clear logged in user details from Redux
			dispatch(logout());

			// Navigate to logout page
			navigate("/logout");

			// Close logout modal
			setShowLogoutModal(false);
		} catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
	}
	
	// ============================================================
	// Logout User - ends
	// ============================================================



	// ============================================================
	// Delete User Account - starts
	// ============================================================

	async function deleteAccountHandler() {
		
		// Get authentication token from cookies
		const token = Cookies.get("jwt_access_token");
		const values = { token };
		try {
			// Send delete account request to the backend
			const response = await fetch(
				`${backendBaseURL}/api/authorization/deleteAccount/${currentUserObject.userID}`,
				{
					method: "DELETE",
					body: JSON.stringify(values),
					headers: { "Content-type": "application/json; charset=UTF-8" },
				}
			);
			const data = await response.json();

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(data);
			}
			
			// Navigate to account deleted confirmation page
			navigate("/accountDeleted");

			// Close delete account modal
			setShowDeleteAccountModal(false);

			// Remove user data from local storage
			localStorage.removeItem("user");

			// Clear logged in user details from Redux
			dispatch(logout());
		} catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
	}

	// ============================================================
	// Delete User Account - ends
	// ============================================================



	return (
		<div className="navbar-desktop">
			<div className="navbar-image">
				<Link to="/" className="">
					<img src={logo} />
				</Link>
			</div>
			<div className="navbar-heading">
				<NavLink to="/" className="navbar-navlink">
					HOME
				</NavLink>
				<NavLink to="/blogsHome" className="navbar-navlink">
					BLOGS
				</NavLink>
				<NavLink to="/contact" className="navbar-navlink">
					CONTACT US
				</NavLink>
			</div>
			{currentUserObject ? (
				<div className="user">
					<Dropdown align="end">
						<Dropdown.Toggle
							as="div"
							id="dropdown-user"
							className="profile-dropdown-toggle"
						>
							<div className="profile-trigger">
								<Image
									src={currentUserObject.profilePhoto}
									roundedCircle
									width={46}
									height={46}
								/>

								<div className="profile-details">
									<span className="profile-name">
										{currentUserObject.fullName}
									</span>

									<span className="profile-username">
										@{currentUserObject.username}
									</span>
								</div>

								<i className="bi bi-chevron-down"></i>
							</div>
						</Dropdown.Toggle>

						<Dropdown.Menu className="premium-dropdown">

							<div className="dropdown-header">

								<Image
									src={currentUserObject.profilePhoto}
									roundedCircle
									width={70}
									height={70}
								/>

								<h5>{currentUserObject.fullName}</h5>

								<p>@{currentUserObject.username}</p>

							</div>

							<Dropdown.Divider />

							<Dropdown.Item
								onClick={() =>
									navigate(`/blogs/username/${currentUserObject.username}`)
								}
							>
								<i className="bi bi-file-earmark-text"></i>
								View Posts
							</Dropdown.Item>

							<Dropdown.Item
								onClick={() =>
									navigate(`/edit_profile/${currentUserObject.username}`)
								}
							>
								<i className="bi bi-person"></i>
								Edit Profile
							</Dropdown.Item>

							<Dropdown.Item
								onClick={() => navigate("/write")}
							>
								<i className="bi bi-pencil-square"></i>
								Write Post
							</Dropdown.Item>

							<Dropdown.Divider />

							<Dropdown.Item
								onClick={() => setShowDeleteAccountModal(true)}
							>
								<i className="bi bi-trash"></i>
								Delete Account
							</Dropdown.Item>

							<Dropdown.Item
								onClick={() => setShowLogoutModal(true)}
							>
								<i className="bi bi-box-arrow-right"></i>
								Logout
							</Dropdown.Item>

						</Dropdown.Menu>
					</Dropdown>
				</div>
			) : (
				<div className="login-register">
					<div className="login-register-menu">
						<Button variant="success">
							<NavLink className="login-register-button" to="/register">
								Register
							</NavLink>
						</Button>
					</div>
					<div className="login-register-menu">
						<Button variant="warning">
							<NavLink className="login-register-button" to="/login">
								Login
							</NavLink>
						</Button>
					</div>
				</div>
			)}
			<Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Logout</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to logout?</Modal.Body>
				<Modal.Footer>
					<Button 
                        variant="primary" 
                        onClick={() => setShowLogoutModal(false)}
                    >
						No
					</Button>
					<Button 
                        variant="danger" 
                        onClick={logoutHandler}
                    >
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal
				show={showDeleteAccountModal}
				onHide={() => setShowDeleteAccountModal(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Account</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete your account?</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => setShowDeleteAccountModal(false)}
					>
						No
					</Button>
					<Button 
                        variant="danger" 
                        onClick={deleteAccountHandler}
                    >
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default NavbarDesktop;
