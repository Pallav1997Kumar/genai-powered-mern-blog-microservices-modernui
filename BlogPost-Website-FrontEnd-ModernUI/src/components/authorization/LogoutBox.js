import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

import "../../style/authorization/LogoutBox.scss";

function LogoutBox() {
	return (
		<motion.div
			className="logout-box"
			initial={{ opacity: 0, y: 40, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.6 }}
		>
			<div className="logout-content">

				<motion.div
					className="logout-icon"
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{
						type: "spring",
						stiffness: 180,
						delay: 0.2
					}}
				>
					<AiOutlineLogout />
				</motion.div>

				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.35 }}
				>
					Logged Out Successfully
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					You have been securely logged out of your account.
					<br />
					Thank you for visiting. We look forward to seeing you again.
				</motion.p>

				<motion.div
					className="logout-buttons"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7 }}
				>
					<Link
						to="/login"
						className="login-btn"
					>
						Login Again
					</Link>

					<Link
						to="/"
						className="home-btn"
					>
						Go to Home
					</Link>
				</motion.div>

			</div>
		</motion.div>
	);
}

export default LogoutBox;