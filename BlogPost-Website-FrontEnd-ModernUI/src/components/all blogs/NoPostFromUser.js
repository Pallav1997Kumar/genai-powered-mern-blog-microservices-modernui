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
	const navigate = useNavigate();
	const location = useLocation();

	// Getting username from URL
	const usernameURL = location.pathname.split("/")[3];

	// Getting logged in user from Redux
	const loggedinUser = useSelector(
		(state) => state.userSlice.userDetail
	);

	const userOwnProfile =
		loggedinUser &&
		loggedinUser.username === usernameURL;

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
}

export default NoPostFromUser;