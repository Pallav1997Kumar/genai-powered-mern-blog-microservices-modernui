import { useEffect } from "react";

import Login from "../components/authorization/Login.jsx";
import ErrorBoundary from "../components/error boundary/ErrorBoundary.jsx";


function LoginPage(){
    useEffect(function(){
        document.title = "Blog Poster | Login";
    }, []);

    return (
        <ErrorBoundary>
            <Login />
        </ErrorBoundary>
    );
}


export default LoginPage;