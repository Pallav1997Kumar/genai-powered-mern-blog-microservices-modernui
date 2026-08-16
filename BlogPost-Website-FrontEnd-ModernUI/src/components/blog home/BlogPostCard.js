import { useNavigate } from "react-router-dom";

import "../../style/blog home/BlogPostCard.scss";

import { getPlainText } from "../../utils/utility functions.js";

function BlogPostCard(props) {

	const navigate = useNavigate();

	const text = getPlainText(props.description);

	let newText;

	if (text.length > 220) {
		newText = text.slice(0, 220).concat("...");
	}
	else {
		newText = text;
	}

	function linkClickHandler() {
		navigate(`/blogs/postId/${props.id}`);
	}

	return (
		<div className="premium-blog-card">
			
			<div
				className="premium-card-image"
				onClick={linkClickHandler}
			>
				<img
					src={props.image}
					alt={props.title}
					loading="lazy"
				/>
				<div className="image-overlay"></div>
				<div className="featured-badge">
					Featured
				</div>
			</div>

			<div className="premium-card-content">
				<div className="author-row">
					<div className="author-avatar">
						{props.authorName.charAt(0)}
					</div>

					<div className="author-details">
						<span className="author-label">
							Author
						</span>
						<h6>
							{props.authorName}
						</h6>
					</div>
				</div>

				<h3
					className="premium-title"
					onClick={linkClickHandler}
				>
					{props.title}
				</h3>

				<p className="premium-description">
					{newText}
				</p>

				<div className="premium-footer">
					<button
						type="button"
						className="read-more-btn"
						onClick={linkClickHandler}
					>
						Read Article
						<span>
							→
						</span>
					</button>
				</div>

			</div>

		</div>
	);

}

export default BlogPostCard;