import { useEffect, useMemo, useRef, useState } from "react";

import "../../../style/static component/HomePage Styling/OurMissionSection.scss";

const missionCards = [
    {
        id: 1,
        title: "Educate",
        subtitle: "Accessible Knowledge",
        description:
            "Deliver carefully researched content that transforms complex topics into practical learning experiences.",
        accent: "blue",
        icon: (
            <svg viewBox="0 0 64 64">
                <path
                    d="M18 40L32 16L46 40H37V50H27V40Z"
                    fill="currentColor"
                />
                <circle cx="32" cy="54" r="4" fill="currentColor" />
            </svg>
        ),
    },
    {
        id: 2,
        title: "Inspire",
        subtitle: "Creative Thinking",
        description:
            "Encourage curiosity with engaging stories, insightful perspectives and beautifully structured articles.",
        accent: "orange",
        icon: (
            <svg viewBox="0 0 64 64">
                <circle cx="32" cy="24" r="12" fill="currentColor" />
                <rect
                    x="29"
                    y="36"
                    width="6"
                    height="10"
                    rx="2"
                    fill="currentColor"
                />
                <rect
                    x="24"
                    y="46"
                    width="16"
                    height="4"
                    rx="2"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        id: 3,
        title: "Empower",
        subtitle: "Real Impact",
        description:
            "Enable readers to make informed decisions through reliable, evidence-driven and trustworthy knowledge.",
        accent: "green",
        icon: (
            <svg viewBox="0 0 64 64">
                <circle
                    cx="32"
                    cy="32"
                    r="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                />
                <circle cx="32" cy="32" r="6" fill="currentColor" />
            </svg>
        ),
    },
];

const highlightWords = ["Learn", "Grow", "Future"];

function OurMissionSection() {
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
            {
                threshold: 0.25,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const heading = useMemo(
        () => "Our Mission Is To Educate Inspire And Empower Every Learner",
        []
    );

    const headingLetters = useMemo(() => {
        const words = heading.split(" ");

        let globalIndex = 0;

        return words.map((word) => {
            const letters = word.split("").map((letter) => ({
                value: letter,
                index: globalIndex++,
            }));

            return {
                word,
                letters,
                highlight: highlightWords.includes(word),
            };
        });
    }, [heading]);

    const particles = useMemo(
        () =>
            Array.from({ length: 28 }, (_, index) => ({
                id: index,
                className: `mission-particle mission-particle-${index + 1}`,
            })),
        []
    );

    const lightStreaks = useMemo(
        () =>
            Array.from({ length: 8 }, (_, index) => ({
                id: index,
                className: `mission-light-streak mission-streak-${index + 1}`,
            })),
        []
    );

    const rings = useMemo(
        () =>
            Array.from({ length: 4 }, (_, index) => ({
                id: index,
                className: `mission-orbit-ring mission-orbit-${index + 1}`,
            })),
        []
    );

    return (
        <section
            ref={sectionRef}
            className={`our-mission-section ${
                visible ? "mission-section-visible" : ""
            }`}
        >
            {/* ===============================
                    Animated Background
            =============================== */}

            <div className="mission-background-layer">

                <div className="mission-radial-glow" />

                <div className="mission-glass-reflection mission-glass-one" />
                <div className="mission-glass-reflection mission-glass-two" />

                <div className="mission-blob mission-blob-one" />
                <div className="mission-blob mission-blob-two" />
                <div className="mission-blob mission-blob-three" />
                <div className="mission-blob mission-blob-four" />

                {particles.map((particle) => (
                    <span
                        key={particle.id}
                        className={particle.className}
                    />
                ))}

                {lightStreaks.map((item) => (
                    <span
                        key={item.id}
                        className={item.className}
                    />
                ))}

                {rings.map((ring) => (
                    <span
                        key={ring.id}
                        className={ring.className}
                    />
                ))}
            </div>

            <div className="mission-container">

                {/* ===============================
                        Heading
                =============================== */}

                <div className="mission-section-heading">

                    <span className="mission-eyebrow">
                        ● OUR MISSION
                    </span>

                    <h2>

                        {headingLetters.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className={`mission-heading-word ${
                                    word.highlight
                                        ? "mission-highlight-word"
                                        : ""
                                }`}
                            >
                                {word.letters.map((letter) => (
                                    <span
                                        key={letter.index}
                                        className="mission-heading-letter"
                                        style={{
                                            animationDelay: `${
                                                letter.index * 0.035
                                            }s`,
                                        }}
                                    >
                                        {letter.value}
                                    </span>
                                ))}

                                <span className="mission-word-space">
                                    &nbsp;
                                </span>

                            </span>
                        ))}

                    </h2>

                    <p className="mission-section-description">
                        We believe knowledge should feel immersive,
                        trustworthy and beautifully crafted. Every
                        article, guide and tutorial is created to
                        transform curiosity into confident action while
                        maintaining exceptional editorial quality.
                    </p>

                </div>

                
                {/* ===============================
                        Mission Cards
                =============================== */}

                <div className="mission-cards">

                    {missionCards.map((card, index) => (
                        <article
                            key={card.id}
                            className={`mission-card ${card.accent}`}
                            style={{
                                animationDelay: `${0.45 + index * 0.18}s`,
                            }}
                        >
                            <div className="mission-card-border" />
                            <div className="mission-card-glass" />
                            <div className="mission-card-reflection" />
                            <div className="mission-card-glow" />

                            <div className="mission-card-content">

                                <div className="mission-icon-wrapper">
                                    <div className="mission-icon-ring" />
                                    <div className="mission-icon-bg" />
                                    <div className="mission-icon">
                                        {card.icon}
                                    </div>
                                </div>

                                <div className="mission-content">
                                    <span className="mission-subtitle">
                                        {card.subtitle}
                                    </span>
                                    <h3>{card.title}</h3>
                                    <p>
                                        {card.description}
                                    </p>
                                </div>

                            </div>

                            <span className="mission-hover-shine" />
                            <span className="mission-hover-gradient" />

                        </article>
                    ))}

                </div>

            </div>


            {/* ===============================
                    Decorative Layer
            =============================== */}

            <div className="mission-ambient-layer">

                <span className="mission-ambient mission-ambient-1" />
                <span className="mission-ambient mission-ambient-2" />
                <span className="mission-ambient mission-ambient-3" />
                <span className="mission-ambient mission-ambient-4" />

                <span className="mission-tiny-orb mission-orb-1" />
                <span className="mission-tiny-orb mission-orb-2" />
                <span className="mission-tiny-orb mission-orb-3" />
                <span className="mission-tiny-orb mission-orb-4" />
                <span className="mission-tiny-orb mission-orb-5" />
                <span className="mission-tiny-orb mission-orb-6" />

            </div>

        </section>
    );
}


export default OurMissionSection;