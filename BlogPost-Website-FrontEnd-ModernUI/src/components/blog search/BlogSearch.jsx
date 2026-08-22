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
    const navigate = useNavigate();

    const [searchItem, setSearchItem] = useState("");
    const [searchedResult, setSearchedResult] = useState([]);

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchSearchTextResults(searchItem);
        }, 500);

        return () => clearTimeout(delay);
    }, [searchItem]);

    async function fetchSearchTextResults(searchQuery) {
        if (searchQuery.trim().length < 3) {
            setSearchedResult([]);
            return;
        }

        try {
            const response = await axios.get(
                `${backendBaseURL}/api/searchBlogOrUserOrCategory?searchText=${searchQuery}`
            );

            setSearchedResult(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function resultClickHandler(event) {
        const data = JSON.parse(event.currentTarget.dataset.item);

        if (data.type === "Blog Post") {
            navigate(`/blogs/postId/${data._id}`);
        }

        else if (data.type === "Blog User") {
            navigate(`/blogs/username/${data.username}`);
        }

        else if (data.type === "Blog Category") {
            const categorySlug =
                data.categoryName.replaceAll(" ", "_").toLowerCase() + "_blogs";

            navigate(`/blogs/category/${categorySlug}`);
        }
    }

    function renderIcon(type) {
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

    function renderTitle(item) {
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

    function renderSubtitle(item) {
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

    return (
        <section className="blog-search-container">

            <div className="hero-content">

                <span className="hero-tag">
                    BLOG SEARCH
                </span>

                <h1>
                    Find the stories
                    <br />
                    that inspire you
                </h1>

                <p>
                    Search blog posts, categories and authors instantly.
                    Discover thousands of articles with a modern search
                    experience.
                </p>

            </div>

            <div className="search-card">

                <div className="search-box">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        value={searchItem}
                        placeholder="Search blogs, authors or categories..."
                        onChange={(e) =>
                            setSearchItem(e.target.value)
                        }
                    />

                    <button>
                        Search
                    </button>

                </div>

                {searchItem.length > 0 &&
                    searchedResult.length === 0 && (

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

                                        <h4>
                                            {renderTitle(item)}
                                        </h4>

                                        <p>
                                            {renderSubtitle(item)}
                                        </p>

                                    </div>

                                </div>

                                <FaArrowRight className="arrow" />

                            </div>

                        ))}

                        <div className="search-footer">

                            <span>
                                {searchedResult.length} Results Found
                            </span>

                            <button>
                                View All
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </section>
    );
}

export default BlogSearch;