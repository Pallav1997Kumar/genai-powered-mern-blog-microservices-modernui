import { motion } from "framer-motion";
import {
	FaPenNib,
	FaChartLine,
	FaUsers
} from "react-icons/fa";

import "../../style/authorization/AuthShowcase.scss";

function AuthShowcase(props) {

	const features = [
		{
			icon: <FaPenNib />,
			title: "Beautiful Writing",
			description: "Create engaging articles with our modern editor and rich formatting tools."
		},
		{
			icon: <FaChartLine />,
			title: "Powerful Analytics",
			description: "Track views, engagement and audience growth with detailed insights."
		},
		{
			icon: <FaUsers />,
			title: "Grow Your Audience",
			description: "Build a loyal community through comments, likes and social sharing."
		}
	];

	return (
		<div className="auth-showcase">

			<motion.div
				initial={{ opacity: 0, x: -40 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: .7 }}
			>

				<div className="hero-badge">
					{props.badge}
				</div>

				<h1 className="hero-title">
					{props.title}
				</h1>

				<p className="hero-description">
					{props.description}
				</p>

				<div className="hero-features">

					{features.map(function(feature){

						return(

							<motion.div
								className="hero-feature-card"
								key={feature.title}
								whileHover={{
									y:-8,
									scale:1.02
								}}
							>

								<div className="hero-icon">
									{feature.icon}
								</div>

								<div>

									<h3>
										{feature.title}
									</h3>

									<p>
										{feature.description}
									</p>

								</div>

							</motion.div>

						);

					})}

				</div>

			</motion.div>

		</div>
	);

}

export default AuthShowcase;