import { motion } from "framer-motion";
import {
	FaBolt,
	FaChartLine,
	FaPalette,
	FaShieldAlt,
	FaUsers,
	FaPenNib,
} from "react-icons/fa";

import "../../style/authorization/BlogGrowthSection.scss";

function BlogGrowthSection() {

	const growthFeatures = [
		{
			icon: <FaPenNib />,
			title: "Powerful Editor",
			text: "Create beautiful articles using a distraction-free editor with rich formatting support."
		},
		{
			icon: <FaChartLine />,
			title: "Analytics",
			text: "Understand your audience with detailed insights, traffic reports and engagement analytics."
		},
		{
			icon: <FaPalette />,
			title: "Premium Design",
			text: "Modern layouts, responsive pages and beautiful typography for every article."
		},
		{
			icon: <FaBolt />,
			title: "Lightning Fast",
			text: "Optimized performance ensures every page loads instantly across all devices."
		},
		{
			icon: <FaShieldAlt />,
			title: "Secure Platform",
			text: "Enterprise-grade authentication and secure infrastructure keep your content protected."
		},
		{
			icon: <FaUsers />,
			title: "Community",
			text: "Connect with readers, receive feedback and grow a loyal blogging audience."
		},
	];

	return (
		<section className="blog-growth">

			<motion.div
				className="growth-heading"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: .7 }}
			>

				<span className="growth-badge">
					Why creators choose us
				</span>

				<h2>
					Everything you need to grow your
					<span> blog</span>
				</h2>

				<p>
					Everything required to write, publish, manage and grow your
					blog is available in one modern platform.
				</p>

			</motion.div>

			<div className="growth-grid">

				{growthFeatures.map(function (feature, index) {

					return (

						<motion.div
							className="growth-card"
							key={feature.title}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: .5,
								delay: index * .08
							}}
						>

							<div className="growth-icon">
								{feature.icon}
							</div>

							<h3>
								{feature.title}
							</h3>

							<p>
								{feature.text}
							</p>

						</motion.div>

					);

				})}

			</div>

		</section>
	);

}

export default BlogGrowthSection;