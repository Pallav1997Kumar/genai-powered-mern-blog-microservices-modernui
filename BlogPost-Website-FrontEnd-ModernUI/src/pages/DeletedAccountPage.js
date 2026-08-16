import { useEffect } from "react";

import AccountDeleted from "../components/authorization/AccountDeleted";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


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