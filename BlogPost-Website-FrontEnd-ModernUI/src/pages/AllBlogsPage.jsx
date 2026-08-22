import { useEffect } from "react";

import AllBlogs from "../components/all blogs/AllBlogs.jsx";
import ErrorBoundary from "../components/error boundary/ErrorBoundary.jsx";


function AllBlogsPage(){
    useEffect(function(){
        document.title = "Blog Poster | All Blogs";
    }, []);

    return (
        <ErrorBoundary>
            <AllBlogs /> 
        </ErrorBoundary>
    );
}


export default AllBlogsPage