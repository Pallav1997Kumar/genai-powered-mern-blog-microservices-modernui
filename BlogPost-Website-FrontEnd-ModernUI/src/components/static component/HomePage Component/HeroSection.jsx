import React, { useEffect, useRef, useState } from "react";

import "../../../style/static component/HomePage Styling/HeroSection.scss";

const title = "Blog Poster";

function HeroSection() {
    const [rotateTitle, setRotateTitle] = useState(false);
    const heroTitleRef = useRef(null);

    useEffect(() => {
        const totalAnimationTime = title.length * 120 + 1800;

        const timer = setTimeout(() => {
            setRotateTitle(true);

            setTimeout(() => {
                setRotateTitle(false);
            }, 1200);
        }, totalAnimationTime);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero-section">
            {/* Animated Background */}
            <div className="hero-background">
                <div className="gradient-layer"></div>

                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>

                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>

                <div className="glass-card glass-card-1"></div>
                <div className="glass-card glass-card-2"></div>

                <div className="light-streak streak-1"></div>
                <div className="light-streak streak-2"></div>

                <span className="particle particle-1"></span>
                <span className="particle particle-2"></span>
                <span className="particle particle-3"></span>
                <span className="particle particle-4"></span>
                <span className="particle particle-5"></span>
                <span className="particle particle-6"></span>
                <span className="particle particle-7"></span>
                <span className="particle particle-8"></span>
                <span className="particle particle-9"></span>
                <span className="particle particle-10"></span>

                <span className="dot dot-1"></span>
                <span className="dot dot-2"></span>
                <span className="dot dot-3"></span>
                <span className="dot dot-4"></span>
                <span className="dot dot-5"></span>
            </div>

            <div className="hero-container">

                <header className="hero-content">

                    <div
                        ref={heroTitleRef}
                        className={`hero-title ${rotateTitle ? "rotate-title" : ""}`}
                        aria-label={title}
                    >
                        {title.split("").map((letter, index) => (
                            <span
                                key={index}
                                className={`hero-letter ${letter === " " ? "space" : ""}`}
                                style={{
                                    animationDelay: `${index * 0.12}s, ${index * 0.12}s`,
                                }}
                                aria-hidden="true"
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </span>
                        ))}
                    </div>

                    <p className="hero-subtitle">
                        Create beautiful blog posts instantly with AI.
                    </p>

                    <div className="hero-buttons">

                        <button
                            type="button"
                            className="primary-btn"
                        >
                            <span>Get Started</span>
                            <div className="button-ripple"></div>
                        </button>

                        <button
                            type="button"
                            className="secondary-btn"
                        >
                            <span>Learn More</span>
                            <div className="button-ripple"></div>
                        </button>

                    </div>

                </header>

                <aside
                    className="hero-visual"
                    aria-hidden="true"
                >
                    <div className="floating-card card-1">
                        <div className="card-icon">✍️</div>
                        <h4>Write</h4>
                    </div>

                    <div className="floating-card card-2">
                        <div className="card-icon">🤖</div>
                        <h4>AI</h4>
                    </div>

                    <div className="floating-card card-3">
                        <div className="card-icon">🚀</div>
                        <h4>Publish</h4>
                    </div>

                    <div className="hero-orb orb-1"></div>
                    <div className="hero-orb orb-2"></div>
                    <div className="hero-orb orb-3"></div>

                    <div className="hero-circle circle-1"></div>
                    <div className="hero-circle circle-2"></div>

                    <div className="hero-glow"></div>

                    <div className="hero-glass">
                        <div className="glass-header"></div>

                        <div className="glass-body">
                            <div className="glass-line"></div>
                            <div className="glass-line short"></div>
                            <div className="glass-line"></div>
                            <div className="glass-line medium"></div>
                        </div>
                    </div>
                </aside>

            </div>
        </section>
    );
}

export default HeroSection;