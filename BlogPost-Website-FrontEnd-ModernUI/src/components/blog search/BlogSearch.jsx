import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    FaSearch,
    FaRegFileAlt,
    FaUserCircle,
    FaFolderOpen,
    FaArrowRight
} from "react-icons/fa";

import "../../style/blog search/BlogSearch.scss";

import backendBaseURL from "../../backendBaseURL.js";

function BlogSearch() {

    // ============================================================
    // Navigation - starts
    // ============================================================

    const navigate = useNavigate();

    // ============================================================
    // Navigation - ends
    // ============================================================



    // ============================================================
    // Search State - starts
    // ============================================================

    const [searchItem, setSearchItem] = useState("");
    const [searchedResult, setSearchedResult] = useState([]);

    // ============================================================
    // Search State - ends
    // ============================================================



    // ============================================================
    // Search With Delay - starts
    // ============================================================

    useEffect(() => {
        // Wait for 500ms after the user stops typing before making the search API request
        const delay = setTimeout(() => {
            fetchSearchTextResults(searchItem);
        }, 500);

        // Clear the previous timer when the search text changes
        return () => clearTimeout(delay);
    }, [searchItem]);

    // ============================================================
    // Search With Delay - ends
    // ============================================================



    // ============================================================
    // Fetch Search Text Results - starts
    // ============================================================
    async function fetchSearchTextResults(searchQuery) {
        // Do not perform a search when less than 3 characters have been entered
        if (searchQuery.trim().length < 3) {
            setSearchedResult([]);
            return;
        }

        try {
            // Search for matching blog posts, users and categories
            const response = await axios.get(
                `${backendBaseURL}/api/searchBlogOrUserOrCategory?searchText=${searchQuery}`
            );

            if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
                console.log(response);
            }
            setSearchedResult(response.data);
        } catch (error) {
            if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
                console.error(error);
            }
        }
    }

    // ============================================================
    // Fetch Search Text Results - ends
    // ============================================================



    // ============================================================
    // Handle Search Result Click - starts
    // ============================================================
    function resultClickHandler(event) {
        // Get the selected search result from the data attribute
        const data = JSON.parse(event.currentTarget.dataset.item);

        // Navigate to the selected blog post
        if (data.type === "Blog Post") {
            navigate(`/blogs/postId/${data._id}`);
        }

        // Navigate to the selected blog user's profile
        else if (data.type === "Blog User") {
            navigate(`/blogs/username/${data.username}`);
        }

        // Navigate to the selected blog category
        else if (data.type === "Blog Category") {
            const categorySlug =
                data.categoryName.replaceAll(" ", "_").toLowerCase() + "_blogs";

            navigate(`/blogs/category/${categorySlug}`);
        }
    }

    // ============================================================
    // Handle Search Result Click - ends
    // ============================================================



    // ============================================================
    // Render Search Result Icon - starts
    // ============================================================

    function renderIcon(type) {
        // Display a different icon based on the search result type
        switch (type) {
            case "Blog Post":
                return <FaRegFileAlt />;

            case "Blog User":
                return <FaUserCircle />;

            case "Blog Category":
                return <FaFolderOpen />;

            default:
                return <FaSearch />;
        }
    }

    // ============================================================
    // Render Search Result Icon - ends
    // ============================================================



    // ============================================================
    // Render Search Result Title - starts
    // ============================================================

    function renderTitle(item) {
        // Display the appropriate title based on the search result type
        switch (item.type) {
            case "Blog Post":
                return item.postTitle;

            case "Blog User":
                return item.fullName;

            case "Blog Category":
                return item.categoryName;

            default:
                return "";
        }
    }

    // ============================================================
    // Render Search Result Title - ends
    // ============================================================

    
    
    // ============================================================
    // Render Search Result Subtitle - starts
    // ============================================================

    function renderSubtitle(item) {
        // Display additional information below the search result title
        switch (item.type) {
            case "Blog Post":
                return "Blog Post";

            case "Blog User":
                return `@${item.username}`;

            case "Blog Category":
                return "Category";

            default:
                return "";
        }
    }

    // ============================================================
    // Render Search Result Subtitle - ends
    // ============================================================



    
    // ============================================================
    // JSX Section - starts
    // ============================================================

    return (
        <section className="blog-search-container">
            <div className="hero-content">
                <span className="hero-tag">BLOG SEARCH</span>

                <h1>
                    Find the stories
                    <br />
                    that inspire you
                </h1>

                <p>
                    Search blog posts, categories and authors instantly. Discover
                    thousands of articles with a modern search experience.
                </p>
            </div>

            <div className="search-card">
                <div className="search-box">
                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        value={searchItem}
                        placeholder="Search blogs, authors or categories..."
                        onChange={(e) => setSearchItem(e.target.value)}
                    />

                    <button>Search</button>
                </div>

                {searchItem.length > 0 && searchedResult.length === 0 && (
                    <div className="empty-state">
                        Start typing at least
                        <strong> 3 characters </strong>
                        to search.
                    </div>
                )}

                {searchedResult.length > 0 && (
                    <div className="search-result">
                        {searchedResult.map((item, index) => (
                            <div
                                key={index}
                                className="result-card"
                                data-item={JSON.stringify(item)}
                                onClick={resultClickHandler}
                            >
                                <div className="left">
                                    <div className="icon">
                                        {renderIcon(item.type)}
                                    </div>

                                    <div className="content">
                                        <h4>{renderTitle(item)}</h4>

                                        <p>{renderSubtitle(item)}</p>
                                    </div>
                                </div>

                                <FaArrowRight className="arrow" />
                            </div>
                        ))}

                        <div className="search-footer">
                            <span>{searchedResult.length} Results Found</span>

                            <button>View All</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );

    // ============================================================
    // JSX Section - ends
    // ============================================================

}

export default BlogSearch;