import { useEffect } from "react";

import Logout from "../components/authorization/Logout.jsx";
import ErrorBoundary from "../components/error boundary/ErrorBoundary.jsx";


function LogoutPage(){
    useEffect(function(){
        document.title = "Blog Poster | Logout";
    }, []);

    return (
        <ErrorBoundary>
            <Logout />
        </ErrorBoundary>
    );
}


export default LogoutPage;