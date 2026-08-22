import { useEffect } from "react";

import ErrorBoundary from "../components/error boundary/ErrorBoundary.jsx";
import ContactUs from "../components/static component/ContactUs.jsx";


function ContactUsPage(){
    useEffect(function(){
        document.title = "Blog Poster | Contact Us";
    }, []);

    return (
        <ErrorBoundary>
            <ContactUs />
        </ErrorBoundary>
    );
}


export default ContactUsPage;