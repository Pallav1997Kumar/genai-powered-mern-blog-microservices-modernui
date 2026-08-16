import React from "react";
import { Link } from "react-router-dom";

import {
  FaBookOpen,
  FaEdit,
  FaPlus,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";

import "../../../style/static component/HomePage Styling/FeatureSection.scss";


const AnimatedHeading = ({ text }) => {
  const highlightWords = [
    "Create",
    "blog",
    "others",
    "search",
    "specific",
    "know",
  ];

  return (
    <h2 className="feature-animated-heading">
      {text.split(" ").map((word, wordIndex) => {
        const highlight = highlightWords.some(
          (item) => item.toLowerCase() === word.replace(".", "").toLowerCase()
        );

        return (
          <span
            key={wordIndex}
            className={highlight ? "feature-highlight-word" : "feature-normal-word"}
          >
            {word.split("").map((letter, index) => (
              <span
                key={index}
                className="feature-heading-letter"
                style={{
                  animationDelay: `${wordIndex * 0.18 + index * 0.035}s`,
                }}
              >
                {letter}
              </span>
            ))}
            <span className="feature-word-space">&nbsp;</span>
          </span>
        );
      })}
    </h2>
  );
};


function FeatureSection() {
  const featureCards = [
    {
      className: "feature-explore-card",
      icon: <FaUsers />,
      title: "Want to see others blog post",
      text: "Explore the others users blog post for free.",
      to: "/blogsHome",
      visual: (
        <div className="feature-browser-preview">
          <span></span>

          <div className="feature-image-grid">
            <BsCardImage />
            <BsCardImage />
            <BsCardImage />
          </div>
        </div>
      ),
    },
    {
      className: "feature-learn-card",
      icon: <FaBookOpen />,
      title: "Want to know what is blog",
      text: "You can know about blogging by clicking on button below",
      to: "/what_is_blog",
      visual: (
        <div className="feature-book-preview">
          <div className="feature-book-page"></div>
          <div className="feature-book-page"></div>
        </div>
      ),
    },
    {
      className: "feature-search-card",
      icon: <FaSearch />,
      title: "Want to search for specific blog",
      text: "You will be redirected to search page after clicking on button below",
      to: "/blogSearch",
      visual: (
        <div className="feature-search-preview">
          <div className="feature-search-input">
            <FaSearch />
            <span>Search blog...</span>
            <strong>
              <FaSearch />
            </strong>
          </div>

          <div className="feature-tag-list">
            <span>Food</span>
            <span>Travel</span>
            <span>Sports</span>
            <span>Technology</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="feature-section" aria-label="Blog actions">
      {/* Background */}

      <div className="feature-gradient-layer"></div>

      <div className="feature-radial-light feature-light-one"></div>
      <div className="feature-radial-light feature-light-two"></div>

      <div className="feature-blob feature-blob-one"></div>
      <div className="feature-blob feature-blob-two"></div>
      <div className="feature-blob feature-blob-three"></div>

      <div className="feature-ring feature-ring-one"></div>
      <div className="feature-ring feature-ring-two"></div>

      <div className="feature-glass-shape feature-glass-one"></div>
      <div className="feature-glass-shape feature-glass-two"></div>

      <div className="feature-particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="feature-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${8 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="feature-container">
        {/* Create Card */}

        <article className="feature-card feature-create-card">
          <div className="feature-glow"></div>
          <div className="feature-border"></div>

          <div className="feature-icon">
            <FaEdit />
          </div>

          <div className="feature-copy">
            <AnimatedHeading text="Create a blog." />

            <p>Share your story with the world.</p>

            <p>
              Stand out with a professionally-designed blog website that can be
              customized to fit your brand.
            </p>

            <p>
              Build, manage, and promote your blog with React Blog Poster's
              built-in suite of design and marketing tools.
            </p>

            <Link className="feature-action-link" to="/login">
              Get Started
            </Link>
          </div>

          <div className="feature-visual feature-editor-preview">
            <div className="feature-editor-toolbar">
              <span>B</span>
              <span>I</span>
              <span>U</span>
              <span>O</span>
            </div>

            <div className="feature-text-block">T</div>

            <div className="feature-editor-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="feature-floating-plus">
              <FaPlus />
            </div>
          </div>
        </article>

        {/* Other Cards */}

        {featureCards.map((card) => (
          <article
            className={`feature-card ${card.className}`}
            key={card.to}
          >
            <div className="feature-glow"></div>

            <div className="feature-border"></div>

            <div className="feature-icon">{card.icon}</div>

            <div className="feature-copy">
              <AnimatedHeading text={card.title} />

              <p>{card.text}</p>

              <Link className="feature-action-link" to={card.to}>
                Click Here
              </Link>
            </div>

            <div className="feature-visual">{card.visual}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;