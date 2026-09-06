import { useState, useEffect } from "react";
import axios from "axios";

import "../../style/all blogs/ApplyFilterandSort.scss";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import backendBaseURL from "../../backendBaseURL.js";


function ApplyFilterandSort(props) {

	// ============================================================
	// Blog Filter State - starts
	// ============================================================

	const [sortSelection, setSortSelection] = useState("");
	const [allCheckedCategory, setAllCheckedCategory] = useState([]);
	const [allCheckedAuthor, setAllCheckedAuthor] = useState([]);
	const [checkedDate, setCheckedDate] = useState("");

	const [displaySortFilter, setDisplaySortFilter] = useState(false);

	const[uniquePostAuthors, setUniquePostAuthors] = useState(null);
	const[uniquePostCategories, setUniquePostCategories] = useState(null);

	// ============================================================
	// Blog Filter State - ends
	// ============================================================

	const pathname = props.pathname;


	// ============================================================
	// Fetch Filter Data Based On Pathname - starts
	// ============================================================

	useEffect(function(){
		if(pathname === "/blogs"){
			// Fetch authors and categories for all blog posts
			fetchUniqueBlogUsersDetails();
			fetchUniqueBlogCategoriesDetails();
		}
		else if(pathname.includes("/blogs/category/")){
			// Fetch authors available for the selected category
			fetchUniqueBlogUsersDetailsForParticularCategory();
		}
		else if(pathname.includes("/blogs/username/")){
			// Fetch categories available for the selected user
			fetchUniqueBlogCategoriesDetailsForParticularUser();
		}
	},[pathname]);

	// ============================================================
	// Fetch Filter Data Based On Pathname - ends
	// ============================================================



	// ============================================================
	// Get Username And Blog Category From Pathname - starts
	// ============================================================

	let username;
	let blogCategory;
	if (pathname.includes("/blogs/category/")) {
		var categoryWithBlog = pathname.split("/")[3].toUpperCase();
		var categoryNameOfBlog = categoryWithBlog.substring(0, categoryWithBlog.length - 6).replaceAll("_", " ");
		blogCategory = categoryNameOfBlog;
	} else if (pathname.includes("/blogs/username/")) {
		username = pathname.split("/")[3];
	}

	// ============================================================
	// Get Username And Blog Category From Pathname - ends
	// ============================================================



	// ============================================================
	// Fetch Unique Blog Users Details - starts
	// ============================================================

	async function fetchUniqueBlogUsersDetails() {
		try {

			// Fetch all unique blog authors for the main blogs page
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/distinctBlogUsersInfo`
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}
			
			setUniquePostAuthors(response.data);
		} 
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
	}

	// ============================================================
	// Fetch Unique Blog Users Details - ends
	// ============================================================



	// ============================================================
	// Fetch Unique Blog Categories Details - starts
	// ============================================================

	async function fetchUniqueBlogCategoriesDetails() {
		try {

			// Fetch all unique blog categories for the main blogs page
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/distinctBlogCategoriesInfo`
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			setUniquePostCategories(response.data);
		} 
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
	}

	// ============================================================
	// Fetch Unique Blog Categories Details - ends
	// ============================================================



	// ============================================================
	// Fetch Unique Blog Users Details For Particular Category - starts
	// ============================================================

	async function fetchUniqueBlogUsersDetailsForParticularCategory() {
		try {

			// Fetch unique authors for the selected blog category
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/distinctBlogUsersInfo/${blogCategory}`
			);
			
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}
			
			setUniquePostAuthors(response.data);
		} 
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
	}

	// ============================================================
	// Fetch Unique Blog Users Details For Particular Category - ends
	// ============================================================



	// ============================================================
	// Fetch Unique Blog Categories Details For Particular User - starts
	// ============================================================

	async function fetchUniqueBlogCategoriesDetailsForParticularUser() {
		try {

			// Fetch unique categories for the selected blog user
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/distinctBlogCategoriesInfo/${username}`
			);
			
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

			setUniquePostCategories(response.data);
		} 
		catch (error) {
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
	}

	// ============================================================
	// Fetch Unique Blog Categories Details For Particular User - ends
	// ============================================================



	// ============================================================
	// Display Sort And Filter Section - starts
	// ============================================================

	function displaySort() {
		setDisplaySortFilter(true);
	}

	// ============================================================
	// Display Sort And Filter Section - ends
	// ============================================================



	// ============================================================
	// Hide Sort And Filter Section - starts
	// ============================================================

	function undisplaySort() {
		setDisplaySortFilter(false);
	}

	// ============================================================
	// Hide Sort And Filter Section - ends
	// ============================================================



	// ============================================================
	// Handle Category Filter Selection - starts
	// ============================================================

	function handleChangeCategory(event) {

		if (event.target.checked) {
			// Add the selected category to the checked category list
			setAllCheckedCategory([
				...allCheckedCategory, 
				event.target.value
			]);
		} 
		else {
			// Remove the unselected category from the checked category list
			setAllCheckedCategory(
				allCheckedCategory.filter(function (element) {
					return element != event.target.value;
				})
			);
		}
	}

	// ============================================================
	// Handle Category Filter Selection - ends
	// ============================================================



	// ============================================================
	// Handle Author Filter Selection - starts
	// ============================================================

	function handleChangeAuthor(event) {
		if (event.target.checked) {
			// Add the selected author to the checked author list
			setAllCheckedAuthor([
				...allCheckedAuthor, 
				event.target.value
			]);
		} 
		else {
			// Remove the unselected author from the checked author list
			setAllCheckedAuthor(
				allCheckedAuthor.filter(function (element) {
					return element != event.target.value;
				})
			);
		}
	}

	// ============================================================
	// Handle Author Filter Selection - ends
	// ============================================================



	// ============================================================
	// Handle Date Filter Selection - starts
	// ============================================================

	function handleChangeDate(event) {
		setCheckedDate(event.target.value);
	}

	// ============================================================
	// Handle Date Filter Selection - ends
	// ============================================================



	// ============================================================
	// Apply Sort And Filter Selection - starts
	// ============================================================

	function submitApplyFilterHandler(event) {
		event.preventDefault();

		if(pathname === "/blogs"){
			// Create filter object with category and author filters
			const sortFilterObject = {
				sortSelection,
				allCheckedCategory,
				allCheckedAuthor,
				checkedDate,
			};

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(sortFilterObject);
			}
			props.onGetSortFilterObject(sortFilterObject);
		}
		else if(pathname.includes("/blogs/category/")){
			// Create filter object with author filter for the category page
			const sortFilterObject = {
				sortSelection,
				allCheckedAuthor,
				checkedDate,
			};

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(sortFilterObject);
			}
			props.onGetSortFilterObject(sortFilterObject);
		}
		else if(pathname.includes("/blogs/username/")){
			// Create filter object with category filter for the user page
			const sortFilterObject = {
				sortSelection,
				allCheckedCategory,
				checkedDate,
			};

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(sortFilterObject);
			}
			props.onGetSortFilterObject(sortFilterObject);
		}

		// Reset filter state after applying the selected filters
		setDisplaySortFilter(false);
		setSortSelection("");
		setAllCheckedAuthor([]);
		setAllCheckedCategory([]);
		setCheckedDate("");
	}

	// ============================================================
	// Apply Sort And Filter Selection - starts
	// ============================================================




	// ============================================================
    // JSX Section - starts
    // ============================================================

	return (
		<div className="modern-filter-wrapper">
			<div
				className="filter-toggle"
				onClick={displaySortFilter ? undisplaySort : displaySort}
			>
				<div>
					<h3>Filter & Sort Blogs</h3>
					<p>Refine your search using filters and sorting options.</p>
				</div>

				<div className="toggle-icon">
					{displaySortFilter ? <AiFillCaretUp /> : <AiFillCaretDown />}
				</div>
			</div>

			{displaySortFilter && (
				<div className="modern-filter-card">
					<div className="sort-section">
						<h5>Sort By</h5>

						<select
							value={sortSelection}
							onChange={function (event) {
								setSortSelection(event.target.value);
							}}
						>
							<option value="">Please Select</option>

							<option value="postTitleAscending">
								Post Title (A-Z)
							</option>

							<option value="postTitleDescending">
								Post Title (Z-A)
							</option>

							{!pathname.includes("/blogs/username/") && (
								<option value="authorAscending">
									Author Name (A-Z)
								</option>
							)}

							{!pathname.includes("/blogs/username/") && (
								<option value="authorDescending">
									Author Name (Z-A)
								</option>
							)}

							{!pathname.includes("/blogs/category/") && (
								<option value="categoryAscending">
									Category (A-Z)
								</option>
							)}

							{!pathname.includes("/blogs/category/") && (
								<option value="categoryDescending">
									Category (Z-A)
								</option>
							)}

							<option value="postDateAscending">Oldest First</option>

							<option value="postDateDescending">Newest First</option>

							<option value="postLengthAscending">
								Shortest Post
							</option>

							<option value="postLengthDescending">
								Longest Post
							</option>
						</select>
					</div>

					<div className="filter-grid">
						{!pathname.includes("/blogs/category/") && (
							<div className="filter-card">
								<h5>Categories</h5>

								<div className="checkbox-list">
									{uniquePostCategories &&
										uniquePostCategories.map(
											function (categoryList) {
												return (
													<label
														className="checkbox-item"
														key={categoryList._id}
													>
														<input
															type="checkbox"
															value={categoryList._id}
															onChange={
																handleChangeCategory
															}
														/>

														<span>
															{
																categoryList.categoryName
															}
														</span>
													</label>
												);
											},
										)}
								</div>
							</div>
						)}

						{!pathname.includes("/blogs/username/") && (
							<div className="filter-card">
								<h5>Authors</h5>

								<div className="checkbox-list">
									{uniquePostAuthors &&
										uniquePostAuthors.map(
											function (eachAuthor) {
												return (
													<label
														className="checkbox-item"
														key={eachAuthor._id}
													>
														<input
															type="checkbox"
															value={eachAuthor._id}
															onChange={
																handleChangeAuthor
															}
														/>

														<span>
															{eachAuthor.fullName} (
															{eachAuthor.username})
														</span>
													</label>
												);
											},
										)}
								</div>
							</div>
						)}

						<div className="filter-card">
							<h5>Posted On</h5>

							<div className="radio-list">
								{[
									["1hour", "Last Hour"],
									["24hours", "Last 24 Hours"],
									["7days", "Last 7 Days"],
									["1month", "Last 1 Month"],
									["3months", "Last 3 Months"],
									["6months", "Last 6 Months"],
									["1year", "Last 1 Year"],
									["everyTime", "Every Time"],
								].map(function (item) {
									return (
										<label className="radio-item" key={item[0]}>
											<input
												type="radio"
												value={item[0]}
												checked={checkedDate === item[0]}
												onChange={handleChangeDate}
											/>

											<span>{item[1]}</span>
										</label>
									);
								})}
							</div>
						</div>
					</div>

					<div className="filter-action">
						<Button
							variant="primary"
							onClick={submitApplyFilterHandler}
						>
							Apply Filters
						</Button>
					</div>
				</div>
			)}
		</div>
	);

	// ============================================================
    // JSX Section - ends
    // ============================================================

}

export default ApplyFilterandSort;
