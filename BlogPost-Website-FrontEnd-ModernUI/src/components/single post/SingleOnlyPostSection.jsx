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
	const navigate = useNavigate();

	const { singlePost, isUserOwnPost, fullDate, blogPostID } = props;

	useEffect(function(){
		fetchBlogPostLikeUserList();
	}, [blogPostID]);

	//Getting logged-in user information from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);

	const [blogPostLikedList, setBlogPostLikedList] = useState(null);

	//Modals
	const [showDeletePost, setShowDeletePost] = useState(false);

	const [postDeleteErrorMessage, setPostDeleteErrorMessage] = useState(null);
	const [postDeleteSuccessMessage, setPostDeleteSuccessMessage] = useState(null);

	const [userLikedThisPost, setUserLikedThisPost] = useState(false);

	useEffect(function() {
		if (user && blogPostLikedList) {
			const userLikeDetail = blogPostLikedList.filter(function (likeElement) {
				return likeElement.userID == user.userID;
			});
			setUserLikedThisPost(userLikeDetail.length > 0);
		}
	}, [user, blogPostLikedList]);

	async function handleLike() {
		const token = Cookies.get("jwt_access_token");
		const values = { token };
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/blogPostLike/like/newLike/${blogPostID}`,
				values
			);
			setUserLikedThisPost(true);
		} catch (error) {
			console.log(error);
		}
		finally{
			fetchBlogPostLikeUserList();
		}
	}

	async function handleUnlike() {
		const token = Cookies.get("jwt_access_token");
		const values = { token };
		try {
			const response = await fetch(
				`${backendBaseURL}/api/blogPost/blogPostLike/unlikePost/${blogPostID}`,
				{
					method: "DELETE",
					body: JSON.stringify(values),
					headers: { "Content-type": "application/json; charset=UTF-8" },
				}
			);
			const data = await response.json();
			setUserLikedThisPost(false);
		} catch (error) {
			console.log(error);
		}
		finally{
			fetchBlogPostLikeUserList();
		}
	}


	async function fetchBlogPostLikeUserList() {
		try {
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/blogPostLike/${blogPostID}`
			);
			setBlogPostLikedList(response.data);
		} catch (error) {
			console.log(error);
		}
	}


	async function handleDelete() {
		const token = Cookies.get("jwt_access_token");
		const values = { token };
		try {
			const response = await fetch(
				`${backendBaseURL}/api/blogPost/deletePost/${blogPostID}`,
				{
					method: "DELETE",
					body: JSON.stringify(values),
					headers: { "Content-type": "application/json; charset=UTF-8" },
				}
			);
			const data = await response.json();
			setPostDeleteSuccessMessage(data);
			setPostDeleteErrorMessage(null);
			navigate("/");
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
		}
	}

	return (
		<>
			<div className="modern-single-post">

				{/* Hero Image */}
				<div className="post-hero-image">
					<img
						src={singlePost.postImage}
						alt={singlePost.postTitle}
					/>
				</div>

				{/* Title */}
				<h1 className="post-title">
					{singlePost.postTitle}
				</h1>

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

						<span>
							Posted on {fullDate}
						</span>

					</div>

				</div>

				{/* Update Delete */}

				{
					isUserOwnPost &&

					<div className="post-action-buttons">

						<Link
							to={`/blogs/updatePost/postId/${singlePost._id}`}
							state={{ blogDetails: singlePost }}
						>

							<Button
								variant="warning"
								className="update-btn"
							>
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
				}

				{/* Like Section */}

				<div className="like-section">

					{
						user ?

							<div className="like-button-area">

								{
									userLikedThisPost ?

										<Button
											className="like-btn"
											onClick={handleUnlike}
										>
											❤ Unlike Post
										</Button>

										:

										<Button
											className="like-btn"
											onClick={handleLike}
										>
											♡ Like The Post
										</Button>
								}

							</div>

							:

							<div></div>
					}

					<div className="liked-user-area">

						<LikedBy
							blogPostLikedList={blogPostLikedList}
						/>

					</div>

				</div>

				{/* Description */}

				<div
					className="post-content"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(
							singlePost.postDescription
						),
					}}
				/>

				{/* AI Content */}

				<div className="ai-content-wrapper">

					<AIGeneratedContent
						postDescription={singlePost.postDescription}
					/>

				</div>

			</div>

			{
				postDeleteErrorMessage &&

				<div>

					<p className="error-message">
						{postDeleteErrorMessage}
					</p>

				</div>
			}

			<Modal
				show={showDeletePost}
				onHide={function () {
					setShowDeletePost(false);
				}}
				centered
			>

				<Modal.Header closeButton>

					<Modal.Title>
						Delete Post
					</Modal.Title>

				</Modal.Header>

				<Modal.Body>

					Are you sure you want to delete this post?

				</Modal.Body>

				<Modal.Footer>

					<Button
						variant="secondary"
						onClick={function () {
							setShowDeletePost(false);
						}}
					>
						Cancel
					</Button>

					<Button
						variant="danger"
						onClick={handleDelete}
					>
						Delete
					</Button>

				</Modal.Footer>

			</Modal>

		</>
	);
}

export default SingleOnlyPostSection;
