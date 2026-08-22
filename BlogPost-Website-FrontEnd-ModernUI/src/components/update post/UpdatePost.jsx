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
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	//Getting the blog details which submitted to backend from SinglePost.js file
	const blogDetails = location.state.blogDetails;

	//Getting Post ID from URL
	const pathname = location.pathname;
	const splitedArray = pathname.split("/");
	const postID = splitedArray[4];

	//Getting logged-in user detail from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);
	const userID = user.userID;

	//Getting category list as object from Redux Store
	const categoriesList = useSelector((categogiesListRedux) => categogiesListRedux.blogCategorySliceName.blogCategories);

	//Intilizing title, post description and category with value submitted to backend
	const [title, setTitle] = useState(blogDetails.postTitle);
	const [postDescription, setPostDescription] = useState(blogDetails.postDescription);
	const [category, setCategory] = useState(blogDetails.categoryDetails._id);

	//If we want to edit image initialize image with null
	const [blogImage, setBlogImage] = useState(null);

	//Whether we want to edit the image
	const [isImageEdit, setIsImageEdit] = useState(false);

	// AI title suggestions
	const [titleSuggestionsByAI, setTitleSuggestionsByAI] = useState([]);
	const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);

	// AI description suggestions
	const [descriptionSuggestedByAI, setDescriptionSuggestedByAI] = useState(null);
	const [isGeneratingDescriptions, setIsGeneratingDescriptions] = useState(false);

	// AI description enhancement
	const [enhancementSuggestedByAI, setEnhancementSuggestedByAI] = useState(null);
	const [isEnhancingDescriptions, setIsEnhancingDescriptions] = useState(false);

	//Success or Failed Message while posting to backend
	const [isErrorWhileUpdating, setIsErrorWhileUpdating] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(function () {
		dispatch(getAllBlogCategory());
		if (!localStorage.getItem("user")) {
			navigate("/login");
		}
	}, []);

	useEffect(function () {
		if (successMessage !== null) {
			setTimeout(() => {
				navigate("/blogs/postId/" + postID);
			}, 3000);
		}
	}, [successMessage, navigate, postID]);

	function handleEditImage() {
		setIsImageEdit(!isImageEdit);
	}


	async function handleUpload() {
		const formData = new FormData();
		formData.append("blogImage", blogImage);
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/imageUpload/blogImage?userID=${userID}`,
				formData
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}


	async function submitHandler(event) {
		event.preventDefault();
		if (isImageEdit) {
			var imageDetail = await handleUpload();
		} else {
			var imageDetail = null;
		}
		const token = Cookies.get("jwt_access_token");
		const values = { title, postDescription, category, token, imageDetail };
		try {
			const response = await axios.put(
				`${backendBaseURL}/api/blogPost/updatePost/${postID}`,
				values
			);
			setSuccessMessage(response.data);
			setTitle("");
			setPostDescription("");
			setBlogImage(null);
			setCategory();
			setIsErrorWhileUpdating(false);
			setErrorMessage(null);
		} catch (error) {
			if (error.message === "Request failed with status code 401") {
				setErrorMessage(error.response.data);
			} else {
				setErrorMessage(error.message);
			}
			setIsErrorWhileUpdating(true);
			setSuccessMessage(null);
		}
	}


	async function generateTitleSuggestionsByGenAI() {
		const postDescriptionText = getPlainText(postDescription);
		const values = {
			blogText: postDescriptionText
		}
		if(postDescriptionText.trim().length < 30){
			return;
		}
		setIsGeneratingTitles(true);
		setTitleSuggestionsByAI([]);
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/generativeAI/suggestBlogTitlesFromBlogDescription`,
				values
			);
			const aiSuggestedTitlesArray = response.data.geminiGeneratedBlogTitles;
			setTitleSuggestionsByAI(aiSuggestedTitlesArray);
		} 
		catch (error) {
			console.log(error);
			setTitleSuggestionsByAI([]);
		}
		finally {
			setIsGeneratingTitles(false);
		}
	}
	

	async function generateDescriptionFromTitle(){
		const titleText = title;
		if(titleText.trim().length < 10){
			return;
		}
		const values = {
			blogTitle: titleText
		}
		setIsGeneratingDescriptions(true);
		setDescriptionSuggestedByAI(null);
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/generativeAI/suggestBlogDescriptionsFromTitle`,
				values
			);
			const aiSuggestedDescription = response.data.geminiGeneratedBlogDescription;
			setDescriptionSuggestedByAI(aiSuggestedDescription);
		} 
		catch (error) {
			console.log(error);
			setDescriptionSuggestedByAI(null);
		}
		finally {
			setIsGeneratingDescriptions(false);
		}
	}
	

	async function enhanceBlogDescription() {
		const postDescriptionText = getPlainText(postDescription);
		const values = {
			blogText: postDescriptionText
		}
		if(postDescriptionText.trim().length < 30){
			return;
		}
		setIsEnhancingDescriptions(true);
		setEnhancementSuggestedByAI(null);
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/generativeAI/enhanceBlogDescription`,
				values
			);
			const aiEnhancedBlogDescription = response.data.enhancedBlogDescription;
			setEnhancementSuggestedByAI(aiEnhancedBlogDescription);
		} 
		catch (error) {
			console.log(error);
			setEnhancementSuggestedByAI(null);
		}
		finally {
			setIsEnhancingDescriptions(false);
		}
	}

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
					<img
						src={writeBlogPostImage}
						alt="Write Blog"
					/>
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
							<option value="">
								Please Select
							</option>
							{
								categoriesList.map(function (categoryList) {
									return (
										<option
											key={categoryList._id}
											value={categoryList._id}
										>
											{categoryList.categoryName}
										</option>
									);
								})
							}
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

					{
						titleSuggestionsByAI.length > 0 &&
						<div className="update-title-suggestions">
							<h4>
								AI Suggested Titles
							</h4>
							<ul>
								{
									titleSuggestionsByAI.map(function (eachSuggestedTitle, index) {
										return (
											<li
												key={index}
												onClick={() => setTitle(eachSuggestedTitle)}
											>
												{eachSuggestedTitle}
											</li>
										);
									})
								}
							</ul>
						</div>
					}

					
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

					{
						descriptionSuggestedByAI !== null &&
						<div className="update-description-suggestions">
							<h4>
								AI Suggested Description
							</h4>
							<p>
								{descriptionSuggestedByAI}
							</p>
						</div>
					}

					{/* ================= AI ENHANCEMENT ================= */}

					{
						enhancementSuggestedByAI !== null &&
						<div className="update-description-enhancement">
							<h4>
								AI Enhanced Description
							</h4>
							<p>
								{enhancementSuggestedByAI}
							</p>
						</div>
					}

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
										{
											isImageEdit ? "Choose New Image" : "Replace Existing Image"
										}
									</h5>
									<p>
										Click here to update the cover image
									</p>
								</div>
							</div>
						</div>

						{
							isImageEdit &&
							<div
								style={{
									marginTop: "18px"
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
						}

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
									{
										isGeneratingTitles ? "Generating..." : "Suggest Titles"
									}
								</h5>
								<p>
									Get AI suggested engaging titles.
								</p>
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
									{
										isGeneratingDescriptions
											? "Generating..."
											: "Suggest Description"
									}
								</h5>
								<p>
									Generate a blog description from the title.
								</p>
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
									{
										isEnhancingDescriptions ? "Generating..." : "Enhance Description"
									}
								</h5>
								<p>
									Improve your content using AI.
								</p>
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

					{
						isErrorWhileUpdating ?
						<div className="update-error">
							<p>
								{errorMessage}
							</p>
						</div>
						:
						successMessage &&
						<div className="update-success">
							<p>
								{successMessage}
							</p>
						</div>
					}

				</form>

			</section>

		</div>
	);
}

export default UpdatePost;
