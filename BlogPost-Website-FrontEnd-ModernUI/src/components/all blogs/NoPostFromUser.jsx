import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
	House,
	FileText,
	Grid,
	PencilSquare,
	ArrowRight,
} from "react-bootstrap-icons";

import "../../style/all blogs/NoPostFromUser.scss";

function NoPostFromUser() {

	// ============================================================
	// Navigation And Location - starts
	// ============================================================

	const navigate = useNavigate();
	const location = useLocation();

	// ============================================================
	// Navigation And Location - ends
	// ============================================================



	// ============================================================
	// Get Username From URL - starts
	// ============================================================

	// Extract username from the current profile URL
	const usernameURL = location.pathname.split("/")[3];

	// ============================================================
	// Get Username From URL - ends
	// ============================================================

	
	
	// ============================================================
	// Get Logged In User From Redux - starts
	// ============================================================

	// Get the currently logged in user's details from Redux
	const loggedinUser = useSelector(
		(state) => state.userSlice.userDetail
	);

	// ============================================================
	// Get Logged In User From Redux - ends
	// ============================================================

	

	// ============================================================
	// Check User Own Profile - starts
	// ============================================================

	// Check whether the logged in user is viewing their own profile
	const userOwnProfile =
		loggedinUser &&
		loggedinUser.username === usernameURL;

	// ============================================================
	// Check User Own Profile - ends
	// ============================================================
	


	// ============================================================
    // JSX Section - starts
    // ============================================================

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
				{userOwnProfile ? (
					<>
						<h1>
							You haven't posted
							<br />
							<span>any blog yet</span>
						</h1>

						<p>
							Start sharing your ideas, knowledge, and
							experiences with the community.
							<br />
							Write your first blog post today.
						</p>
					</>
				) : (
					<>
						<h1>
							This user hasn't posted
							<br />
							<span>any blog yet</span>
						</h1>

						<p>
							This profile doesn't have any published
							blogs yet.
							<br />
							Meanwhile, you can explore other blogs.
						</p>
					</>
				)}

				<div className="heading-line"></div>

				<div
					className={`action-cards ${
						userOwnProfile ? "four-cards" : ""
					}`}
				>
					{/* Only show for own profile */}
					{userOwnProfile && (
						<button
							type="button"
							className="action-card"
							onClick={() => navigate("/write")}
						>
							<div className="icon write">
								<PencilSquare />
							</div>

							<div className="content">
								<h5>Create your first</h5>
								<p>Write Blog</p>
							</div>

							<ArrowRight />
						</button>
					)}

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

	// ============================================================
    // JSX Section - ends
    // ============================================================

}

export default NoPostFromUser;