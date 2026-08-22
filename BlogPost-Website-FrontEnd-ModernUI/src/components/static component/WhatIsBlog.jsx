import { lazy, Suspense } from "react";
import "../../style/static component/WhatIsBlog.scss";
import blogComputerImage from "../../images/new-blog-post-free-photo.webp";

import {
    FiEdit3,
    FiTrendingUp
} from "react-icons/fi";

import { HiOutlineClipboardList } from "react-icons/hi";

const WIBYoutube = lazy(() =>
    import("./WhatIsBlog Lazy Component/WIBYoutube.js")
);

const WIBVideo1 = lazy(() =>
    import("./WhatIsBlog Lazy Component/WIBVideo1.js")
);

const WIBVideo2 = lazy(() =>
    import("./WhatIsBlog Lazy Component/WIBVideo2.js")
);

function WhatIsBlog() {
    return (
        <section className="what-is-blog">

            {/* ================= HERO ================= */}

            <section className="blog-hero">

                <div className="hero-content">

                    <span className="hero-tag">
                        LEARN &amp; GROW
                    </span>

                    <h1>
                        What is <span>a blog?</span>
                    </h1>

                    <h4>Definition of a blog</h4>

                    <div className="hero-line"></div>

                    <p>
                        A blog is a type of regularly updated website or online
                        journal where people share their thoughts,
                        knowledge, experiences, and ideas on a specific topic.
                    </p>

                    <p>
                        Blogs can be personal, educational,
                        professional, or business-related.
                        They help in building connections,
                        sharing information, and creating
                        value for readers.
                    </p>

                </div>

                <div className="hero-image">

                    {/* Replace with illustration if available */}

                    <img
                        src={blogComputerImage}
                        alt="Blog Illustration"
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />

                    {/* <div className="illustration-placeholder">
                        BLOG ILLUSTRATION
                    </div> */}

                </div>

            </section>

            {/* ================= SECTION 1 ================= */}

            <section className="blog-section">

                <div className="blog-video">

                    <Suspense fallback="Loading...">
                        <WIBYoutube />
                    </Suspense>

                </div>

                <div className="blog-defination">

                    <div className="section-icon">
                        <HiOutlineClipboardList />
                    </div>

                    <div>

                        <h2>
                            What to include in a blog
                        </h2>

                        <p>
                            Once you've created your blog,
                            it's time to think about your
                            blog posts. When figuring out
                            your content type, think about
                            your target audience. Produce
                            evergreen content and update
                            your blog regularly.
                        </p>

                        <p>
                            Blog posts should be clear,
                            engaging and valuable.
                            Include headings, lists,
                            images and useful information
                            that keeps readers interested.
                        </p>

                    </div>

                </div>

            </section>

            {/* ================= SECTION 2 ================= */}

            <section className="blog-section">

                <div className="blog-video">

                    <Suspense fallback="Loading...">
                        <WIBVideo1 />
                    </Suspense>

                </div>

                <div className="blog-defination">

                    <div className="section-icon">
                        <FiEdit3 />
                    </div>

                    <div>

                        <h2>
                            How to start a blog?
                        </h2>

                        <p>
                            Choose a niche,
                            register a domain,
                            purchase hosting,
                            install a blogging platform,
                            customize the design,
                            and begin publishing quality
                            content consistently.
                        </p>

                        <p>
                            Once your blog is live,
                            keep improving it by creating
                            valuable content and promoting
                            it across different platforms.
                        </p>

                    </div>

                </div>

            </section>

            {/* ================= SECTION 3 ================= */}

            <section className="blog-section">

                <div className="blog-video">

                    <Suspense fallback="Loading...">
                        <WIBVideo2 />
                    </Suspense>

                </div>

                <div className="blog-defination">

                    <div className="section-icon">
                        <FiTrendingUp />
                    </div>

                    <div>

                        <h2>
                            How to make your blog succeed?
                        </h2>

                        <p>
                            Focus on creating valuable,
                            original content that solves
                            readers' problems.
                            Publish consistently and
                            optimize for SEO.
                        </p>

                        <p>
                            Promote your blog through
                            social media, understand
                            analytics, engage with your
                            audience, and continue
                            improving based on feedback.
                        </p>

                    </div>

                </div>

            </section>
        </section>
    );
}

export default WhatIsBlog;