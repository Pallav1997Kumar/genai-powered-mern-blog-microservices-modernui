import { useEffect } from "react";

import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import UpdatePost from "../components/update post/UpdatePost";


function UpdateBlogPostPage(){
    useEffect(function(){
        document.title = "Blog Poster | Update Blog";
    }, []);

    return (
        <ErrorBoundary>
            <UpdatePost />
        </ErrorBoundary>
    );
}


export default UpdateBlogPostPage;