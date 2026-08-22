import "../../style/static component/HomePage.scss";

import HeroSection from "./HomePage Component/HeroSection.jsx";
import FeatureSection from "./HomePage Component/FeatureSection.jsx";
import OurMissionSection from "./HomePage Component/OurMissionSection.jsx";
import WhyReadOurBlogSection from "./HomePage Component/WhyReadOurBlogSection.jsx";


function Home() {

	return (
		<div>
			<HeroSection />
			<FeatureSection />
			<OurMissionSection />
			<WhyReadOurBlogSection />
		</div>
	);

}

export default Home;

