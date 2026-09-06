import { useNavigate } from "react-router-dom";

import "../../style/blog home/CategoryCard.scss";

import BlogPostCard from "./BlogPostCard.jsx";


function CategoryCard(props) {

	// ============================================================
	// Navigation - starts
	// ============================================================

	const navigate = useNavigate();

	// ============================================================
	// Navigation - ends
	// ============================================================



	// ============================================================
	// Get Blogs For Display - starts
	// ============================================================

	// Get the blog posts that need to be displayed
	const displayBlogs = props.blogsDisplay;

	// Set different blog counts for different screen sizes
	const displayBlogsForDesktop = displayBlogs;
	const displayBlogsForTablet = displayBlogs.slice(0, 3);
	const displayBlogsForMobileOne = displayBlogs.slice(0, 2);
	const displayBlogsForMobileTwo = displayBlogs.slice(2);

	// ============================================================
	// Get Blogs For Display - ends
	// ============================================================



	// ============================================================
	// Handle View All Click - starts
	// ============================================================

	function viewAllHandleClick() {

		// Navigate to the main blogs page when displaying all blogs
		if (props.cardHeading === "ALL BLOGS") {
			navigate("/blogs");
		}
		else {

			// Create the category URL from the card heading
			const link = props.cardHeading
				.replaceAll(" ", "_")
				.toLowerCase();

			// Navigate to the selected blog category
			navigate(`/blogs/category/${link}`);

		}

	}

	// ============================================================
	// Handle View All Click - ends
	// ============================================================




	// ============================================================
    // JSX Section - starts
    // ============================================================

	return (
		<section className="modern-category-section">

			<div className="modern-category-header">

				<div className="header-left">
					<div className="header-line"></div>
					<div>
						<span className="category-small-title">
							Latest Articles
						</span>

						<h2>
							{props.cardHeading}
						</h2>
					</div>
				</div>

				<div
					className="view-all-button"
					onClick={viewAllHandleClick}
				>
					View All
					<span>
						→
					</span>
				</div>
			</div>

			<div className="modern-blog-grid desktop-grid">
				{
					displayBlogsForDesktop.map(function (blog) {
						return (
							<div
								className="modern-blog-item"
								key={blog._id}
							>
								<BlogPostCard
									id={blog._id}
									description={blog.postDescription}
									title={blog.postTitle}
									image={blog.postImage}
									authorName={blog.userDetails.fullName}
								/>
							</div>
						);
					})
				}
			</div>

			<div className="modern-blog-grid tablet-grid">
				{
					displayBlogsForTablet.map(function (blog) {
						return (
							<div
								className="modern-blog-item"
								key={blog._id}
							>
								<BlogPostCard
									id={blog._id}
									description={blog.postDescription}
									title={blog.postTitle}
									image={blog.postImage}
									authorName={blog.userDetails.fullName}
								/>
							</div>
						);
					})
				}
			</div>

			<div className="mobile-grid">
				<div className="mobile-row">
					{
						displayBlogsForMobileOne.map(function (blog) {
							return (
								<div
									className="modern-blog-item"
									key={blog._id}
								>
									<BlogPostCard
										id={blog._id}
										description={blog.postDescription}
										title={blog.postTitle}
										image={blog.postImage}
										authorName={blog.userDetails.fullName}
									/>
								</div>
							);
						})
					}
				</div>

				<div className="mobile-row">
					{
						displayBlogsForMobileTwo.map(function (blog) {
							return (
								<div
									className="modern-blog-item"
									key={blog._id}
								>
									<BlogPostCard
										id={blog._id}
										description={blog.postDescription}
										title={blog.postTitle}
										image={blog.postImage}
										authorName={blog.userDetails.fullName}
									/>
								</div>
							);
						})
					}
				</div>
			</div>

			{
				displayBlogs.length === 0 &&
				<div className="empty-category">
					<div className="empty-icon">
						📄
					</div>
					<h3>
						No Posts Available
					</h3>
					<p>
						New blogs will appear here soon.
					</p>
				</div>
			}
		</section>
	);

	// ============================================================
    // JSX Section - ends
    // ============================================================

}

export default CategoryCard;