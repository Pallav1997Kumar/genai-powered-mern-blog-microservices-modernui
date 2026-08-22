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

	const [totalPagesCount, setTotalPagesCount] = useState(null);
	const [blogPostDetails, setBlogPostDetails] = useState(null);
	const [currentPageNo, setCurrentPageNo] = useState(1);

	const [isSortingFilteringApplied, setIsSortingFilteringApplied] = useState(false);

	const [filteredTotalPagesCount, setFilteredTotalPagesCount] = useState(null);
	const [filteredBlogPostDetails, setFilteredBlogPostDetails] = useState(null);
	const [filteredCurrentPageNo, setFilteredCurrentPageNo] = useState(1);

	useEffect(function () {
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

	useEffect(function () {
		if (isSortingFilteringApplied) {
			const sortFilterObject = JSON.parse(sessionStorage.getItem("sortFilterObject"));
			fetchSortedFilterBlogPost(sortFilterObject);
		}
	}, [filteredCurrentPageNo, location.pathname]);

	const limit = 5;

	let blogHeader;
	let username;
	let blogCategory;

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

	let pageNumberArray = [];

	if (totalPagesCount !== null) {
		for (let i = 1; i <= totalPagesCount; i++) {
			pageNumberArray.push(i);
		}
	}

	let filteredPageNumberArray = [];

	if (filteredTotalPagesCount !== null) {
		for (let i = 1; i <= filteredTotalPagesCount; i++) {
			filteredPageNumberArray.push(i);
		}
	}

	async function fetchBlogPostWithPagination() {

		try {

			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postWithPaginationWithUserAndCategoryInfo?page=${currentPageNo}&limit=${limit}`
			);

			setTotalPagesCount(response.data.totalPages);
			setBlogPostDetails(response.data.blogPostData);

		}
		catch (error) {
			console.log(error);
		}

	}

	async function fetchUserBlogPostWithPagination() {

		try {

			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postWithPaginationWithUserAndCategoryInfo/user/${username}?page=${currentPageNo}&limit=${limit}`
			);

			setTotalPagesCount(response.data.totalPages);
			setBlogPostDetails(response.data.blogPostData);

		}
		catch (error) {
			console.log(error);
		}

	}

	async function fetchCategoryBlogPostWithPagination() {

		try {

			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postWithPaginationWithUserAndCategoryInfo/category/${blogCategory}?page=${currentPageNo}&limit=${limit}`
			);

			setTotalPagesCount(response.data.totalPages);
			setBlogPostDetails(response.data.blogPostData);

		}
		catch (error) {
			console.log(error);
		}

	}

	async function fetchBlogPostWithFilterSortingPagination(sortFilterObject) {

		try {

			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/postWithFilterSortingPaginationWithUserAndCategoryInfo?page=${filteredCurrentPageNo}&limit=${limit}`,
				sortFilterObject
			);

			return response.data;

		}
		catch (error) {
			console.log(error);
		}

	}

	async function fetchUserBlogPostWithFilterSortingPagination(sortFilterObject) {

		try {

			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/postWithFilterSortingPaginationWithUserAndCategoryInfo/user/${username}?page=${filteredCurrentPageNo}&limit=${limit}`,
				sortFilterObject
			);

			return response.data;

		}
		catch (error) {
			console.log(error);
		}

	}

	async function fetchCategoryBlogPostWithFilterSortingPagination(sortFilterObject) {

		try {

			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/postWithFilterSortingPaginationWithUserAndCategoryInfo/category/${blogCategory}?page=${filteredCurrentPageNo}&limit=${limit}`,
				sortFilterObject
			);

			return response.data;

		}
		catch (error) {
			console.log(error);
		}

	}

	function handlePageChange(event) {

		if (!isSortingFilteringApplied) {
			setCurrentPageNo(event.target.value);
		}
		else {
			setFilteredCurrentPageNo(event.target.value);
		}

	}

	async function getSortFilterObject(sortFilterObject) {

		sessionStorage.setItem(
			"sortFilterObject",
			JSON.stringify(sortFilterObject)
		);

		setFilteredCurrentPageNo(1);

		await fetchSortedFilterBlogPost(sortFilterObject);

	}

	async function fetchSortedFilterBlogPost(sortFilterObject) {

		let filteredBlogPostInfo;

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

		setFilteredTotalPagesCount(filteredBlogPostInfo.totalPages);
		setFilteredBlogPostDetails(filteredBlogPostInfo.blogPostData);
		setFilteredCurrentPageNo(filteredBlogPostInfo.currentPage);
		setIsSortingFilteringApplied(true);

	}

	return (

		<div className="modern-all-blog-page">

			{blogPostDetails && blogPostDetails.length > 0 && (

				<section className="blogs-hero">

					<div className="blogs-hero-content">

						<h1>
							{blogHeader} BLOGS
						</h1>

						{(location.pathname === "/blogs") && 
						<p>
							Discover a variety of articles on science, mythology,
							health, food, art and culture.
						</p>
						}

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

				{
					(isSortingFilteringApplied &&
						filteredBlogPostDetails &&
						filteredBlogPostDetails.length === 0)
					&&
					<NoPostForFilter />
				}

				{
					(!isSortingFilteringApplied &&
						blogPostDetails) &&
					blogPostDetails.map(function (post) {

						return (
							<AllBlogsPostContainer
								key={post._id}
								post={post}
							/>
						);

					})
				}

				{
					(isSortingFilteringApplied &&
						filteredBlogPostDetails) &&
					filteredBlogPostDetails.map(function (post) {

						return (
							<AllBlogsPostContainer
								key={post._id}
								post={post}
							/>
						);

					})
				}

			</div>

			{
				blogPostDetails &&
				blogPostDetails.length === 0 &&
				location.pathname.includes("/blogs/category/") &&
				<NoPostSpecificCategory blogCategory={blogCategory} />
			}

			{
				blogPostDetails &&
				blogPostDetails.length === 0 &&
				location.pathname.includes("/blogs/username/") &&
				<NoPostFromUser />
			}

			{
				(!isSortingFilteringApplied &&
					blogPostDetails &&
					blogPostDetails.length > 0) &&

				<div className="modern-pagination">

					<label>Select Page</label>

					<select
						defaultValue={1}
						onChange={handlePageChange}
					>

						{
							pageNumberArray.map(function (page) {

								return (
									<option
										key={page}
										value={page}
									>
										Page {page}
									</option>
								);

							})
						}

					</select>

				</div>
			}

			{
				(isSortingFilteringApplied &&
					filteredBlogPostDetails &&
					filteredBlogPostDetails.length > 0) &&

				<div className="modern-pagination">

					<label>Select Page</label>

					<select
						defaultValue={1}
						onChange={handlePageChange}
					>

						{
							filteredPageNumberArray.map(function (page) {

								return (
									<option
										key={page}
										value={page}
									>
										Page {page}
									</option>
								);

							})
						}

					</select>

				</div>
			}

		</div>

	);

}

export default AllBlogs;