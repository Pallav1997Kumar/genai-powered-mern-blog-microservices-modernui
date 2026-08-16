import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

import "../../style/authorization/AccountDeletedBox.scss";

function AccountDeletedBox() {
	return (
		<motion.div
			className="account-deleted-box"
			initial={{ opacity: 0, y: 40, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.6 }}
		>
			<div className="deleted-content">

				<motion.div
					className="deleted-icon"
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{
						type: "spring",
						stiffness: 200,
						delay: 0.2
					}}
				>
					<AiOutlineDelete />
				</motion.div>

				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.35 }}
				>
					Account Deleted
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					Your account has been permanently deleted.
					<br />
					We're sorry to see you leave.
				</motion.p>

				<motion.div
					className="deleted-buttons"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7 }}
				>
					<Link
						to="/"
						className="home-btn"
					>
						Go to Home
					</Link>

					<Link
						to="/register"
						className="register-btn"
					>
						Create New Account
					</Link>
				</motion.div>

			</div>
		</motion.div>
	);
}

export default AccountDeletedBox;