import "../../style/static component/HomePage.scss";

import HeroSection from "./HomePage Component/HeroSection.js";
import FeatureSection from "./HomePage Component/FeatureSection.js";
import OurMissionSection from "./HomePage Component/OurMissionSection.js";
import WhyReadOurBlogSection from "./HomePage Component/WhyReadOurBlogSection.js";


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

