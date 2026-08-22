import "../../style/fixed component/NavBar.scss";

import NavbarDesktop from "./NavbarDesktop.jsx";
import NavbarMobile from "./NavbarMobile.jsx";


function NavBar() {

	return (
		<div className="navbar-container">
			<div className="navbar-for-desktop">
				<NavbarDesktop />
			</div>
			<div className="navbar-for-mobile">
				<NavbarMobile />
			</div>
		</div>
	)
}

export default NavBar;
