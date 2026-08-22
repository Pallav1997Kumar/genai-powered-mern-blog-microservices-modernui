import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

import "../../style/fixed component/Footer.scss";


function Footer() {
	return (
		<div className="footer">
			<h1>Start using <span>React Blog Poster</span> today</h1>
			<p>Share your ideas. Build your brand. Inspire the world.</p>
			<div>
				<h3>Follow us Social Media</h3>
				<div className="footer-social">
					<Link to="https://www.facebook.com/" className="footer-social-name">
						<SocialIcon url="https://www.facebook.com/" />
						Facebook
					</Link>
					<Link to="https://www.instagram.com/" className="footer-social-name">
						<SocialIcon url="https://www.instagram.com/" />
						Instagram
					</Link>
					<Link to="https://twitter.com/" className="footer-social-name">
						<SocialIcon url="https://twitter.com/" />
						Twitter
					</Link>
					<Link to="https://www.youtube.com/" className="footer-social-name">
						<SocialIcon url="https://www.youtube.com/" />
						YouTube
					</Link>
				</div>
			</div>
			<h4>&copy; {new Date().getFullYear()} React Blog Poster. All rights reserved.</h4>
		</div>
	);
}

export default Footer;
