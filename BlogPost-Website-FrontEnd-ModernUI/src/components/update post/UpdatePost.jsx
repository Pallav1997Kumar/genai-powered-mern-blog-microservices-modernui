import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";

import { getAllBlogCategory } from "../../store/allBlogCategorySlice.js";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import "../../style/update post/UpdatePost.scss";

import backendBaseURL from "../../backendBaseURL.js";
import { getPlainText } from "../../utils/utility functions.js"
import writeBlogPostImage from "../../images/blog-writing.jpg";


function UpdatePost() {
	// ============================================================
	// Redux - starts
	// ============================================================

	const dispatch = useDispatch();

	// Get logged-in user details from Redux store
	const user = useSelector((user) => user.userSlice.userDetail);
	const userID = user.userID;

	// Get blog category list from Redux store
	const categoriesList = useSelector(
		(categogiesListRedux) =>
			categogiesListRedux.blogCategorySliceName.blogCategories
	);

	// ============================================================
	// Redux - ends
	// ============================================================



	// ============================================================
	// Navigation - starts
	// ============================================================

	const navigate = useNavigate();

	// ============================================================
	// Navigation - ends
	// ============================================================



	// ============================================================
	// Location And Post ID - starts
	// ============================================================

	const location = useLocation();

	// Get the blog post details passed from SinglePost.js
	const blogDetails = location.state.blogDetails;

	// Get the blog post ID from the current URL
	const pathname = location.pathname;
	const splitedArray = pathname.split("/");
	const postID = splitedArray[4];

	// ============================================================
	// Location And Post ID - ends
	// ============================================================



	// ============================================================
	// Blog Post State - starts
	// ============================================================
	
	//Intilizing title, post description and category with value submitted to backend
	const [title, setTitle] = useState(blogDetails.postTitle);
	const [postDescription, setPostDescription] = useState(blogDetails.postDescription);
	const [category, setCategory] = useState(blogDetails.categoryDetails._id);

	// Store the new image when the user chooses to edit the image
	const [blogImage, setBlogImage] = useState(null);

	// Track whether the user wants to edit the blog image
	const [isImageEdit, setIsImageEdit] = useState(false);

	// Store AI-generated title suggestions and loading state
	const [titleSuggestionsByAI, setTitleSuggestionsByAI] = useState([]);
	const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);

	// Store AI-generated description suggestions and loading state
	const [descriptionSuggestedByAI, setDescriptionSuggestedByAI] = useState(null);
	const [isGeneratingDescriptions, setIsGeneratingDescriptions] = useState(false);

	// Store AI-enhanced description and loading state
	const [enhancementSuggestedByAI, setEnhancementSuggestedByAI] = useState(null);
	const [isEnhancingDescriptions, setIsEnhancingDescriptions] = useState(false);

	// Store success and error messages while updating the blog post
	const [isErrorWhileUpdating, setIsErrorWhileUpdating] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	// ============================================================
	// Blog Post State - ends
	// ============================================================



	// ============================================================
	// Fetch Categories And Check Authentication - starts
	// ============================================================

	useEffect(function () {
		// Fetch all available blog categories
		dispatch(getAllBlogCategory());

		// Redirect to login if the user is not logged in
		if (!localStorage.getItem("user")) {
			navigate("/login");
		}
	}, []);

	// ============================================================
	// Fetch Categories And Check Authentication - ends
	// ============================================================



	// ============================================================
	// Navigate After Successful Update - starts
	// ============================================================

	useEffect(function () {
		// Navigate to the updated post after showing the success message
		if (successMessage !== null) {
			setTimeout(() => {
				navigate("/blogs/postId/" + postID);
			}, 3000);
		}
	}, [successMessage, navigate, postID]);

	// ============================================================
	// Navigate After Successful Update - ends
	// ============================================================


	
	// ============================================================
	// Handle Image Edit - starts
	// ============================================================

	function handleEditImage() {
		setIsImageEdit(!isImageEdit);
	}

	// ============================================================
	// Handle Image Edit - ends
	// ============================================================



	// ============================================================
	// Upload Blog Image - starts
	// ============================================================

	async function handleUpload() {
		const formData = new FormData();
		formData.append("blogImage", blogImage);
		try {

			// Upload the selected blog image for the logged-in user
			const response = await axios.post(
				`${backendBaseURL}/api/imageUpload/blogImage?userID=${userID}`,
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
		}
	}

	// ============================================================
	// Upload Blog Image - ends
	// ============================================================



	// ============================================================
	// Update Blog Post - starts
	// ============================================================

	async function submitHandler(event) {
		event.preventDefault()
		
		// Upload a new image only when image editing is enabled
		if (isImageEdit) {
			var imageDetail = await handleUpload();
		} else {
			var imageDetail = null;
		}

		// Get authentication token from cookies
		const token = Cookies.get("jwt_access_token");

		const values = { 
			title, 
			postDescription, 
			category, 
			token, 
			imageDetail 
		};

		try {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(values);
			}

			// Update the selected blog post
			const response = await axios.put(
				`${backendBaseURL}/api/blogPost/updatePost/${postID}`,
				values
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			setSuccessMessage(response.data);
			setTitle("");
			setPostDescription("");
			setBlogImage(null);
			setCategory();
			setIsErrorWhileUpdating(false);
			setErrorMessage(null);
		} 
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}

			// Handle unauthorized user error
			if (error.message === "Request failed with status code 401") {
				setErrorMessage(error.response.data);
			} else {
				setErrorMessage(error.message);
			}

			setIsErrorWhileUpdating(true);
			setSuccessMessage(null);
		}
	}

	// ============================================================
	// Update Blog Post - ends
	// ============================================================



	// ============================================================
	// Generate AI Title Suggestions - starts
	// ============================================================

	async function generateTitleSuggestionsByGenAI() {
		// Convert the blog description into plain text for the AI request
		const postDescriptionText = getPlainText(postDescription);

		const values = {
			blogText: postDescriptionText
		}

		// Do not generate suggestions when the description is too short
		if(postDescriptionText.trim().length < 30){
			return;
		}

		setIsGeneratingTitles(true);
		setTitleSuggestionsByAI([]);
		
		try {
			// Generate blog title suggestions using the AI service
			const response = await axios.post(
				`${backendBaseURL}/api/generativeAI/suggestBlogTitlesFromBlogDescription`,
				values
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			const aiSuggestedTitlesArray = response.data.geminiGeneratedBlogTitles;
			setTitleSuggestionsByAI(aiSuggestedTitlesArray);
		} 
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
			setTitleSuggestionsByAI([]);
		}
		finally {
			setIsGeneratingTitles(false);
		}
	}
	
	// ============================================================
	// Generate AI Title Suggestions - ends
	// ============================================================



	// ============================================================
	// Generate Blog Description From Title - starts
	// ============================================================

	async function generateDescriptionFromTitle(){
		const titleText = title;

		// Do not generate a description when the title is too short
		if(titleText.trim().length < 10){
			return;
		}

		const values = {
			blogTitle: titleText
		}

		setIsGeneratingDescriptions(true);
		setDescriptionSuggestedByAI(null);
		
		try {

			// Generate a blog description based on the current title
			const response = await axios.post(
				`${backendBaseURL}/api/generativeAI/suggestBlogDescriptionsFromTitle`,
				values
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			const aiSuggestedDescription = response.data.geminiGeneratedBlogDescription;
			setDescriptionSuggestedByAI(aiSuggestedDescription);
		} 
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
			setDescriptionSuggestedByAI(null);
		}
		finally {
			setIsGeneratingDescriptions(false);
		}
	}
	
	// ============================================================
	// Generate Blog Description From Title - ends
	// ============================================================



	// ============================================================
	// Enhance Blog Description With AI - starts
	// ============================================================

	async function enhanceBlogDescription() {
		// Convert the current blog description into plain text
		const postDescriptionText = getPlainText(postDescription);
		
		const values = {
			blogText: postDescriptionText
		}
		
		// Do not enhance the description when it is too short
		if(postDescriptionText.trim().length < 30){
			return;
		}
		
		setIsEnhancingDescriptions(true);
		setEnhancementSuggestedByAI(null);
		
		try {
			// Send the blog description to the AI enhancement service
			const response = await axios.post(
				`${backendBaseURL}/api/generativeAI/enhanceBlogDescription`,
				values
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			const aiEnhancedBlogDescription = response.data.enhancedBlogDescription;
			setEnhancementSuggestedByAI(aiEnhancedBlogDescription);
		} 
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
			setEnhancementSuggestedByAI(null);
		}
		finally {
			setIsEnhancingDescriptions(false);
		}
	}

	// ============================================================
	// Enhance Blog Description With AI - ends
	// ============================================================



	
	// ============================================================
    // JSX Section - starts
    // ============================================================

	return (
		<div className="update-blog">
			{/* ================= HERO ================= */}

			<section className="update-hero">
				<div className="update-hero-content">
					<span className="update-welcome-text">
						Welcome {user !== null && user.fullName},
					</span>
					<h1>Update your blog</h1>
					<div className="update-hero-line"></div>
				</div>

				<div className="update-hero-image">
					<img src={writeBlogPostImage} alt="Write Blog" />
				</div>
			</section>

			{/* ================= FORM ================= */}

			<section className="update-form-card">
				<form>
					{/* Category */}

					<div className="update-form-group">
						<label>
							<i className="bi bi-grid"></i>
							Select Category
						</label>

						<select
							value={category}
							onChange={(event) => setCategory(event.target.value)}
						>
							<option value="">Please Select</option>
							{categoriesList.map(function (categoryList) {
								return (
									<option
										key={categoryList._id}
										value={categoryList._id}
									>
										{categoryList.categoryName}
									</option>
								);
							})}
						</select>
					</div>

					{/* Title */}

					<div className="update-form-group">
						<label>
							<i className="bi bi-type"></i>
							Blog Title
						</label>

						<input
							required
							type="text"
							value={title}
							maxLength={100}
							placeholder="Update your blog title"
							onChange={(event) => setTitle(event.target.value)}
						/>

						<span className="update-character-count">
							{title.length}/100
						</span>
					</div>

					{/* AI Title Suggestions */}

					{titleSuggestionsByAI.length > 0 && (
						<div className="update-title-suggestions">
							<h4>AI Suggested Titles</h4>
							<ul>
								{titleSuggestionsByAI.map(
									function (eachSuggestedTitle, index) {
										return (
											<li
												key={index}
												onClick={() =>
													setTitle(eachSuggestedTitle)
												}
											>
												{eachSuggestedTitle}
											</li>
										);
									},
								)}
							</ul>
						</div>
					)}

					{/* ================= BLOG DESCRIPTION ================= */}

					<div className="update-form-group">
						<label>
							<i className="bi bi-card-text"></i>
							Blog Description
						</label>
						<div className="update-react-quill">
							<ReactQuill
								theme="snow"
								value={postDescription}
								onChange={setPostDescription}
							/>
						</div>
					</div>

					{/* ================= AI DESCRIPTION ================= */}

					{descriptionSuggestedByAI !== null && (
						<div className="update-description-suggestions">
							<h4>AI Suggested Description</h4>
							<p>{descriptionSuggestedByAI}</p>
						</div>
					)}

					{/* ================= AI ENHANCEMENT ================= */}

					{enhancementSuggestedByAI !== null && (
						<div className="update-description-enhancement">
							<h4>AI Enhanced Description</h4>
							<p>{enhancementSuggestedByAI}</p>
						</div>
					)}

					{/* ================= IMAGE ================= */}

					<div className="update-form-group">
						<label>
							<i className="bi bi-image"></i>
							Blog Image
						</label>

						<div
							className="update-upload-box"
							onClick={handleEditImage}
						>
							<div className="update-upload-content">
								<i className="bi bi-cloud-arrow-up"></i>
								<div>
									<h5>
										{isImageEdit
											? "Choose New Image"
											: "Replace Existing Image"}
									</h5>
									<p>Click here to update the cover image</p>
								</div>
							</div>
						</div>

						{isImageEdit && (
							<div
								style={{
									marginTop: "18px",
								}}
							>
								<input
									required
									type="file"
									name="blogImage"
									onChange={(event) =>
										setBlogImage(event.target.files[0])
									}
								/>
							</div>
						)}
					</div>

					{/* ================= AI ACTIONS ================= */}

					<div className="update-ai-suggestions-section">
						<div
							className={`update-ai-card ${isGeneratingTitles ? "loading" : ""}`}
							onClick={generateTitleSuggestionsByGenAI}
						>
							<div className="update-ai-icon purple">
								<i className="bi bi-magic"></i>
							</div>

							<div className="update-ai-text">
								<h5>
									{isGeneratingTitles
										? "Generating..."
										: "Suggest Titles"}
								</h5>
								<p>Get AI suggested engaging titles.</p>
							</div>

							<i className="bi bi-arrow-right update-ai-arrow"></i>
						</div>

						<div
							className={`update-ai-card ${isGeneratingDescriptions ? "loading" : ""}`}
							onClick={generateDescriptionFromTitle}
						>
							<div className="update-ai-icon blue">
								<i className="bi bi-file-earmark-text"></i>
							</div>

							<div className="update-ai-text">
								<h5>
									{isGeneratingDescriptions
										? "Generating..."
										: "Suggest Description"}
								</h5>
								<p>Generate a blog description from the title.</p>
							</div>

							<i className="bi bi-arrow-right update-ai-arrow"></i>
						</div>

						<div
							className={`update-ai-card ${isEnhancingDescriptions ? "loading" : ""}`}
							onClick={enhanceBlogDescription}
						>
							<div className="update-ai-icon pink">
								<i className="bi bi-stars"></i>
							</div>

							<div className="update-ai-text">
								<h5>
									{isEnhancingDescriptions
										? "Generating..."
										: "Enhance Description"}
								</h5>
								<p>Improve your content using AI.</p>
							</div>

							<i className="bi bi-arrow-right update-ai-arrow"></i>
						</div>
					</div>

					{/* ================= UPDATE BUTTON ================= */}

					<div className="update-publish-section">
						<Button
							variant=""
							className="update-publish-btn"
							onClick={submitHandler}
						>
							<i className="bi bi-pencil-square"></i>
							Update Blog
						</Button>
					</div>

					{/* ================= STATUS MESSAGE ================= */}

					{isErrorWhileUpdating ? (
						<div className="update-error">
							<p>{errorMessage}</p>
						</div>
					) : (
						successMessage && (
							<div className="update-success">
								<p>{successMessage}</p>
							</div>
						)
					)}
				</form>
			</section>
		</div>
	);

	// ============================================================
    // JSX Section - ends
    // ============================================================

}

export default UpdatePost;
