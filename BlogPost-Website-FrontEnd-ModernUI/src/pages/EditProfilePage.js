import { useEffect } from "react";

import EditProfile from "../components/edit profile/EditProfile";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";

function EditProfilePage(){
    useEffect(function(){
        document.title = "Blog Poster | Edit Profile";
    }, []);

    return(
        <ErrorBoundary>
            <EditProfile />
        </ErrorBoundary>
    );
}


export default EditProfilePage;