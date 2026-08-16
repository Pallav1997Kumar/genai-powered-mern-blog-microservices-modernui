import { useEffect } from "react";

import AllBlogs from "../components/all blogs/AllBlogs";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


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