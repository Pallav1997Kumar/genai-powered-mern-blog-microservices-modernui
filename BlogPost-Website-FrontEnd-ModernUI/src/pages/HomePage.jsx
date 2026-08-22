import { useEffect } from "react";

import ErrorBoundary from "../components/error boundary/ErrorBoundary.jsx";
import Home from "../components/static component/Home.jsx";


function HomePage(){
    useEffect(function(){
        document.title = "Blog Poster";
    }, []);

    return (
        <ErrorBoundary>
            <Home />
        </ErrorBoundary>
    );
}


export default HomePage;