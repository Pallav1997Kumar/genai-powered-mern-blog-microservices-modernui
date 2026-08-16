import { useEffect } from "react";

import AllBlogsHomePageComponent from "../components/blog home/AllBlogsHomePageComponent";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


function AllBlogsHomePage(){
    useEffect(function(){
        document.title = "Blog Poster | All Blogs Home";
    }, []);

    return (
        <ErrorBoundary>
            <AllBlogsHomePageComponent />
        </ErrorBoundary>
    );
}


export default AllBlogsHomePage;