import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import "../../style/single post/SingleOnlyPostSection.scss";

import LikedBy from "./LikedBy.jsx";
import AIGeneratedContent from "./ai components/AIGeneratedContent.jsx";

import backendBaseURL from "../../backendBaseURL.js";


function SingleOnlyPostSection(props) {
	
	// ============================================================
	// Navigation - starts
	// ============================================================

	const navigate = useNavigate();

	// ============================================================
	// Navigation - ends
	// ============================================================



	// ============================================================
	// Get Blog Post Details From Props - starts
	// ============================================================

	const {
		singlePost,
		isUserOwnPost,
		fullDate,
		blogPostID
	} = props;

	// ============================================================
	// Get Blog Post Details From Props - ends
	// ============================================================



	// ============================================================
	// Fetch Blog Post Like Users On Post Change - starts
	// ============================================================

	useEffect(function(){
		// Fetch the users who liked the blog post
		fetchBlogPostLikeUserList();
	}, [blogPostID]);

	// ============================================================
	// Fetch Blog Post Like Users On Post Change - ends
	// ============================================================

	

	// ============================================================
	// Redux - starts
	// ============================================================

	// Get logged-in user details from Redux store
	const user = useSelector((user) => user.userSlice.userDetail);

	// ============================================================
	// Redux - ends
	// ============================================================



	// ============================================================
	// Blog Post State - starts
	// ============================================================

	const [blogPostLikedList, setBlogPostLikedList] = useState(null);

	const [showDeletePost, setShowDeletePost] = useState(false);

	const [postDeleteErrorMessage, setPostDeleteErrorMessage] = useState(null);
	const [postDeleteSuccessMessage, setPostDeleteSuccessMessage] = useState(null);

	const [userLikedThisPost, setUserLikedThisPost] = useState(false);

	// ============================================================
	// Blog Post State - ends
	// ============================================================



	// ============================================================
	// Check User Like Status - starts
	// ============================================================

	useEffect(function() {
		if (user && blogPostLikedList) {
			// Check whether the logged-in user has liked this blog post
			const userLikeDetail = blogPostLikedList.filter(function (likeElement) {
				return likeElement.userID == user.userID;
			});
			setUserLikedThisPost(userLikeDetail.length > 0);
		}
	}, [user, blogPostLikedList]);

	// ============================================================
	// Check User Like Status - ends
	// ============================================================



	// ============================================================
	// Handle Blog Post Like - starts
	// ============================================================

	async function handleLike() {
		// Get authentication token from cookies
		const token = Cookies.get("jwt_access_token");

		const values = { token };
		try {
			// Add a like for the current blog post
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/blogPostLike/like/newLike/${blogPostID}`,
				values
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}
			setUserLikedThisPost(true);
		} catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
		finally{
			// Refresh the list of users who liked the post
			fetchBlogPostLikeUserList();
		}
	}

	// ============================================================
	// Handle Blog Post Like - ends
	// ============================================================



	// ============================================================
	// Handle Blog Post Unlike - starts
	// ============================================================

	async function handleUnlike() {
		// Get authentication token from cookies
		const token = Cookies.get("jwt_access_token");

		const values = { token };
		try {

			// Remove the current user's like from the blog post
			const response = await fetch(
				`${backendBaseURL}/api/blogPost/blogPostLike/unlikePost/${blogPostID}`,
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
			setUserLikedThisPost(false);
		} catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
		finally{
			// Refresh the list of users who liked the post
			fetchBlogPostLikeUserList();
		}
	}

	// ============================================================
	// Handle Blog Post Unlike - ends
	// ============================================================



	// ============================================================
	// Fetch Blog Post Like User List - starts
	// ============================================================

	async function fetchBlogPostLikeUserList() {
		try {
			// Fetch all users who have liked the current blog post
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/blogPostLike/${blogPostID}`
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}
			setBlogPostLikedList(response.data);
		} catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
	}

	// ============================================================
	// Fetch Blog Post Like User List - ends
	// ============================================================



	// ============================================================
	// Delete Blog Post - starts
	// ============================================================

	async function handleDelete() {
		// Get authentication token from cookies
		const token = Cookies.get("jwt_access_token");

		const values = { token };
		try {

			// Delete the selected blog post
			const response = await fetch(
				`${backendBaseURL}/api/blogPost/deletePost/${blogPostID}`,
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

			setPostDeleteSuccessMessage(data);
			setPostDeleteErrorMessage(null);

			// Navigate to the home page after deleting the post
			navigate("/");
		} catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(error);
				console.log(error.response.data);
			}
		}
	}

	// ============================================================
	// Delete Blog Post - ends
	// ============================================================




	// ============================================================
    // JSX Section - starts
    // ============================================================

	return (
		<>
			<div className="modern-single-post">
				{/* Hero Image */}
				<div className="post-hero-image">
					<img src={singlePost.postImage} alt={singlePost.postTitle} />
				</div>

				{/* Title */}
				<h1 className="post-title">{singlePost.postTitle}</h1>

				{/* Author Row */}
				<div className="post-meta-row">
					<div className="author-section">
						<Image
							src={singlePost.userDetails.userProfilePhoto}
							roundedCircle
							className="author-image"
						/>

						<div className="author-details">
							<h4>{singlePost.userDetails.fullName}</h4>

							<p>
								Category :
								<span>
									{singlePost.categoryDetails.categoryName}
								</span>
							</p>
						</div>
					</div>

					<div className="post-date">
						<i className="bi bi-calendar3"></i>

						<span>Posted on {fullDate}</span>
					</div>
				</div>

				{/* Update Delete */}

				{isUserOwnPost && (
					<div className="post-action-buttons">
						<Link
							to={`/blogs/updatePost/postId/${singlePost._id}`}
							state={{ blogDetails: singlePost }}
						>
							<Button variant="warning" className="update-btn">
								Update Post
							</Button>
						</Link>

						<Button
							variant="danger"
							className="delete-btn"
							onClick={function () {
								setShowDeletePost(true);
							}}
						>
							Delete Post
						</Button>
					</div>
				)}

				{/* Like Section */}

				<div className="like-section">
					{user ? (
						<div className="like-button-area">
							{userLikedThisPost ? (
								<Button className="like-btn" onClick={handleUnlike}>
									❤ Unlike Post
								</Button>
							) : (
								<Button className="like-btn" onClick={handleLike}>
									♡ Like The Post
								</Button>
							)}
						</div>
					) : (
						<div></div>
					)}

					<div className="liked-user-area">
						<LikedBy blogPostLikedList={blogPostLikedList} />
					</div>
				</div>

				{/* Description */}

				<div
					className="post-content"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(singlePost.postDescription),
					}}
				/>

				{/* AI Content */}

				<div className="ai-content-wrapper">
					<AIGeneratedContent
						postDescription={singlePost.postDescription}
					/>
				</div>
			</div>

			{postDeleteErrorMessage && (
				<div>
					<p className="error-message">{postDeleteErrorMessage}</p>
				</div>
			)}

			<Modal
				show={showDeletePost}
				onHide={function () {
					setShowDeletePost(false);
				}}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Post</Modal.Title>
				</Modal.Header>

				<Modal.Body>Are you sure you want to delete this post?</Modal.Body>

				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={function () {
							setShowDeletePost(false);
						}}
					>
						Cancel
					</Button>

					<Button variant="danger" onClick={handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);

	// ============================================================
    // JSX Section - ends
    // ============================================================

}

export default SingleOnlyPostSection;
