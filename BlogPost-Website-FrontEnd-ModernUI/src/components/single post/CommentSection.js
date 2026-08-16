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

	const blogPostID = props.blogPostID;

	useEffect(function () {
		fetchBlogPostComment();
	}, [blogPostID]);

	// Logged-in user
	const user = useSelector(function (state) {
		return state.userSlice.userDetail;
	});

	const [blogPostAllComments, setBlogPostAllComments] = useState(null);

	const [commentAddIsError, setCommentAddIsError] = useState(false);

	const [commentAddedSuccessMessage, setCommentAddedSuccessMessage] =
		useState(null);

	const [commentAddedErrorMessage, setCommentAddedErrorMessage] =
		useState(null);

	const [newComment, setNewComment] = useState("");
	

	function handleCommentChangeHandler(event) {
		setNewComment(event.target.value);
	}

	async function fetchBlogPostComment() {

		try {

			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/comment/${blogPostID}`
			);

			setBlogPostAllComments(response.data);

		}
		catch (error) {
			console.log(error);
		}

	}

	async function handleAddComment(event) {

		event.preventDefault();

		const token = Cookies.get("jwt_access_token");

		const values = {
			token,
			newComment,
		};

		try {

			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/comment/newComment/${blogPostID}`,
				values
			);

			await fetchBlogPostComment();

			setNewComment("");

			setCommentAddIsError(false);

			setCommentAddedSuccessMessage(response.data);

			setCommentAddedErrorMessage(null);

		}
		catch (error) {

			if (error.message === "Request failed with status code 401") {

				setCommentAddedErrorMessage(error.response.data);

			}
			else if (error.message === "Request failed with status code 406") {

				setCommentAddedErrorMessage(error.response.data);

			}
			else {

				setCommentAddedErrorMessage(error.message);

			}

			setCommentAddIsError(true);

			setCommentAddedSuccessMessage(null);

		}

	}

	return (

		<div className="modern-comment-section">

			<div className="comment-card">

				<div className="comment-header">

					<h3>
						Discussion
					</h3>

					<span>
						{blogPostAllComments ? blogPostAllComments.length : 0} Comments
					</span>

				</div>

				{
					user ?

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

								{
									commentAddIsError ?

										<div className="comment-error-message">

											<p>
												{commentAddedErrorMessage}
											</p>

										</div>

										:

										commentAddedSuccessMessage &&

										<div className="comment-success-message">

											<p>
												{commentAddedSuccessMessage}
											</p>

										</div>
								}

							</form>

						</div>

						:

						<div className="login-comment-card">

							<div className="login-icon">
								💬
							</div>

							<h5>
								Join the conversation
							</h5>

							<p>
								Please login to write a comment.
							</p>

							<Button className="login-btn">

								<NavLink
									to="/login"
									className="login-comment"
								>
									Login
								</NavLink>

							</Button>

						</div>
				}

				<div className="comment-list">

					<h4>
						Recent Comments
					</h4>

					{
						blogPostAllComments &&
						blogPostAllComments.map(function (blogPostEachComment) {

							return (

								<SingleComment
									key={blogPostEachComment._id}
									comment={blogPostEachComment}
									refetchComments={fetchBlogPostComment}
								/>

							);

						})
					}

					{
						blogPostAllComments &&
						blogPostAllComments.length === 0 &&

						<div className="no-comments">

							No comments yet. Be the first to comment.

						</div>
					}

				</div>

			</div>

		</div>

	);

}

export default CommentSection;