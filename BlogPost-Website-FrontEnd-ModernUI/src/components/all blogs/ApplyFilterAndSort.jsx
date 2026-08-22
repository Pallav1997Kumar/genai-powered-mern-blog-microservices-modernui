import { useState, useEffect } from "react";
import axios from "axios";

import "../../style/all blogs/ApplyFilterandSort.scss";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import backendBaseURL from "../../backendBaseURL.js";


function ApplyFilterandSort(props) {
	const [sortSelection, setSortSelection] = useState("");
	const [allCheckedCategory, setAllCheckedCategory] = useState([]);
	const [allCheckedAuthor, setAllCheckedAuthor] = useState([]);
	const [checkedDate, setCheckedDate] = useState("");

	const [displaySortFilter, setDisplaySortFilter] = useState(false);

	const[uniquePostAuthors, setUniquePostAuthors] = useState(null);
	const[uniquePostCategories, setUniquePostCategories] = useState(null);

	const pathname = props.pathname;

	useEffect(function(){
		if(pathname === "/blogs"){
			fetchUniqueBlogUsersDetails();
			fetchUniqueBlogCategoriesDetails();
		}
		else if(pathname.includes("/blogs/category/")){
			fetchUniqueBlogUsersDetailsForParticularCategory();
		}
		else if(pathname.includes("/blogs/username/")){
			fetchUniqueBlogCategoriesDetailsForParticularUser();
		}
	},[pathname]);


	let username;
	let blogCategory;
	if (pathname.includes("/blogs/category/")) {
		var categoryWithBlog = pathname.split("/")[3].toUpperCase();
		var categoryNameOfBlog = categoryWithBlog.substring(0, categoryWithBlog.length - 6).replaceAll("_", " ");
		blogCategory = categoryNameOfBlog;
	} else if (pathname.includes("/blogs/username/")) {
		username = pathname.split("/")[3];
	}


	async function fetchUniqueBlogUsersDetails() {
		try {
			const response = await axios.get(`${backendBaseURL}/api/blogPost/distinctBlogUsersInfo`);
			setUniquePostAuthors(response.data);
		} 
		catch (error) {
			console.log(error);
		}
	}

	async function fetchUniqueBlogCategoriesDetails() {
		try {
			const response = await axios.get(`${backendBaseURL}/api/blogPost/distinctBlogCategoriesInfo`);
			setUniquePostCategories(response.data);
		} 
		catch (error) {
			console.log(error);
		}
	}

	async function fetchUniqueBlogUsersDetailsForParticularCategory() {
		try {
			const response = await axios.get(`${backendBaseURL}/api/blogPost/distinctBlogUsersInfo/${blogCategory}`);
			setUniquePostAuthors(response.data);
		} 
		catch (error) {
			console.log(error);
		}
	}


	async function fetchUniqueBlogCategoriesDetailsForParticularUser() {
		try {
			const response = await axios.get(`${backendBaseURL}/api/blogPost/distinctBlogCategoriesInfo/${username}`);
			setUniquePostCategories(response.data);
		} 
		catch (error) {
			console.log(error);
		}
	}


	function displaySort() {
		setDisplaySortFilter(true);
	}

	function undisplaySort() {
		setDisplaySortFilter(false);
	}


	function handleChangeCategory(event) {
		if (event.target.checked) {
			setAllCheckedCategory([...allCheckedCategory, event.target.value]);
		} else {
			setAllCheckedCategory(
				allCheckedCategory.filter(function (element) {
					return element != event.target.value;
				})
			);
		}
	}

	function handleChangeAuthor(event) {
		if (event.target.checked) {
			setAllCheckedAuthor([...allCheckedAuthor, event.target.value]);
		} else {
			setAllCheckedAuthor(
				allCheckedAuthor.filter(function (element) {
					return element != event.target.value;
				})
			);
		}
	}

	function handleChangeDate(event) {
		setCheckedDate(event.target.value);
	}

	function submitApplyFilterHandler(event) {
		event.preventDefault();
		if(pathname === "/blogs"){
			const sortFilterObject = {
				sortSelection,
				allCheckedCategory,
				allCheckedAuthor,
				checkedDate,
			};
			props.onGetSortFilterObject(sortFilterObject);
		}
		else if(pathname.includes("/blogs/category/")){
			const sortFilterObject = {
				sortSelection,
				allCheckedAuthor,
				checkedDate,
			};
			props.onGetSortFilterObject(sortFilterObject);
		}
		else if(pathname.includes("/blogs/username/")){
			const sortFilterObject = {
				sortSelection,
				allCheckedCategory,
				checkedDate,
			};
			props.onGetSortFilterObject(sortFilterObject);
		}
		setDisplaySortFilter(false);
		setSortSelection("");
		setAllCheckedAuthor([]);
		setAllCheckedCategory([]);
		setCheckedDate("");
	}

	return (
		<div className="modern-filter-wrapper">

			<div
				className="filter-toggle"
				onClick={
					displaySortFilter
						? undisplaySort
						: displaySort
				}
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

							<option value="postDateAscending">
								Oldest First
							</option>

							<option value="postDateDescending">
								Newest First
							</option>

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
										uniquePostCategories.map(function (categoryList) {

											return (

												<label
													className="checkbox-item"
													key={categoryList._id}
												>

													<input
														type="checkbox"
														value={categoryList._id}
														onChange={handleChangeCategory}
													/>

													<span>
														{categoryList.categoryName}
													</span>

												</label>

											);

										})}

								</div>

							</div>

						)}

						{!pathname.includes("/blogs/username/") && (

							<div className="filter-card">

								<h5>Authors</h5>

								<div className="checkbox-list">

									{uniquePostAuthors &&
										uniquePostAuthors.map(function (eachAuthor) {

											return (

												<label
													className="checkbox-item"
													key={eachAuthor._id}
												>

													<input
														type="checkbox"
														value={eachAuthor._id}
														onChange={handleChangeAuthor}
													/>

													<span>
														{eachAuthor.fullName} ({eachAuthor.username})
													</span>

												</label>

											);

										})}

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

										<label
											className="radio-item"
											key={item[0]}
										>

											<input
												type="radio"
												value={item[0]}
												checked={checkedDate === item[0]}
												onChange={handleChangeDate}
											/>

											<span>
												{item[1]}
											</span>

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
}

export default ApplyFilterandSort;
