import { useNavigate } from "react-router-dom";

import "../../style/blog home/BlogPostCard.scss";

import { getPlainText } from "../../utils/utility functions.js";

function BlogPostCard(props) {

	// ============================================================
	// Navigation - starts
	// ============================================================

	const navigate = useNavigate();

	// ============================================================
	// Navigation - ends
	// ============================================================



	// ============================================================
	// Get Plain Text From Blog Description - starts
	// ============================================================

	// Convert the blog description into plain text
	const text = getPlainText(props.description);

	let newText;

	// Limit the description length for display
	if (text.length > 220) {
		newText = text.slice(0, 220).concat("...");
	}
	else {
		newText = text;
	}

	// ============================================================
	// Get Plain Text From Blog Description - ends
	// ============================================================



	// ============================================================
	// Handle Blog Link Click - starts
	// ============================================================
	
	function linkClickHandler() {
		// Navigate to the selected blog post
		navigate(`/blogs/postId/${props.id}`);
	}

	// ============================================================
	// Handle Blog Link Click - ends
	// ============================================================




	// ============================================================
    // JSX Section - starts
    // ============================================================

	return (
		<div className="premium-blog-card">
			<div className="premium-card-image" onClick={linkClickHandler}>
				<img src={props.image} alt={props.title} loading="lazy" />
				<div className="image-overlay"></div>
				<div className="featured-badge">Featured</div>
			</div>

			<div className="premium-card-content">
				<div className="author-row">
					<div className="author-avatar">
						{props.authorName.charAt(0)}
					</div>

					<div className="author-details">
						<span className="author-label">Author</span>
						<h6>{props.authorName}</h6>
					</div>
				</div>

				<h3 className="premium-title" onClick={linkClickHandler}>
					{props.title}
				</h3>

				<p className="premium-description">{newText}</p>

				<div className="premium-footer">
					<button
						type="button"
						className="read-more-btn"
						onClick={linkClickHandler}
					>
						Read Article
						<span>→</span>
					</button>
				</div>
			</div>
		</div>
	);

	// ============================================================
    // JSX Section - ends
    // ============================================================

}

export default BlogPostCard;