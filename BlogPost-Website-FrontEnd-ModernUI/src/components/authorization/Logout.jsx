import "../../style/authorization/Logout.scss";

import AuthShowcase from "./AuthShowcase.jsx";
import LogoutBox from "./LogoutBox.jsx";
import BlogGrowthSection from "./BlogGrowthSection.jsx";

function Logout() {
	return (
		<div className="logout-auth-page">
			<div className="logout-auth-grid">

				<div className="logout-hero-section">
					<AuthShowcase
						badge="See You Again"
						title={
							<>
								You've Successfully
								<span> Logged Out</span>
							</>
						}
						description="Your session has ended securely. 
							Thank you for being part of the React Blog Poster community. 
							We look forward to welcoming you back whenever you're ready to create, 
							publish, and inspire again."
					/>
				</div>

				<div className="logout-section">
					<LogoutBox />
				</div>

				<div className="logout-feature-section">
					<BlogGrowthSection />
				</div>

			</div>
		</div>
	);
}

export default Logout;