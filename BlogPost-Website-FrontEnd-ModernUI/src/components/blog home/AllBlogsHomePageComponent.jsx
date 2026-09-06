import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";

import { getAllBlogCategory } from "../../store/allBlogCategorySlice.js";

import "../../style/blog home/AllBlogsHomePage.scss";
import Button from "react-bootstrap/Button";

import CategoryCard from "./CategoryCard.jsx";
import EachCategoryBlogPost from "./EachCategoryBlogPost.jsx";

import backendBaseURL from "../../backendBaseURL.js";


function AllBlogsHomePageComponent() {
	// ============================================================
	// Redux And Navigation - starts
	// ============================================================

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// ============================================================
	// Redux And Navigation - ends
	// ============================================================



	// ============================================================
	// Blog Posts State - starts
	// ============================================================

	const [defaultBlogPosts, setDefaultBlogPosts] = useState([]);

	// ============================================================
	// Blog Posts State - ends
	// ============================================================



	// ============================================================
	// Get Blog Categories From Redux Store - starts
	// ============================================================

	// Get all blog categories from the Redux store
	const categoriesList = useSelector(
		(categogiesListRedux) =>
			categogiesListRedux.blogCategorySliceName.blogCategories
	);

	// ============================================================
	// Get Blog Categories From Redux Store - ends
	// ============================================================



	// ============================================================
	// Create Blog Category Array - starts
	// ============================================================

	// Create an array containing all blog category names
	const blogCategoryArray = [];

	categoriesList.map(function (categoryList) {
		blogCategoryArray.push(
			categoryList.categoryName.concat(" BLOGS")
		);
	});

	// ============================================================
	// Create Blog Category Array - ends
	// ============================================================



	// ============================================================
	// Fetch All Blog Categories - starts
	// ============================================================

	useEffect(function () {
		// Fetch all blog categories and store them in Redux
		dispatch(getAllBlogCategory());
	}, []);

	// ============================================================
	// Fetch All Blog Categories - ends
	// ============================================================



	// ============================================================
	// Fetch Default Blog Posts - starts
	// ============================================================

	useEffect(function () {
		// Fetch four blog posts to display as default posts
		fetchFourBlogPost();
	}, []);

	// ============================================================
	// Fetch Default Blog Posts - ends
	// ============================================================



	// ============================================================
	// Fetch Four Blog Posts - starts
	// ============================================================

	async function fetchFourBlogPost() {
		try{
			// Fetch four blog posts with user and category information
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/fourPostWithUserAndCategoryInfo`
			);

			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}
			setDefaultBlogPosts(response.data);
		}
		catch(error){
			if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
		}
	}

	// ============================================================
	// Fetch Four Blog Posts - ends
	// ============================================================




	// ============================================================
    // JSX Section - starts
    // ============================================================
	
	return (
		<div className="modern-home-page">
			{/* Hero Section */}

			<section className="home-hero">
				<div className="hero-left">
					<div className="hero-badge">🔥 Trending Articles</div>

					<h1>
						Discover Amazing
						<span> Blogs</span>
					</h1>

					<p>
						Explore thousands of articles across science, mythology,
						health, food, sports, technology, art and many more
						categories.
					</p>

					<div className="hero-buttons">
						<Button
							variant="primary"
							onClick={() => navigate("/blogSearch")}
						>
							Search Blogs
						</Button>

						<Link className="browse-btn" to="/blogs">
							Browse All
						</Link>
					</div>
				</div>

				<div className="hero-right">
					<div className="hero-image-card">
						<img
							src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900"
							alt=""
						/>
					</div>

					<div className="floating-card card-one">📚 100+ Blogs</div>

					<div className="floating-card card-two">⭐ Premium Content</div>
				</div>

				<div className="blur-circle blur-one"></div>
				<div className="blur-circle blur-two"></div>
			</section>

			{/* Search Banner */}

			<section className="search-banner">
				<div>
					<h3>Looking for a specific article?</h3>

					<p>Search from all published blogs instantly.</p>
				</div>

				<Button onClick={() => navigate("/blogSearch")}>Search Now</Button>
			</section>

			{/* All Blogs */}

			<section className="section-wrapper">
				<div className="section-heading">
					<h2>All Blogs</h2>

					<Link to="/blogs">View All</Link>
				</div>

				<CategoryCard
					cardHeading="ALL BLOGS"
					blogsDisplay={defaultBlogPosts}
				/>
			</section>

			{/* Categories */}

			<div className="category-sections">
				{categoriesList.map(function (eachCategory) {
					return (
						<div className="category-block" key={eachCategory._id}>
							<EachCategoryBlogPost categoryDetails={eachCategory} />
						</div>
					);
				})}
			</div>
		</div>
	);

	// ============================================================
    // JSX Section - ends
    // ============================================================

}
export default AllBlogsHomePageComponent;
