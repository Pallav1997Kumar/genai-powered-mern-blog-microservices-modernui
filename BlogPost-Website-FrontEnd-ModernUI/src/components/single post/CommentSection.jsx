import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";

import "../../style/single post/CommentSection.scss";

import Button from "react-bootstrap/Button";

import SingleComment from "./SingleComment";

import backendBaseURL from "../../backendBaseURL";

function CommentSection(props) {

	// ============================================================
	// Get Blog Post ID - starts
	// ============================================================

	const blogPostID = props.blogPostID;

	// ============================================================
	// Get Blog Post ID - ends
	// ============================================================



	// ============================================================
	// Fetch Comments On Blog Post Change - starts
	// ============================================================

	useEffect(function () {
		// Fetch comments whenever the blog post ID changes
		fetchBlogPostComment();
	}, [blogPostID]);
	
	// ============================================================
	// Fetch Comments On Blog Post Change - ends
	// ============================================================



	// ============================================================
	// Redux - starts
	// ============================================================

	// Get logged-in user details from Redux store
	const user = useSelector(function (state) {
		return state.userSlice.userDetail;
	});

	// ============================================================
	// Redux - ends
	// ============================================================



	// ============================================================
	// Blog Post Comment State - starts
	// ============================================================

	const [blogPostAllComments, setBlogPostAllComments] = useState(null);
	const [commentAddIsError, setCommentAddIsError] = useState(false);
	const [commentAddedSuccessMessage, setCommentAddedSuccessMessage] = useState(null);
	const [commentAddedErrorMessage, setCommentAddedErrorMessage] = useState(null);
	const [newComment, setNewComment] = useState("");

	// ============================================================
	// Blog Post Comment State - ends
	// ============================================================
	


	// ============================================================
	// Handle Comment Input Change - starts
	// ============================================================

	function handleCommentChangeHandler(event) {
		setNewComment(event.target.value);
	}

	// ============================================================
	// Handle Comment Input Change - ends
	// ============================================================	



	// ============================================================
	// Fetch Blog Post Comments - starts
	// ============================================================

	async function fetchBlogPostComment() {
		try {

			// Fetch all comments for the selected blog post
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/comment/${blogPostID}`
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}
			setBlogPostAllComments(response.data);

		}
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
	}

	// ============================================================
	// Fetch Blog Post Comments - ends
	// ============================================================



	// ============================================================
	// Add New Blog Post Comment - starts
	// ============================================================

	async function handleAddComment(event) {
		event.preventDefault();

		// Get authentication token from cookies
		const token = Cookies.get("jwt_access_token");

		const values = {
			token,
			newComment,
		};

		try {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(values);
			}

			// Send the new comment to the backend
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/comment/newComment/${blogPostID}`,
				values
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			// Refresh the comments after successfully adding a comment
			await fetchBlogPostComment();

			// Clear the comment input field
			setNewComment("");

			// Reset error state and display success message
			setCommentAddIsError(false);
			setCommentAddedSuccessMessage(response.data);
			setCommentAddedErrorMessage(null);
		}
		catch (error) {

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}

			if (error.message === "Request failed with status code 401") {
				// Handle unauthorized user error
				setCommentAddedErrorMessage(error.response.data);
			}
			else if (error.message === "Request failed with status code 406") {
				// Handle invalid comment request error
				setCommentAddedErrorMessage(error.response.data);
			}
			else {
				// Handle any other error
				setCommentAddedErrorMessage(error.message);
			}

			// Set error state and clear any previous success message
			setCommentAddIsError(true);
			setCommentAddedSuccessMessage(null);
		}

	}

	// ============================================================
	// Add New Blog Post Comment - ends
	// ============================================================
	



	// ============================================================
    // JSX Section - starts
    // ============================================================

	return (
		<div className="modern-comment-section">
			<div className="comment-card">
				<div className="comment-header">
					<h3>Discussion</h3>
					<span>
						{blogPostAllComments ? blogPostAllComments.length : 0}{" "}
						Comments
					</span>
				</div>

				{user ? (
					<div className="comment-editor">
						<form>
							<textarea
								rows="5"
								placeholder="Share your thoughts..."
								value={newComment}
								onChange={handleCommentChangeHandler}
							/>

							<div className="comment-submit">
								<Button
									onClick={handleAddComment}
									className="post-comment-btn"
								>
									Post Comment
								</Button>
							</div>

							{commentAddIsError ? (
								<div className="comment-error-message">
									<p>{commentAddedErrorMessage}</p>
								</div>
							) : (
								commentAddedSuccessMessage && (
									<div className="comment-success-message">
										<p>{commentAddedSuccessMessage}</p>
									</div>
								)
							)}
						</form>
					</div>
				) : (
					<div className="login-comment-card">
						<div className="login-icon">💬</div>
						<h5>Join the conversation</h5>
						<p>Please login to write a comment.</p>
						<Button className="login-btn">
							<NavLink to="/login" className="login-comment">
								Login
							</NavLink>
						</Button>
					</div>
				)}

				<div className="comment-list">
					<h4>Recent Comments</h4>

					{blogPostAllComments &&
						blogPostAllComments.map(function (blogPostEachComment) {
							return (
								<SingleComment
									key={blogPostEachComment._id}
									comment={blogPostEachComment}
									refetchComments={fetchBlogPostComment}
								/>
							);
						})}

					{blogPostAllComments && blogPostAllComments.length === 0 && (
						<div className="no-comments">
							No comments yet. Be the first to comment.
						</div>
					)}
				</div>
			</div>
		</div>
	);

	// ============================================================
    // JSX Section - ends
    // ============================================================


}

export default CommentSection;