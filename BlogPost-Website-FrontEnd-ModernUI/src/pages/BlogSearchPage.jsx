import { useEffect } from "react";

import BlogSearch from "../components/blog search/BlogSearch.jsx";
import ErrorBoundary from "../components/error boundary/ErrorBoundary.jsx";


function BlogSearchPage(){
    useEffect(function(){
        document.title = "Blog Poster | Blog Search";
    }, []);

    return (
        <ErrorBoundary>
            <BlogSearch />
        </ErrorBoundary>
    );
}


export default BlogSearchPage;