import axios from "axios";
import React, { useEffect, useState } from "react";

import backendBaseURL from "../../backendBaseURL";

import CategoryCard from "./CategoryCard.jsx";


function EachCategoryBlogPost(props) {

    // ============================================================
    // Get Category Details - starts
    // ============================================================

    const categoryDetails = props.categoryDetails;

    // Get the selected blog category ID
    const categoryID = categoryDetails._id;

    // Create the card heading using the category name
    const cardHeading = categoryDetails.categoryName.concat(" BLOGS");

    // ============================================================
    // Get Category Details - ends
    // ============================================================



    // ============================================================
    // Blog Posts State - starts
    // ============================================================

    const [defaultBlogPosts, setDefaultBlogPosts] = useState([]);

    // ============================================================
    // Blog Posts State - ends
    // ============================================================
    


    // ============================================================
    // Fetch Category Blog Posts On Component Load - starts
    // ============================================================

    useEffect(function(){
        // Fetch four blog posts for the selected category
        fetchFourBlogPostParticularCategory();
    }, []);

    // ============================================================
    // Fetch Category Blog Posts On Component Load - ends
    // ============================================================



    // ============================================================
    // Fetch Four Blog Posts For Particular Category - starts
    // ============================================================

    async function fetchFourBlogPostParticularCategory() {
        try{
            // Fetch four blog posts with user and category information for the selected blog category
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/fourPostWithUserAndCategoryInfo/${categoryID}`
			);

            if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
                console.log(response);
            }
			setDefaultBlogPosts(response.data);
		}
		catch(error){
                if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
                    console.log(error.message);
                }
		}
    }

    // ============================================================
    // Fetch Four Blog Posts For Particular Category - ends
    // ============================================================



    
    // ============================================================
    // JSX Section - starts
    // ============================================================

    return (
        <React.Fragment>
            <CategoryCard 
                cardHeading={cardHeading} 
                blogsDisplay={defaultBlogPosts} 
            />
        </React.Fragment>
    );

    // ============================================================
    // JSX Section - ends
    // ============================================================
    
}


export default EachCategoryBlogPost;