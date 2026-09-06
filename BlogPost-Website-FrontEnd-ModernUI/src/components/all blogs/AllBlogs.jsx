import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "../../style/all blogs/AllBlog.scss";

import NoPostSpecificCategory from "./NoPostSpecificCategory.jsx";
import AllBlogsPostContainer from "./AllBlogsPostContainer.jsx";
import NoPostFromUser from "./NoPostFromUser.jsx";
import ApplyFilterAndSort from "./ApplyFilterAndSort.jsx";
import NoPostForFilter from "./NoPostForFilter.jsx";

import backendBaseURL from "../../backendBaseURL.js";

function AllBlogs() {

	const location = useLocation();


	// ============================================================
	// Normal Blog Post Pagination State - starts
	// ============================================================
	
	const [totalPagesCount, setTotalPagesCount] = useState(null);
	const [blogPostDetails, setBlogPostDetails] = useState(null);
	const [currentPageNo, setCurrentPageNo] = useState(1);

	// ============================================================
	// Normal Blog Post Pagination State - ends
	// ============================================================



	// ============================================================
	// Sorting and Filtering State - starts
	// ============================================================

	const [isSortingFilteringApplied, setIsSortingFilteringApplied] = useState(false);

	const [filteredTotalPagesCount, setFilteredTotalPagesCount] = useState(null);
	const [filteredBlogPostDetails, setFilteredBlogPostDetails] = useState(null);
	const [filteredCurrentPageNo, setFilteredCurrentPageNo] = useState(1);

	// ============================================================
	// Sorting and Filtering State - ends
	// ============================================================



	// ============================================================
	// Fetch Normal Blog Posts - starts
	// ============================================================

	useEffect(function () {

		 // Fetch normal posts only when sorting/filtering is inactive
		if (!isSortingFilteringApplied) {

			if (location.pathname === "/blogs") {
				fetchBlogPostWithPagination();
			}
			else if (location.pathname.includes("/blogs/category/")) {
				fetchCategoryBlogPostWithPagination();
			}
			else if (location.pathname.includes("/blogs/username/")) {
				fetchUserBlogPostWithPagination();
			}
		}
	}, [location.pathname, currentPageNo, isSortingFilteringApplied]);

	// ============================================================
	// Fetch Normal Blog Posts - ends
	// ============================================================



	// ============================================================
	// Fetch Filtered and Sorted Blog Posts - starts
	// ============================================================

	useEffect(function () {

		 // Fetch filtered posts when sorting/filtering is active
		if (isSortingFilteringApplied) {

			const sortFilterObject = JSON.parse(sessionStorage.getItem("sortFilterObject"));
			fetchSortedFilterBlogPost(sortFilterObject);
		}
	}, [filteredCurrentPageNo, location.pathname]);

	// ============================================================
	// Fetch Filtered and Sorted Blog Posts - ends
	// ============================================================



	// ============================================================
	// Blog Pagination Configuration - starts
	// ============================================================

	const limit = 5;

	let blogHeader;
	let username;
	let blogCategory;


	// ------------------------------------------------------------
	// Determine Blog Header and Route Parameters
	// ------------------------------------------------------------

	if (location.pathname === "/blogs") {
		blogHeader = "ALL";
	}
	else if (location.pathname.includes("/blogs/category/")) {
		var categoryWithBlog = location.pathname.split("/")[3].toUpperCase();
		var categoryNameOfBlog = categoryWithBlog.substring(0, categoryWithBlog.length - 6).replaceAll("_", " ");
		blogCategory = categoryNameOfBlog;
		blogHeader = blogCategory;
	}
	else if (location.pathname.includes("/blogs/username/")) {
		username = location.pathname.split("/")[3];
		blogHeader = username;
	}

	// ============================================================
	// Blog Pagination Configuration - ends
	// ============================================================



	// ============================================================
	// Normal Pagination Number Array - starts
	// ============================================================

	let pageNumberArray = [];

	// Create page numbers based on total available pages
	if (totalPagesCount !== null) {
		for (let i = 1; i <= totalPagesCount; i++) {
			pageNumberArray.push(i);
		}
	}

	// ============================================================
	// Normal Pagination Number Array - ends
	// ============================================================



	// ============================================================
	// Filtered Pagination Number Array - starts
	// ============================================================

	let filteredPageNumberArray = [];

	// Create page numbers for filtered and sorted results
	if (filteredTotalPagesCount !== null) {
		for (let i = 1; i <= filteredTotalPagesCount; i++) {
			filteredPageNumberArray.push(i);
		}
	}

	// ============================================================
	// Filtered Pagination Number Array - ends
	// ============================================================



	// ============================================================
	// Fetch All Blog Posts With Pagination - starts
	// ============================================================

	async function fetchBlogPostWithPagination() {

		try {

			// Fetch paginated blog posts with user and category information
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postWithPaginationWithUserAndCategoryInfo?page=${currentPageNo}&limit=${limit}`
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			setTotalPagesCount(response.data.totalPages);
			setBlogPostDetails(response.data.blogPostData);

		}
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}

	}

	// ============================================================
	// Fetch All Blog Posts With Pagination - ends
	// ============================================================



	// ============================================================
	// Fetch User Blog Posts With Pagination - starts
	// ============================================================

	async function fetchUserBlogPostWithPagination() {

		try {

			// Fetch paginated posts belonging to the selected user
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postWithPaginationWithUserAndCategoryInfo/user/${username}?page=${currentPageNo}&limit=${limit}`
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			setTotalPagesCount(response.data.totalPages);
			setBlogPostDetails(response.data.blogPostData);

		}
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}

	}

	// ============================================================
	// Fetch User Blog Posts With Pagination - starts
	// ============================================================



	// ============================================================
	// Fetch Category Blog Posts With Pagination - starts
	// ============================================================

	async function fetchCategoryBlogPostWithPagination() {

		try {

			// Fetch paginated posts belonging to the selected category
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postWithPaginationWithUserAndCategoryInfo/category/${blogCategory}?page=${currentPageNo}&limit=${limit}`
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			setTotalPagesCount(response.data.totalPages);
			setBlogPostDetails(response.data.blogPostData);

		}
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}

	}

	// ============================================================
	// Fetch Category Blog Posts With Pagination - ends
	// ============================================================



	// ============================================================
	// Fetch All Blog Posts With Filter and Sorting - starts
	// ============================================================

	async function fetchBlogPostWithFilterSortingPagination(sortFilterObject) {

		try {

			// Fetch filtered and sorted posts for all blogs
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/postWithFilterSortingPaginationWithUserAndCategoryInfo?page=${filteredCurrentPageNo}&limit=${limit}`,
				sortFilterObject
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			return response.data;

		}
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}

	}

	// ============================================================
	// Fetch All Blog Posts With Filter and Sorting - ends
	// ============================================================



	// ============================================================
	// Fetch User Blog Posts With Filter and Sorting - starts
	// ============================================================

	async function fetchUserBlogPostWithFilterSortingPagination(sortFilterObject) {

		try {

			 // Fetch filtered and sorted posts for the selected user
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/postWithFilterSortingPaginationWithUserAndCategoryInfo/user/${username}?page=${filteredCurrentPageNo}&limit=${limit}`,
				sortFilterObject
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			return response.data;

		}
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}

	}

	// ============================================================
	// Fetch User Blog Posts With Filter and Sorting - ends
	// ============================================================



	// ============================================================
	// Fetch Category Blog Posts With Filter and Sorting - starts
	// ============================================================

	async function fetchCategoryBlogPostWithFilterSortingPagination(sortFilterObject) {

		try {

			// Fetch filtered and sorted posts for the selected category
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/postWithFilterSortingPaginationWithUserAndCategoryInfo/category/${blogCategory}?page=${filteredCurrentPageNo}&limit=${limit}`,
				sortFilterObject
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			return response.data;

		}
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}

	}

	// ============================================================
	// Fetch Category Blog Posts With Filter and Sorting - ends
	// ============================================================



	// ============================================================
	// Pagination Page Change Handler - starts
	// ============================================================

	function handlePageChange(event) {

		// Update the appropriate page state based on filtering status
		if (!isSortingFilteringApplied) {
			setCurrentPageNo(event.target.value);
		}
		else {
			setFilteredCurrentPageNo(event.target.value);
		}

	}

	// ============================================================
	// Pagination Page Change Handler - ends
	// ============================================================



	// ============================================================
	// Apply Sort and Filter Configuration - starts
	// ============================================================

	async function getSortFilterObject(sortFilterObject) {

		// Store the selected sorting and filtering options
		sessionStorage.setItem(
			"sortFilterObject",
			JSON.stringify(sortFilterObject)
		);

		// Start filtered results from the first page
		setFilteredCurrentPageNo(1);

		// Fetch posts using the selected configuration
		await fetchSortedFilterBlogPost(sortFilterObject);

	}

	// ============================================================
	// Apply Sort and Filter Configuration - ends
	// ============================================================



	// ============================================================
	// Fetch Sorted and Filtered Blog Posts - starts
	// ============================================================

	async function fetchSortedFilterBlogPost(sortFilterObject) {

		let filteredBlogPostInfo;

		// Select the API based on the current blog route
		if (location.pathname === "/blogs") {
			filteredBlogPostInfo =
				await fetchBlogPostWithFilterSortingPagination(sortFilterObject);
		}
		else if (location.pathname.includes("/blogs/category/")) {
			filteredBlogPostInfo =
				await fetchCategoryBlogPostWithFilterSortingPagination(sortFilterObject);
		}
		else {
			filteredBlogPostInfo =
				await fetchUserBlogPostWithFilterSortingPagination(sortFilterObject);
		}

		// Update filtered blog post state
		setFilteredTotalPagesCount(filteredBlogPostInfo.totalPages);
		setFilteredBlogPostDetails(filteredBlogPostInfo.blogPostData);
		setFilteredCurrentPageNo(filteredBlogPostInfo.currentPage);

		// Mark sorting and filtering as active
		setIsSortingFilteringApplied(true);

	}

	// ============================================================
	// Fetch Sorted and Filtered Blog Posts - ends
	// ============================================================




	// ============================================================
    // JSX Section - starts
    // ============================================================

	return (
		<div className="modern-all-blog-page">
			{blogPostDetails && blogPostDetails.length > 0 && (
				<section className="blogs-hero">
					<div className="blogs-hero-content">
						<h1>{blogHeader} BLOGS</h1>

						{location.pathname === "/blogs" && (
							<p>
								Discover a variety of articles on science,
								mythology, health, food, art and culture.
							</p>
						)}
					</div>
				</section>
			)}

			{blogPostDetails && blogPostDetails.length > 0 && (
				<section className="blogs-filter-card">
					<ApplyFilterAndSort
						pathname={location.pathname}
						onGetSortFilterObject={getSortFilterObject}
					/>
				</section>
			)}

			<div className="blogs-list">
				{isSortingFilteringApplied &&
					filteredBlogPostDetails &&
					filteredBlogPostDetails.length === 0 && <NoPostForFilter />}

				{!isSortingFilteringApplied &&
					blogPostDetails &&
					blogPostDetails.map(function (post) {
						return <AllBlogsPostContainer key={post._id} post={post} />;
					})}

				{isSortingFilteringApplied &&
					filteredBlogPostDetails &&
					filteredBlogPostDetails.map(function (post) {
						return <AllBlogsPostContainer key={post._id} post={post} />;
					})}
			</div>

			{blogPostDetails &&
				blogPostDetails.length === 0 &&
				location.pathname.includes("/blogs/category/") && (
					<NoPostSpecificCategory blogCategory={blogCategory} />
				)}

			{blogPostDetails &&
				blogPostDetails.length === 0 &&
				location.pathname.includes("/blogs/username/") && (
					<NoPostFromUser />
				)}

			{!isSortingFilteringApplied &&
				blogPostDetails &&
				blogPostDetails.length > 0 && (
					<div className="modern-pagination">
						<label>Select Page</label>

						<select defaultValue={1} onChange={handlePageChange}>
							{pageNumberArray.map(function (page) {
								return (
									<option key={page} value={page}>
										Page {page}
									</option>
								);
							})}
						</select>
					</div>
				)}

			{isSortingFilteringApplied &&
				filteredBlogPostDetails &&
				filteredBlogPostDetails.length > 0 && (
					<div className="modern-pagination">
						<label>Select Page</label>

						<select defaultValue={1} onChange={handlePageChange}>
							{filteredPageNumberArray.map(function (page) {
								return (
									<option key={page} value={page}>
										Page {page}
									</option>
								);
							})}
						</select>
					</div>
				)}
		</div>
	);

	// ============================================================
    // JSX Section - ends
    // ============================================================

}

export default AllBlogs;