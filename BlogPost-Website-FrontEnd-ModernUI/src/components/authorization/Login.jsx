import "../../style/authorization/Login.scss";

import AuthShowcase from "./AuthShowcase.jsx";
import LoginBox from "./LoginBox.jsx";
import BlogGrowthSection from "./BlogGrowthSection.jsx";

function Login() {
	return (
		<div className="login-auth-page">
			<div className="login-auth-grid">

				<div className="login-hero-section">
					<AuthShowcase 
						badge="Welcome Back"
						title={
							<>
								Welcome to
								<span>Blog Poster</span>
							</>
						}
						description="Sign in to access your dashboard, 
							publish inspiring stories, engage with readers, 
							and continue building your blogging journey with powerful tools 
							designed for modern creators."
					/>
				</div>

				<div className="login-section">
					<LoginBox />
				</div>

				<div className="login-feature-section">
					<BlogGrowthSection />
				</div>

			</div>

		</div>
	);
}

export default Login;