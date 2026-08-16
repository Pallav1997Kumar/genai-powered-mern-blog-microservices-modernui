import { useEffect } from "react";

import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import ContactUs from "../components/static component/ContactUs";


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