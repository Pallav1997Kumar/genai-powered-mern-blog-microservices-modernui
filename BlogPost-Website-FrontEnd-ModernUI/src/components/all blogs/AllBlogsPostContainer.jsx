import { Link } from "react-router-dom";
import moment from "moment";

import "../../style/all blogs/AllBlogsPostContainer.scss";
import { getPlainText } from "../../utils/utility functions.js";

function AllBlogsPostContainer(props) {

	const post = props.post;

	return (

		<div className="modern-blog-card" id={post._id}>

			<div className="modern-blog-image">

				<Link to={`/blogs/postId/${post._id}`}>

					<img
						src={post.postImage}
						alt={post.postTitle}
						loading="lazy"
					/>

				</Link>

				<div className="category-badge">

					<Link
						to={`/blogs/category/${post.categoryDetails.categoryName
							.toLowerCase()
							.replaceAll(" ", "_")}_blogs`}
					>
						{post.categoryDetails.categoryName}
					</Link>

				</div>

			</div>

			<div className="modern-blog-content">

				<div className="blog-meta">

					<div className="blog-author">

						<span className="meta-title">
							Author
						</span>

						<Link
							to={`/blogs/username/${post.userDetails.username}`}
							className="author-link"
						>
							{post.userDetails.fullName}
						</Link>

					</div>

					<div className="blog-date">

						{moment(post.postDateTime).fromNow()}

					</div>

				</div>

				<Link
					to={`/blogs/postId/${post._id}`}
					className="blog-title"
				>

					<h2>
						{post.postTitle}
					</h2>

				</Link>

				<div className="blog-description">

					{
						getPlainText(post.postDescription).length > 320 ?

							<p>

								{getPlainText(post.postDescription).slice(0, 320)}

								...

							</p>

							:

							<p>

								{getPlainText(post.postDescription)}

							</p>
					}

				</div>

				<div className="blog-footer">

					<Link
						to={`/blogs/postId/${post._id}`}
						className="read-more-button"
					>

						Read Full Article

						<span>
							→
						</span>

					</Link>

				</div>

			</div>

		</div>

	);

}

export default AllBlogsPostContainer;