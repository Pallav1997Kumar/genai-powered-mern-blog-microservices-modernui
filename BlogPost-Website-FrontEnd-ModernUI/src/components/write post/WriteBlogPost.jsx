import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import "../../style/write post/Write.scss";

import backendBaseURL from "../../backendBaseURL.js";
import { getPlainText } from "../../utils/utility functions.js"
import writeBlogPostImage from "../../images/blog-writing.jpg";


function WriteBlogPost() {
	
	// ============================================================
	// Navigation - starts
	// ============================================================

	const navigate = useNavigate();

	// ============================================================
	// Navigation - ends
	// ============================================================



	// ============================================================
	// Blog Post State - starts
	// ============================================================

	// Store blog post input fields and AI suggestion states
	const [title, setTitle] = useState("");
	const [postDescription, setPostDescription] = useState("");
	const [category, setCategory] = useState("");
	const [blogImage, setBlogImage] = useState();

	// Store AI-generated title suggestions and loading state
	const [titleSuggestionsByAI, setTitleSuggestionsByAI] = useState([]);
	const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);

	// Store AI-generated description suggestions and loading state
	const [descriptionSuggestedByAI, setDescriptionSuggestedByAI] = useState(null);
	const [isGeneratingDescriptions, setIsGeneratingDescriptions] = useState(false);

	// Store AI-enhanced description and loading state
	const [enhancementSuggestedByAI, setEnhancementSuggestedByAI] = useState(null);
	const [isEnhancingDescriptions, setIsEnhancingDescriptions] = useState(false);

	// Store success and error messages while creating the blog post
	const [isErrorWhileUploading, setIsErrorWhileUploading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	// ============================================================
	// Blog Post State - ends
	// ============================================================



	// ============================================================
	// Redux - starts
	// ============================================================

	// Get blog category list from Redux store
	const categoriesList = useSelector(
		(categogiesListRedux) =>
			categogiesListRedux.blogCategorySliceName.blogCategories
	);

	// Get logged-in user details from Redux store
	const user = useSelector((user) => user.userSlice.userDetail);
	const userID = user.userID;

	// ============================================================
	// Redux - ends
	// ============================================================


	
	// ============================================================
	// Check User Authentication - starts
	// ============================================================

	useEffect(function () {
		// Redirect the user to login page if not authenticated
		if (!localStorage.getItem("user")) {
			navigate("/login");
		}

	}, []);

	// ============================================================
	// Check User Authentication - ends
	// ============================================================



	// ============================================================
	// Navigate After Successful Post Creation - starts
	// ============================================================

	useEffect(function () {
		// Navigate to the home page after showing the success message
		if (successMessage !== null) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}, [successMessage, navigate]);

	// ============================================================
	// Navigate After Successful Post Creation - ends
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
		}
		catch(error){
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(error);
			}

			setErrorMessage(error.message);
			setSuccessMessage(null);
			setIsErrorWhileUploading(true);
		}
	}

	// ============================================================
	// Upload Blog Image - ends
	// ============================================================



	// ============================================================
	// Submit New Blog Post - starts
	// ============================================================
	
	async function submitHandler(event) {
		event.preventDefault();

		// Upload the blog image before creating the blog post
		const imageDetail = await handleUpload();

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

			// Create a new blog post using the submitted details
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/newPost/post`,
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
			setErrorMessage(null);
			setIsErrorWhileUploading(false);
		} 
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}

			// Handle the validation error returned by the backend
			if (error.message === "Request failed with status code 417") {
				setErrorMessage(error.response.data);
			} else {
				setErrorMessage(error.message);
			}
			
			setSuccessMessage(null);
			setIsErrorWhileUploading(true);
		}
		if (successMessage) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}

	
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
		<div className="write-blog">
			<section className="write-hero">
				<div className="write-hero-content">
					<span className="write-welcome-text">
						Welcome {user !== null && user.fullName},
					</span>
					<h1>Write your blog here</h1>
					<div className="write-hero-line"></div>
				</div>

				<div className="write-hero-image">
					<img src={writeBlogPostImage} alt="Write Blog" />
				</div>
			</section>

			<section className="write-form-card">
				<form>
					<div className="write-form-group">
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

					<div className="write-form-group">
						<label>
							<i className="bi bi-type"></i>
							Blog Title
						</label>
						<input
							required
							type="text"
							value={title}
							maxLength={100}
							placeholder="Enter an attractive title for your blog"
							onChange={(event) => setTitle(event.target.value)}
						/>
						<span className="write-character-count">
							{title.length}/100
						</span>
					</div>

					{titleSuggestionsByAI.length > 0 && (
						<div className="write-title-suggestions">
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

					<div className="write-form-group">
						<label>
							<i className="bi bi-card-text"></i>
							Blog Description
						</label>
						<div className="write-react-quill">
							<ReactQuill
								theme="snow"
								value={postDescription}
								onChange={setPostDescription}
							/>
						</div>
					</div>

					{descriptionSuggestedByAI !== null && (
						<div className="write-description-suggestions">
							<h4>AI Suggested Description</h4>
							<p>{descriptionSuggestedByAI}</p>
						</div>
					)}

					{enhancementSuggestedByAI !== null && (
						<div className="write-description-enhancement">
							<h4>AI Enhanced Description</h4>
							<p>{enhancementSuggestedByAI}</p>
						</div>
					)}

					<div className="write-form-group">
						<label>
							<i className="bi bi-image"></i>
							Upload the image
						</label>

						<div className="write-upload-box">
							<input
								required
								type="file"
								name="blogImage"
								onChange={(event) =>
									setBlogImage(event.target.files[0])
								}
							/>

							<div className="write-upload-content">
								<i className="bi bi-cloud-arrow-up"></i>
								<div>
									<h5>
										{blogImage
											? blogImage.name
											: "Choose a file"}
									</h5>
									<p>
										{blogImage
											? `${(blogImage.size / 1024 / 1024).toFixed(2)} MB`
											: "JPG, PNG or WEBP"}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="write-ai-suggestions-section">
						<div
							className={`write-ai-card ${isGeneratingTitles ? "loading" : ""}`}
							onClick={generateTitleSuggestionsByGenAI}
						>
							<div className="write-ai-icon purple">
								<i className="bi bi-magic"></i>
							</div>
							<div className="write-ai-text">
								<h5>
									{isGeneratingTitles
										? "Generating..."
										: "Suggest Titles"}
								</h5>
								<p>Get AI suggested engaging titles.</p>
							</div>
							<i className="bi bi-arrow-right write-ai-arrow"></i>
						</div>

						<div
							className={`write-ai-card ${isGeneratingDescriptions ? "loading" : ""}`}
							onClick={generateDescriptionFromTitle}
						>
							<div className="write-ai-icon blue">
								<i className="bi bi-file-earmark-text"></i>
							</div>
							<div className="write-ai-text">
								<h5>
									{isGeneratingDescriptions
										? "Generating..."
										: "Suggest Description"}
								</h5>
								<p>Generate a blog description from the title.</p>
							</div>
							<i className="bi bi-arrow-right write-ai-arrow"></i>
						</div>

						<div
							className={`write-ai-card ${isEnhancingDescriptions ? "loading" : ""}`}
							onClick={enhanceBlogDescription}
						>
							<div className="write-ai-icon pink">
								<i className="bi bi-stars"></i>
							</div>
							<div className="write-ai-text">
								<h5>
									{isEnhancingDescriptions
										? "Generating..."
										: "Enhance Description"}
								</h5>
								<p>Improve your content using AI.</p>
							</div>
							<i className="bi bi-arrow-right write-ai-arrow"></i>
						</div>
					</div>

					<div className="write-publish-section">
						<Button
							variant=""
							className="write-publish-btn"
							onClick={submitHandler}
						>
							<i className="bi bi-send-fill"></i>
							Publish your blog
						</Button>
					</div>

					{isErrorWhileUploading ? (
						<div className="write-error">
							<p>{errorMessage}</p>
						</div>
					) : (
						successMessage && (
							<div className="write-success">
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

export default WriteBlogPost;
