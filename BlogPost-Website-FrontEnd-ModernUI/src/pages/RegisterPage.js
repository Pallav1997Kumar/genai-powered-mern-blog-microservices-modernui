import { useEffect } from "react";

import Register from "../components/authorization/Register";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


function RegisterPage(){
    useEffect(function(){
        document.title = "Blog Poster | Register";
    }, []);

    return (
        <ErrorBoundary>
            <Register />
        </ErrorBoundary>
    );
}


export default RegisterPage;