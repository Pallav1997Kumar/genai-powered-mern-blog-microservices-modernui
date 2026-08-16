import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import {
	FaHome,
	FaArrowRight,
	FaRegNewspaper,
} from "react-icons/fa";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { HiOutlineDocumentSearch } from "react-icons/hi";

import "../../style/all blogs/NoPostForFilter.scss";

function NoPostForFilter() {
	const navigate = useNavigate();

	return (
		<div className="filter-no-post">
			<div className="no-post-container">
				{/* Illustration */}
				<div className="no-post-illustration">
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
				<div className="no-post-heading-filter">
					<h1>
						No blog post to display
						<br />
						for <span>this filter</span>
					</h1>

					<div className="heading-divider"></div>

					<p>
						We couldn't find any blog posts matching your current
						filter.
						<br />
						Try adjusting your filters or explore something new.
					</p>
				</div>

				{/* Buttons */}
				<div className="no-post-buttons-filter">
					<Button
						className="no-post-button"
						onClick={() => navigate("/")}
					>
						<div className="button-icon">
							<FaHome />
						</div>

						<div className="button-content">
							<span>Go to Home Page</span>
						</div>

						<div className="button-arrow">
							<FaArrowRight />
						</div>
					</Button>

					<Button
						className="no-post-button"
						onClick={() => navigate("/blogsHome")}
					>
						<div className="button-icon blue">
							<BsGrid3X3GapFill />
						</div>

						<div className="button-content">
							<span>Go to All Blogs Home Page</span>
						</div>

						<div className="button-arrow">
							<FaArrowRight />
						</div>
					</Button>

					<Button
						className="no-post-button"
						onClick={() => navigate("/blogs")}
					>
						<div className="button-icon pink">
							<FaRegNewspaper />
						</div>

						<div className="button-content">
							<span>See all Blogs</span>
						</div>

						<div className="button-arrow">
							<FaArrowRight />
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default NoPostForFilter;