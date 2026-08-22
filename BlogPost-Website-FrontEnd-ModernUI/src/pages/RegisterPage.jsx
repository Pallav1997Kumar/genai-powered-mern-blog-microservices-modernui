import { useEffect } from "react";

import Register from "../components/authorization/Register.jsx";
import ErrorBoundary from "../components/error boundary/ErrorBoundary.jsx";


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