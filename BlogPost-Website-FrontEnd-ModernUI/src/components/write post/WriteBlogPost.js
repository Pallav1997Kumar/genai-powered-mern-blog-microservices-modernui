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
	const navigate = useNavigate();

	//All inputs fields
	const [title, setTitle] = useState("");
	const [postDescription, setPostDescription] = useState("");
	const [category, setCategory] = useState("");
	const [blogImage, setBlogImage] = useState();

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
	const [isErrorWhileUploading, setIsErrorWhileUploading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	//Getting category list as object from Redux Store
	const categoriesList = useSelector((categogiesListRedux) => categogiesListRedux.blogCategorySliceName.blogCategories);

	//Getting logged-in user detail from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);
	const userID = user.userID;

	
	useEffect(function () {
		if (!localStorage.getItem("user")) {
			navigate("/login");
		}
	}, []);

	useEffect(function () {
		if (successMessage !== null) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}, [successMessage, navigate]);

	
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
			setErrorMessage(error.message);
			setSuccessMessage(null);
			setIsErrorWhileUploading(true);
		}
	}

	
	async function submitHandler(event) {
		event.preventDefault();
		const imageDetail = await handleUpload();
		const token = Cookies.get("jwt_access_token");
		const values = { title, postDescription, category, token, imageDetail };
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/newPost/post`,
				values
			);
			setSuccessMessage(response.data);
			setTitle("");
			setPostDescription("");
			setBlogImage(null);
			setCategory();
			setErrorMessage(null);
			setIsErrorWhileUploading(false);
		} catch (error) {
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
			console.log(typeof(aiSuggestedTitlesArray));
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
					<img
						src={writeBlogPostImage}
						alt="Write Blog"
					/>
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
							onChange={(event)=>setCategory(event.target.value)}
						>
							<option value="">
								Please Select
							</option>
							{categoriesList.map(function(categoryList){
								return(
									<option
										key={categoryList._id}
										value={categoryList._id}
									>
										{categoryList.categoryName}
									</option>
								)
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
							onChange={(event)=>setTitle(event.target.value)}
						/>
						<span className="write-character-count">
							{title.length}/100
						</span>
					</div>

					{
					titleSuggestionsByAI.length>0 &&
					<div className="write-title-suggestions">
						<h4>AI Suggested Titles</h4>
						<ul>
							{
							titleSuggestionsByAI.map(function(eachSuggestedTitle,index){
								return(
									<li
										key={index}
										onClick={()=>setTitle(eachSuggestedTitle)}
									>
										{eachSuggestedTitle}
									</li>
								)
							})
							}
						</ul>
					</div>
					}

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

					{
					descriptionSuggestedByAI!==null &&
					<div className="write-description-suggestions">
						<h4>
							AI Suggested Description
						</h4>
						<p>
							{descriptionSuggestedByAI}
						</p>
					</div>
					}

					{
					enhancementSuggestedByAI!==null &&
					<div className="write-description-enhancement">
						<h4>
							AI Enhanced Description
						</h4>
						<p>
							{enhancementSuggestedByAI}
						</p>
					</div>
					}

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
								onChange={(event)=>setBlogImage(event.target.files[0])}
							/>

							<div className="write-upload-content">
								<i className="bi bi-cloud-arrow-up"></i>
								<div>
									<h5>
										{blogImage ? blogImage.name : "Choose a file"}
									</h5>
									<p>
										{blogImage
											? `${(blogImage.size / 1024 / 1024).toFixed(2)} MB`
											: "JPG, PNG or WEBP"
										}
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
									{isGeneratingTitles ? "Generating..." : "Suggest Titles"}
								</h5>
								<p>
									Get AI suggested engaging titles.
								</p>
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
									{isGeneratingDescriptions ? "Generating..." : "Suggest Description"}
								</h5>
								<p>
									Generate a blog description from the title.
								</p>
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
									{isEnhancingDescriptions ? "Generating..." : "Enhance Description"}

								</h5>
								<p>
									Improve your content using AI.
								</p>
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

					{
					isErrorWhileUploading ?
					<div className="write-error">
						<p>
							{errorMessage}
						</p>
					</div>
					:
					successMessage &&
					<div className="write-success">
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

export default WriteBlogPost;
