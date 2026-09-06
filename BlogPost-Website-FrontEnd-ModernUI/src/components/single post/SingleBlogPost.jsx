import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import "../../style/single post/SinglePost.scss";

import SingleOnlyPostSection from "./SingleOnlyPostSection";
import CommentSection from "./CommentSection";
import backendBaseURL from "../../backendBaseURL";

function SingleBlogPost() {

	// ============================================================
	// Redux - starts
	// ============================================================

	const user = useSelector(function (state) {
		return state.userSlice.userDetail;
	});

	// ============================================================
	// Redux - ends
	// ============================================================

	
	
	// ============================================================
	// Get Blog Post ID From URL - starts
	// ============================================================

	const location = useLocation();
	const pathname = location.pathname;
	const splitedArray = pathname.split("/");
	const blogPostID = splitedArray[3];

	// ============================================================
	// Get Blog Post ID From URL - ends
	// ============================================================

	
	
	// ============================================================
	// Blog Post Details State - starts
	// ============================================================

	const [blogPostDetails, setBlogPostDetails] = useState(null);

	// ============================================================
	// Blog Post Details State - ends
	// ============================================================



	// ============================================================
	// Fetch Blog Post Details On Component Load - starts
	// ============================================================

	useEffect(function () {
		getParticularBlogPost();
	}, []);

	// ============================================================
	// Fetch Blog Post Details On Component Load - ends
	// ============================================================



	// ============================================================
	// Fetch Particular Blog Post - starts
	// ============================================================

	async function getParticularBlogPost() {
		try {
			// Fetch the blog post details using the post ID
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postId/${blogPostID}`
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}
			setBlogPostDetails(response.data);
		}
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
	}

	// ============================================================
	// Fetch Particular Blog Post - ends
	// ============================================================
	


	// ============================================================
	// Blog Post Loading State - starts
	// ============================================================

	if (!blogPostDetails) {
		return (
			<div className="single-post-loading">
				<div className="loading-card">
					Loading post...
				</div>
			</div>
		);
	}

	// ============================================================
	// Blog Post Loading State - ends
	// ============================================================



	// ============================================================
	// Check Blog Post Ownership - starts
	// ============================================================

	var isUserOwnPost = false;

	if (
		user !== null &&
		user.userID == blogPostDetails[0].userDetails._id
	) {
		isUserOwnPost = true;
	}

	// ============================================================
	// Check Blog Post Ownership - ends
	// ============================================================



	// ============================================================
	// Convert Post Date Time To Indian Time - starts
	// ============================================================

	const indiaDateTime = new Date(
		blogPostDetails[0].postDateTime
	).toLocaleString(undefined, {
		timeZone: "Asia/Kolkata",
	});

	const indianDateTime = new Date(indiaDateTime);

	// ============================================================
	// Convert Post Date Time To Indian Time - ends
	// ============================================================



	// ============================================================
	// Date And Day Names - starts
	// ============================================================

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	// ============================================================
	// Date And Day Names - ends
	// ============================================================



	// ============================================================
	// Format Blog Post Date Time - starts
	// ============================================================

	const fullDate =
		days[indianDateTime.getDay()] +
		", " +
		indianDateTime.getDate() +
		" " +
		months[indianDateTime.getMonth()] +
		" " +
		indianDateTime.getFullYear() +
		", " +
		indianDateTime.getHours() +
		":" +
		String(indianDateTime.getMinutes()).padStart(2, "0") +
		":" +
		String(indianDateTime.getSeconds()).padStart(2, "0");

	// ============================================================
	// Format Blog Post Date Time - ends
	// ============================================================




	// ============================================================
    // JSX Section - starts
    // ============================================================

	return (
		<div className="single-post-page">
			<div className="single-post-container">
				<div className="single-post-left">
					<SingleOnlyPostSection
						singlePost={blogPostDetails[0]}
						blogPostID={blogPostID}
						isUserOwnPost={isUserOwnPost}
						fullDate={fullDate}
					/>
				</div>

				<aside className="single-post-right">
					<CommentSection blogPostID={blogPostID} />
				</aside>
			</div>
		</div>
	);

	// ============================================================
    // JSX Section - ends
    // ============================================================

}

export default SingleBlogPost;

