import { useEffect, useMemo, useRef, useState } from "react";

import "../../../style/static component/HomePage Styling/WhyReadOurBlogSection.scss";

const reasons = [
    {
        id: 1,
        title: "Expert Insights",
        subtitle: "Written By Specialists",
        description:
            "Every article is researched, verified and structured to provide meaningful knowledge instead of superficial information.",
        icon: (
            <svg viewBox="0 0 64 64">
                <circle cx="32" cy="22" r="10" fill="currentColor" />
                <path d="M18 48C18 39 24 34 32 34C40 34 46 39 46 48" fill="currentColor" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Research Driven",
        subtitle: "Reliable Information",
        description:
            "Content is based on trusted resources and practical experience, ensuring every article delivers real value.",
        icon: (
            <svg viewBox="0 0 64 64">
                <rect x="18" y="14" width="28" height="36" rx="4" fill="currentColor"/>
                <rect x="24" y="22" width="16" height="3" rx="2" fill="#fff"/>
                <rect x="24" y="30" width="12" height="3" rx="2" fill="#fff"/>
            </svg>
        )
    },
    {
        id: 3,
        title: "Practical Learning",
        subtitle: "Apply Immediately",
        description:
            "Instead of theory alone, we focus on actionable knowledge that readers can use in real-world situations.",
        icon: (
            <svg viewBox="0 0 64 64">
                <path d="M18 34L28 44L46 20" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        id: 4,
        title: "Always Updated",
        subtitle: "Latest Trends",
        description:
            "Articles evolve alongside technology, industry practices and changing user expectations.",
        icon: (
            <svg viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="5" fill="none"/>
                <path d="M32 20V34L40 40" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        id: 5,
        title: "Community Focused",
        subtitle: "Built For Everyone",
        description:
            "Knowledge is presented with clarity so beginners and professionals can both benefit from every article.",
        icon: (
            <svg viewBox="0 0 64 64">
                <circle cx="20" cy="22" r="7" fill="currentColor"/>
                <circle cx="44" cy="22" r="7" fill="currentColor"/>
                <circle cx="32" cy="42" r="8" fill="currentColor"/>
            </svg>
        )
    },
    {
        id: 6,
        title: "Premium Experience",
        subtitle: "Beautiful Reading",
        description:
            "Elegant typography, immersive layouts and thoughtful interactions create a reading experience readers enjoy.",
        icon: (
            <svg viewBox="0 0 64 64">
                <polygon points="32,10 38,24 54,24 41,34 46,50 32,40 18,50 23,34 10,24 26,24" fill="currentColor"/>
            </svg>
        )
    }
];

const glowingWords = ["Read", "Blog"];

export default function WhyReadOurBlogSection() {

    const sectionRef = useRef(null);

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.25 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();

    }, []);

    const heading = useMemo(
        () => "Why Read Our Blog",
        []
    );

    const headingLetters = useMemo(() => {

        let counter = 0;

        return heading.split(" ").map((word) => ({
            highlight: glowingWords.includes(word),
            letters: word.split("").map(letter => ({
                value: letter,
                index: counter++
            }))
        }));

    }, [heading]);

    const particles = useMemo(
        () =>
            Array.from({ length: 24 }, (_, i) => ({
                id: i,
                className: `why-read-blog-particle why-read-blog-particle-${i + 1}`
            })),
        []
    );

    const rings = useMemo(
        () =>
            Array.from({ length: 4 }, (_, i) => ({
                id: i,
                className: `why-read-blog-ring why-read-blog-ring-${i + 1}`
            })),
        []
    );

    const streaks = useMemo(
        () =>
            Array.from({ length: 8 }, (_, i) => ({
                id: i,
                className: `why-read-blog-streak why-read-blog-streak-${i + 1}`
            })),
        []
    );

    return (

        <section
            ref={sectionRef}
            className={`why-read-blog-section ${visible ? "why-read-blog-section-visible" : ""}`}
        >

            <div className="why-read-blog-background-layer">

                <div className="why-read-blog-radial-glow" />
                <div className="why-read-blog-blob why-read-blog-blob-1" />
                <div className="why-read-blog-blob why-read-blog-blob-2" />
                <div className="why-read-blog-blob why-read-blog-blob-3" />
                <div className="why-read-blog-blob why-read-blog-blob-4" />
                <div className="why-read-blog-glass-reflection why-read-blog-reflection-1" />
                <div className="why-read-blog-glass-reflection why-read-blog-reflection-2" />

                {particles.map(item => (
                    <span
                        key={item.id}
                        className={item.className}
                    />
                ))}

                {rings.map(item => (
                    <span
                        key={item.id}
                        className={item.className}
                    />
                ))}

                {streaks.map(item => (
                    <span
                        key={item.id}
                        className={item.className}
                    />
                ))}

            </div>

            <div className="why-read-blog-container">

                <div className="why-read-blog-section-heading">

                    <span className="why-read-blog-eyebrow">
                        ● WHY READ OUR BLOG
                    </span>

                    <h2>
                        {headingLetters.map((word, index) => (
                            <span
                                key={index}
                                className={`why-read-blog-heading-word ${word.highlight ? "why-read-blog-heading-word" : ""}`}
                            >
                                {word.letters.map(letter => (
                                    <span
                                        key={letter.index}
                                        className="why-read-blog-heading-letter"
                                        style={{
                                            animationDelay: `${letter.index * 0.04}s`
                                        }}
                                    >
                                        {letter.value}
                                    </span>
                                ))}
                                {" "}
                            </span>
                        ))}
                    </h2>

                    <p className="why-read-blog-section-description">
                        Discover carefully researched articles, practical tutorials,
                        expert insights and beautifully crafted content designed to
                        help you learn faster, think deeper and stay ahead in an
                        ever-changing digital world.
                    </p>

                </div>

                <div className="why-read-blog-feature-grid">

                    {reasons.map((item, index) => (
                        <article
                            key={item.id}
                            className="why-read-blog-feature-card"
                            style={{
                                animationDelay: `${0.35 + index * 0.12}s`
                            }}
                        >
                            <div className="why-read-blog-card-border" />
                            <div className="why-read-blog-card-glow" />
                            <div className="why-read-blog-card-reflection" />
                            <span className="why-read-blog-hover-shine" />

                            <div className="why-read-blog-card-layout">

                                <div className="why-read-blog-icon-wrapper">
                                    <div className="why-read-blog-icon-ring" />
                                    <div className="why-read-blog-icon-background" />
                                    <div className="why-read-blog-icon">
                                        {item.icon}
                                    </div>
                                </div>

                                <div className="why-read-blog-card-content">
                                    <span className="subtitle">
                                        {item.subtitle}
                                    </span>
                                    <h3>
                                        {item.title}
                                    </h3>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>

                            </div>

                        </article>
                    ))}

                </div>

            </div>  

        </section>
    );  

}