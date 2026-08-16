import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import "../../../style/single post/ai components/AIGeneratedHighlights.scss";

import backendBaseURL from "../../../backendBaseURL.js";
import { getPlainText } from "../../../utils/utility functions.js";



function AIGeneratedHighlights(props) {
    const postDescription = props.postDescription;

    const [highlights, setHighlights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleGenerateAIGeneratedHighlights() {
        setError(null);
        setLoading(true);

        const values = {
            blogText: getPlainText(postDescription)
        };

        try {
            const response = await axios.post(
                `${backendBaseURL}/api/generativeAI/generateBlogHighlights`,
                values
            );

            setHighlights(response.data.blogHighlights);
        } catch (error) {
            console.log(error);
            setError("Failed to generate highlights. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.section
            className="ai-highlights-section"
            initial={{
                opacity: 0,
                y: 20
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.5
            }}
        >

            {/* Header */}
            <div className="ai-highlights-header">

                <motion.div
                    className="ai-highlights-icon"
                    animate={{
                        boxShadow: [
                            "0 0 0 rgba(245, 158, 11, 0.15)",
                            "0 0 25px rgba(245, 158, 11, 0.4)",
                            "0 0 0 rgba(245, 158, 11, 0.15)"
                        ]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity
                    }}
                >
                    ✦
                </motion.div>

                <div className="ai-highlights-header-content">

                    <span className="ai-highlights-label">
                        AI INSIGHT
                    </span>

                    <h4 className="ai-highlights-title">
                        AI Generated Highlights
                    </h4>

                    <p className="ai-highlights-description">
                        Discover the most important points from this article.
                    </p>

                </div>

            </div>


            {/* Generate Button */}
            <motion.button
                type="button"
                className="ai-highlights-generate-button"
                disabled={loading}
                onClick={handleGenerateAIGeneratedHighlights}
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
            >

                {loading ? (
                    <>
                        <span className="ai-highlights-spinner"></span>

                        <span>
                            Generating...
                        </span>
                    </>
                ) : (
                    <>
                        <span className="ai-highlights-button-icon">
                            ✦
                        </span>

                        <span>
                            Generate Highlights
                        </span>
                    </>
                )}

            </motion.button>


            <AnimatePresence mode="wait">

                {/* Loading */}
                {loading && (
                    <motion.div
                        className="ai-highlights-loading"
                        initial={{
                            opacity: 0,
                            height: 0
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto"
                        }}
                        exit={{
                            opacity: 0,
                            height: 0
                        }}
                    >

                        <div className="ai-highlights-loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <span className="ai-highlights-loading-text">
                            AI is identifying the key highlights...
                        </span>

                    </motion.div>
                )}


                {/* Error */}
                {error && !loading && (
                    <motion.div
                        className="ai-highlights-error"
                        initial={{
                            opacity: 0,
                            y: 10
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            y: -10
                        }}
                    >

                        <span className="ai-highlights-error-icon">
                            !
                        </span>

                        <p className="ai-highlights-error-text">
                            {error}
                        </p>

                    </motion.div>
                )}


                {/* Highlights */}
                {highlights && !loading && !error && (
                    <motion.div
                        className="ai-highlights-result"
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.5
                        }}
                    >

                        <div className="ai-highlights-result-header">

                            <div className="ai-highlights-result-icon">
                                ✦
                            </div>

                            <span>
                                Key Highlights
                            </span>

                        </div>

                        <ul className="ai-highlights-list">

                            {highlights.map((highlight, index) => (
                                <motion.li
                                    className="ai-highlights-item"
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        x: -15
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0
                                    }}
                                    transition={{
                                        delay: index * 0.08,
                                        duration: 0.4
                                    }}
                                >

                                    <span className="ai-highlights-number">
                                        {index + 1}
                                    </span>

                                    <span className="ai-highlights-text">
                                        {highlight}
                                    </span>

                                </motion.li>
                            ))}

                        </ul>

                        <div className="ai-highlights-result-glow"></div>

                    </motion.div>
                )}

            </AnimatePresence>

        </motion.section>
    );
}

export default AIGeneratedHighlights;