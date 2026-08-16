import { useEffect } from "react";

import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import WhatIsBlog from "../components/static component/WhatIsBlog";


function WhatIsBlogPage(){
    useEffect(function(){
        document.title = "Blog Poster | What is Blog";
    }, []);

    return(
        <ErrorBoundary>
            <WhatIsBlog />
        </ErrorBoundary>
    );
}


export default WhatIsBlogPage;