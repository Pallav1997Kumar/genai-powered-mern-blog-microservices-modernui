import { useEffect } from "react";

import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import WriteBlogPost from "../components/write post/WriteBlogPost";

function WriteBlogPostPage(){
    useEffect(function(){
        document.title = "Blog Poster | Write Blog";
    }, []);

    return (
        <ErrorBoundary>
            <WriteBlogPost />
        </ErrorBoundary>
    );
}


export default WriteBlogPostPage;