import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import "../../style/single post/SinglePost.scss";

import SingleOnlyPostSection from "./SingleOnlyPostSection";
import CommentSection from "./CommentSection";
import backendBaseURL from "../../backendBaseURL";

function SingleBlogPost() {

	// Logged-in user
	const user = useSelector(function (state) {
		return state.userSlice.userDetail;
	});

	// Getting Post ID from URL
	const location = useLocation();
	const pathname = location.pathname;
	const splitedArray = pathname.split("/");
	const blogPostID = splitedArray[3];

	const [blogPostDetails, setBlogPostDetails] = useState(null);

	useEffect(function () {
		getParticularBlogPost();
	}, []);

	async function getParticularBlogPost() {
		try {
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postId/${blogPostID}`
			);

			setBlogPostDetails(response.data);
		}
		catch (error) {
			console.log(error);
		}
	}
	

	if (!blogPostDetails) {
		return (
			<div className="single-post-loading">
				<div className="loading-card">
					Loading post...
				</div>
			</div>
		);
	}

	// Checking ownership
	var isUserOwnPost = false;

	if (
		user !== null &&
		user.userID == blogPostDetails[0].userDetails._id
	) {
		isUserOwnPost = true;
	}

	const indiaDateTime = new Date(
		blogPostDetails[0].postDateTime
	).toLocaleString(undefined, {
		timeZone: "Asia/Kolkata",
	});

	const indianDateTime = new Date(indiaDateTime);

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

					<CommentSection
						blogPostID={blogPostID}
					/>

				</aside>

			</div>

		</div>
	);
}

export default SingleBlogPost;

