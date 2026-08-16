import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import axios from "axios";
import Cookies from "js-cookie";

import { logout } from "../../store/userDetailSlice.js";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import "../../style/fixed component/NavbarMobile.scss";

import logo from "../../images/logo.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { BiSolidLeftArrow } from "react-icons/bi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {
    HiOutlineHome,
    HiOutlineDocumentText,
    HiOutlinePencilAlt,
    HiOutlineUserCircle,
    HiOutlineLogout,
    HiOutlineTrash,
    HiOutlineMail,
	HiOutlineX
} from "react-icons/hi";

import backendBaseURL from "../../backendBaseURL.js";


function NavbarMobile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((user) => user.userSlice.userDetail);

	//Getting logged in user detail from local storage
	const currentUser = localStorage.getItem("user");
	const currentUserObject = JSON.parse(currentUser);

	const [displayMenus, setDisplayMenus] = useState(false);

	//Modal Box
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

	useEffect(function () {}, [currentUserObject]);

	async function logoutHandler() {
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/authorization/logout`
			);
			localStorage.removeItem("user");
			Cookies.remove("jwt_access_token");
			dispatch(logout());
			navigate("/logout");
			setShowLogoutModal(false);
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteAccountHandler() {
		const token = Cookies.get("jwt_access_token");
		const values = { token };
		try {
			const response = await fetch(
				`${backendBaseURL}/api/authorization/deleteAccount/${currentUserObject.userID}`,
				{
					method: "DELETE",
					body: JSON.stringify(values),
					headers: { "Content-type": "application/json; charset=UTF-8" },
				}
			);
			const data = await response.json();
			navigate("/accountDeleted");
			setShowDeleteAccountModal(false);
			localStorage.removeItem("user");
			dispatch(logout());
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className="navbar-mobile">
				<div className="navbar-image">
					<Link to="/">
						<img src={logo} alt="Logo" />
					</Link>
				</div>

				<div className="navbar-menu-button">
					<button
						className="mobile-menu-btn"
						onClick={() => setDisplayMenus(true)}
					>
						{currentUserObject ? (
							<Image
								src={currentUserObject.profilePhoto}
								roundedCircle
							/>
						) : (
							<HiOutlineMenuAlt3 />
						)}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{displayMenus && (
					<motion.div
						className="mobile-menu-overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						onClick={() => setDisplayMenus(false)}
					>
						<motion.div
							className="mobile-menu-container"
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{
								type: "spring",
								stiffness: 160,
								damping: 18,
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="mobile-menu-header">
								<div className="mobile-logo">
									<img src={logo} alt="Logo" />
								</div>

								<button
									className="close-menu-btn"
									onClick={() => setDisplayMenus(false)}
								>
									<HiOutlineX />
								</button>
							</div>

							{currentUserObject && (
								<motion.div
									className="mobile-profile-card"
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 }}
								>
									<Image
										src={currentUserObject.profilePhoto}
										roundedCircle
										className="profile-image"
									/>

									<h3>{currentUserObject.fullName}</h3>

									<p>@{currentUserObject.username}</p>
								</motion.div>
							)}

							<div className="mobile-menu-links">
								<h5>Navigation</h5>

								<motion.button
									whileHover={{ x: 8 }}
									whileTap={{ scale: 0.96 }}
									onClick={() => {
										setDisplayMenus(false);
										navigate("/");
									}}
								>
									<HiOutlineHome />
									<span>Home</span>
								</motion.button>

								<motion.button
									whileHover={{ x: 8 }}
									whileTap={{ scale: 0.96 }}
									onClick={() => {
										setDisplayMenus(false);
										navigate("/blogsHome");
									}}
								>
									<HiOutlineDocumentText />
									<span>Blogs</span>
								</motion.button>

								<motion.button
									whileHover={{ x: 8 }}
									whileTap={{ scale: 0.96 }}
									onClick={() => {
										setDisplayMenus(false);
										navigate("/contact");
									}}
								>
									<HiOutlineMail />
									<span>Contact Us</span>
								</motion.button>

								{!currentUserObject && (
									<>
										<div className="menu-divider" />

										<h5>Account</h5>

										<motion.button
											whileHover={{ x: 8 }}
											whileTap={{ scale: 0.96 }}
											onClick={() => {
												setDisplayMenus(false);
												navigate("/login");
											}}
										>
											<HiOutlineLogout />
											<span>Login</span>
										</motion.button>

										<motion.button
											whileHover={{ x: 8 }}
											whileTap={{ scale: 0.96 }}
											onClick={() => {
												setDisplayMenus(false);
												navigate("/register");
											}}
										>
											<HiOutlineUserCircle />
											<span>Create Account</span>
										</motion.button>
									</>
								)}

								{currentUserObject && (
									<>
										<div className="menu-divider" />

										<h5>Content</h5>

										<motion.button
											whileHover={{ x: 8 }}
											whileTap={{ scale: 0.96 }}
											onClick={() => {
												setDisplayMenus(false);
												navigate(
													`/blogs/username/${currentUserObject.username}`
												)
											}}
										>
											<HiOutlineDocumentText />
											<span>My Posts</span>
										</motion.button>

										<motion.button
											whileHover={{ x: 8 }}
											whileTap={{ scale: 0.96 }}
											onClick={() => {
												setDisplayMenus(false);
												navigate(
													`/edit_profile/${currentUserObject.username}`
												)
											}}
										>
											<HiOutlineUserCircle />
											<span>Edit Profile</span>
										</motion.button>

										<motion.button
											whileHover={{ x: 8 }}
											whileTap={{ scale: 0.96 }}
											onClick={() => {
												setDisplayMenus(false);
												navigate("/write");
											}}
										>
											<HiOutlinePencilAlt />
											<span>Write Post</span>
										</motion.button>

										<div className="menu-divider" />

										<h5>Danger Zone</h5>

										<motion.button
											className="delete-btn"
											whileHover={{ x: 8 }}
											whileTap={{ scale: 0.96 }}
											onClick={() => {
												setDisplayMenus(false);
												setShowDeleteAccountModal(true);
											}}
										>
											<HiOutlineTrash />
											<span>Delete Account</span>
										</motion.button>

										<motion.button
											className="logout-btn"
											whileHover={{ x: 8 }}
											whileTap={{ scale: 0.96 }}
											onClick={() => {
												setDisplayMenus(false);
												setShowLogoutModal(true)
											}}
										>
											<HiOutlineLogout />
											<span>Logout</span>
										</motion.button>
									</>
								)}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
	
			<Modal
				show={showLogoutModal}
				onHide={() => setShowLogoutModal(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Logout</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					Are you sure you want to logout from your account?
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowLogoutModal(false)}
					>
						Cancel
					</Button>

					<Button
						variant="danger"
						onClick={logoutHandler}
					>
						Logout
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showDeleteAccountModal}
				onHide={() => setShowDeleteAccountModal(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Account</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					Are you sure you want to permanently delete your account? This action cannot be undone.
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowDeleteAccountModal(false)}
					>
						Cancel
					</Button>

					<Button
						variant="danger"
						onClick={deleteAccountHandler}
					>
						Delete Account
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default NavbarMobile;
