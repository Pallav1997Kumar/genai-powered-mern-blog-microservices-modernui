import { useEffect } from "react";

import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import Home from "../components/static component/Home";


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