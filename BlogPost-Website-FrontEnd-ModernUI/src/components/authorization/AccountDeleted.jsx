import "../../style/authorization/AccountDeleted.scss";

import AuthShowcase from "./AuthShowcase.jsx";
import AccountDeletedBox from "./AccountDeletedBox.jsx";
import BlogGrowthSection from "./BlogGrowthSection.jsx";

function AccountDeleted() {
	return (
		<div className="account-deleted-auth-page">
			<div className="account-deleted-auth-grid">

				<div className="account-deleted-hero-section">
					<AuthShowcase
						badge="Account Removed"
						title={
							<>
								Your account has been
								<span> permanently deleted</span>
							</>
						}
						description="We're sorry to see you leave. 
							All associated account data has been removed. 
							If you ever decide to return, 
							we'd be delighted to welcome you back to our blogging community."
					/>
				</div>

				<div className="account-deleted-section">
					<AccountDeletedBox />
				</div>

				<div className="account-deleted-feature-section">
					<BlogGrowthSection />
				</div>

			</div>
		</div>
	);
}

export default AccountDeleted;