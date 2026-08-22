import { useNavigate } from "react-router-dom";

import "../../style/blog home/CategoryCard.scss";

import BlogPostCard from "./BlogPostCard.jsx";


function CategoryCard(props) {

	const navigate = useNavigate();

	const displayBlogs = props.blogsDisplay;

	const displayBlogsForDesktop = displayBlogs;
	const displayBlogsForTablet = displayBlogs.slice(0, 3);
	const displayBlogsForMobileOne = displayBlogs.slice(0, 2);
	const displayBlogsForMobileTwo = displayBlogs.slice(2);

	function viewAllHandleClick() {

		if (props.cardHeading === "ALL BLOGS") {
			navigate("/blogs");
		}
		else {

			const link = props.cardHeading
				.replaceAll(" ", "_")
				.toLowerCase();

			navigate(`/blogs/category/${link}`);

		}

	}

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

}

export default CategoryCard;