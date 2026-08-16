import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
	FaEnvelope,
	FaFacebookF,
	FaInstagram,
	FaPhoneAlt,
	FaTwitter,
	FaUsers,
	FaYoutube,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

import "../../style/static component/Contact.scss";

import contactUsImage from "../../images/contact-us.jpg";


function ContactUs() {
	const socialLinks = [
		{
			name: "Facebook",
			to: "https://www.facebook.com/",
			icon: <FaFacebookF />,
			className: "facebook",
		},
		{
			name: "Instagram",
			to: "https://www.instagram.com/",
			icon: <FaInstagram />,
			className: "instagram",
		},
		{
			name: "Twitter",
			to: "https://twitter.com/",
			icon: <FaTwitter />,
			className: "twitter",
		},
		{
			name: "YouTube",
			to: "https://www.youtube.com/",
			icon: <FaYoutube />,
			className: "youtube",
		},
	];

	const emailAddresses = [
		"contactus@reactblogposter.co.in",
		"contactus@reactblogposter.com",
	];

	const phoneNumbers = ["+91 98765 43210", "+91 98765 43280"];

	return (
		<main className="contact">
			<section className="contact-one-row">
				<div className="contact-one-column-first">
					<div className="contact-eyebrow">
						<FaEnvelope />
						<span>We'd love to hear from you</span>
					</div>
					<h1>
						Let's Connect
						<span>We're Here for You</span>
					</h1>
					<div className="contact-title-line"></div>
					<p>
						Have a question, suggestion, or just want to say hello? We're always
						happy to help and connect with our readers.
					</p>
					<p>
						Reach out to us through any of the channels below. We'll get back to
						you as soon as possible.
					</p>
					<p className="contact-signoff">
						Regards,
						<strong>React Blog Poster Team <span>&hearts;</span></strong>
					</p>
				</div>
				<div className="contact-one-column-second">
					<div className="contact-image-card">
						<LazyLoadImage
							src={contactUsImage}
							alt="Contact us"
							effect="blur"
						/>
					</div>
				</div>
			</section>

			<section className="contact-two-row" aria-label="Contact channels">
				<div className="contact-two-column social-card">
					<div className="contact-card-icon">
						<FaUsers />
					</div>
					<h3>Social Presence</h3>
					<p>Follow us and stay connected</p>
					<div className="contact-card-divider"></div>
					<div className="contact-link-list">
						{socialLinks.map((link) => (
							<Link
								to={link.to}
								className="contact-link"
								key={link.name}
							>
								<span className={`contact-link-icon ${link.className}`}>
									{link.icon}
								</span>
								<span>{link.name}</span>
								<HiArrowRight className="contact-link-arrow" />
							</Link>
						))}
					</div>
				</div>

				<div className="contact-two-column email-card">
					<div className="contact-card-icon">
						<FaEnvelope />
					</div>
					<h3>Email Us</h3>
					<p>Feel free to mail us anytime</p>
					<div className="contact-card-divider"></div>
					<div className="contact-detail-list">
						{emailAddresses.map((email) => (
							<a href={`mailto:${email}`} className="contact-detail" key={email}>
								<span>
									<FaEnvelope />
								</span>
								{email}
							</a>
						))}
					</div>
				</div>

				<div className="contact-two-column phone-card">
					<div className="contact-card-icon">
						<FaPhoneAlt />
					</div>
					<h3>Call Us</h3>
					<p>We're just a call away</p>
					<div className="contact-card-divider"></div>
					<div className="contact-detail-list">
						{phoneNumbers.map((phone) => (
							<a
								href={`tel:${phone.replaceAll(" ", "")}`}
								className="contact-detail"
								key={phone}
							>
								<span>
									<FaPhoneAlt />
								</span>
								{phone}
							</a>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

export default ContactUs;
