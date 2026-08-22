import { useEffect } from "react";

import AccountDeleted from "../components/authorization/AccountDeleted.jsx";
import ErrorBoundary from "../components/error boundary/ErrorBoundary.jsx";


function DeletedAccountPage(){
    useEffect(function(){
        document.title = "Blog Poster | Account Deleted";
    }, []);

    return (
        <ErrorBoundary>
            <AccountDeleted />
        </ErrorBoundary>
    );
}


export default DeletedAccountPage;