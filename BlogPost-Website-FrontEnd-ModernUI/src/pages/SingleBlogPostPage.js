import { useEffect } from "react";

import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import SingleBlogPost from "../components/single post/SingleBlogPost";


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