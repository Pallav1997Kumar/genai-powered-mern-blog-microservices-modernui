import { useNavigate } from "react-router-dom";
import {
	House,
	Grid,
	FileText,
	ArrowRight,
} from "react-bootstrap-icons";

import "../../style/all blogs/NoPostSpecificCategory.scss";

function NoPostSpecificCategory({ blogCategory }) {
	const navigate = useNavigate();

	return (
		<section className="no-post">
			<div className="no-post-container">

				{/* CSS Illustration */}

				<div className="illustration">

					<div className="illustration-circle"></div>

					<div className="document-card">

						<div className="document-header"></div>

						<div className="document-lines">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>

						<div className="document-dot"></div>

					</div>

					<div className="search-glass">

						<div className="glass"></div>

						<div className="handle"></div>

					</div>

					<div className="floating floating-one"></div>
					<div className="floating floating-two"></div>
					<div className="floating floating-three"></div>

				</div>

				{/* Heading */}

				<h1>
					No blog post to display
					<br />
					for <span>{blogCategory}</span> category
				</h1>

				<p>
					We couldn't find any blog posts in this category.
					<br />
					Try another category or explore all blogs.
				</p>

				<div className="heading-line"></div>

				{/* Action Cards */}

				<div className="action-cards">

					<button
						type="button"
						className="action-card"
						onClick={() => navigate("/")}
					>
						<div className="icon home">
							<House />
						</div>

						<div className="content">
							<h5>Go to</h5>
							<p>Home Page</p>
						</div>

						<ArrowRight />
					</button>

					<button
						type="button"
						className="action-card"
						onClick={() => navigate("/blogsHome")}
					>
						<div className="icon blog">
							<FileText />
						</div>

						<div className="content">
							<h5>Go to All Blogs</h5>
							<p>Home Page</p>
						</div>

						<ArrowRight />
					</button>

					<button
						type="button"
						className="action-card"
						onClick={() => navigate("/blogs")}
					>
						<div className="icon grid">
							<Grid />
						</div>

						<div className="content">
							<h5>See all</h5>
							<p>Blogs</p>
						</div>

						<ArrowRight />
					</button>

				</div>

			</div>
		</section>
	);
}

export default NoPostSpecificCategory;