import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import "../../style/single post/LikedBy.scss";

function LikedBy(props) {

	const blogPostLikedList = props.blogPostLikedList;

	const [showLike, setShowLike] = useState(false);

	return (
		<>

			<Button
				className="liked-by-button"
				onClick={function () {
					setShowLike(true);
				}}
			>
				❤️ Liked By
				<span className="liked-count">
					{blogPostLikedList ? blogPostLikedList.length : 0}
				</span>
			</Button>

			<Modal
				show={showLike}
				onHide={function () {
					setShowLike(false);
				}}
				centered
				size="lg"
			>

				<Modal.Header closeButton>

					<Modal.Title>

						People who liked this post

					</Modal.Title>

				</Modal.Header>

				<Modal.Body>

					{
						blogPostLikedList &&
						blogPostLikedList.length > 0 ?

							blogPostLikedList.map(function (eachLike) {

								return (

									<div
										className="liked-user-card"
										key={eachLike._id}
									>

										<div className="liked-user-left">

											<Image
												src={eachLike.userDetails.userProfilePhoto}
												roundedCircle
												className="liked-user-image"
											/>

											<div className="liked-user-details">

												<h6>
													{eachLike.userDetails.fullName}
												</h6>

												<p>
													@
													{eachLike.userDetails.username}
												</p>

											</div>

										</div>

									</div>

								);

							})

							:

							<div className="no-liked-users">

								<h5>
									No likes yet
								</h5>

								<p>
									Be the first person to like this post.
								</p>

							</div>
					}

				</Modal.Body>

				<Modal.Footer>

					<Button
						variant="secondary"
						onClick={function () {
							setShowLike(false);
						}}
					>
						Close
					</Button>

				</Modal.Footer>

			</Modal>

		</>
	);

}

export default LikedBy;