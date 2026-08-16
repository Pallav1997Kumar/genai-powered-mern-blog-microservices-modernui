import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import "../../../style/single post/ai components/AIGeneratedSummary.scss";

import backendBaseURL from "../../../backendBaseURL.js";
import { getPlainText } from "../../../utils/utility functions.js";



function AIGeneratedSummary(props) {
    const postDescription = props.postDescription;

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleGenerateAIGeneratedSummary() {
        setError(null);
        setLoading(true);

        const values = {
            blogText: getPlainText(postDescription)
        };

        try {
            const response = await axios.post(
                `${backendBaseURL}/api/generativeAI/generateBlogSummary`,
                values
            );

            setSummary(response.data.blogSummary);
        } catch (error) {
            console.log(error);
            setError("Failed to generate summary. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.section
            className="ai-summary-section"
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
            <div className="ai-summary-header">

                <motion.div
                    className="ai-summary-icon"
                    animate={{
                        boxShadow: [
                            "0 0 0 rgba(14, 165, 233, 0.15)",
                            "0 0 25px rgba(14, 165, 233, 0.4)",
                            "0 0 0 rgba(14, 165, 233, 0.15)"
                        ]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity
                    }}
                >
                    ✦
                </motion.div>

                <div className="ai-summary-header-content">

                    <span className="ai-summary-label">
                        AI INSIGHT
                    </span>

                    <h4 className="ai-summary-title">
                        AI Generated Summary
                    </h4>

                    <p className="ai-summary-description">
                        Get a clear and concise summary of this article.
                    </p>

                </div>

            </div>


            {/* Generate Button */}
            <motion.button
                type="button"
                className="ai-summary-generate-button"
                disabled={loading}
                onClick={handleGenerateAIGeneratedSummary}
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
            >

                {loading ? (
                    <>
                        <span className="ai-summary-spinner"></span>

                        <span>
                            Generating...
                        </span>
                    </>
                ) : (
                    <>
                        <span className="ai-summary-button-sparkle">
                            ✦
                        </span>

                        <span>
                            Generate Summary
                        </span>
                    </>
                )}

            </motion.button>


            {/* Dynamic Content */}
            <AnimatePresence mode="wait">

                {/* Loading */}
                {loading && (
                    <motion.div
                        className="ai-summary-loading"
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

                        <div className="ai-summary-loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <span className="ai-summary-loading-text">
                            AI is analyzing your article...
                        </span>

                    </motion.div>
                )}


                {/* Error */}
                {error && !loading && (
                    <motion.div
                        className="ai-summary-error"
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

                        <span className="ai-summary-error-icon">
                            !
                        </span>

                        <p className="ai-summary-error-text">
                            {error}
                        </p>

                    </motion.div>
                )}


                {/* Generated Summary */}
                {summary && !loading && !error && (
                    <motion.div
                        className="ai-summary-result"
                        initial={{
                            opacity: 0,
                            y: 25,
                            scale: 0.97
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >

                        <div className="ai-summary-result-header">

                            <div className="ai-summary-result-icon">
                                ✦
                            </div>

                            <span>
                                AI Generated Summary
                            </span>

                        </div>

                        <p className="ai-summary-result-text">
                            {summary}
                        </p>

                        <div className="ai-summary-result-glow"></div>

                    </motion.div>
                )}

            </AnimatePresence>

        </motion.section>
    );
}

export default AIGeneratedSummary;