import "../../style/authorization/Register.scss";

import AuthShowcase from "./AuthShowcase";
import RegisterBox from "./RegisterBox";
import BlogGrowthSection from "./BlogGrowthSection";

function Register() {
	return (
		<div className="register-auth-page">
			<div className="register-auth-grid">

				<div className="register-hero-section">
					<AuthShowcase
						badge="Start Your Journey"
						title={
							<>
								Create Your
								<span> Free Account</span>
							</>
						}
						description="Join thousands of writers, developers, and creators. 
							Publish beautiful articles, build your personal brand, 
							and grow an engaged audience—all from one modern blogging platform."
					/>
				</div>

				<div className="register-section">
					<RegisterBox />
				</div>

				<div className="register-feature-section">
					<BlogGrowthSection />
				</div>

			</div>
		</div>
	);
}

export default Register;