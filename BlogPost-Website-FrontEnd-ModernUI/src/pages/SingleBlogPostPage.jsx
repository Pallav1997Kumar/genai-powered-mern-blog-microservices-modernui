import { useEffect } from "react";

import ErrorBoundary from "../components/error boundary/ErrorBoundary.jsx";
import SingleBlogPost from "../components/single post/SingleBlogPost.jsx";


function SingleBlogPostPage(){
    useEffect(function(){
            document.title = "Blog Poster | Single Blog";
    }, []);

    return (
        <ErrorBoundary>
            <SingleBlogPost />
        </ErrorBoundary>
    );
}


export default SingleBlogPostPage;