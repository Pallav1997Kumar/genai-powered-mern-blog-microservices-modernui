import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import "../../../style/single post/ai components/AIGeneratedConclusion.scss";

import backendBaseURL from "../../../backendBaseURL.js";
import { getPlainText } from "../../../utils/utility functions.js";


function AIGeneratedConclusion(props) {

    // ============================================================
    // Get Blog Post Description - starts
    // ============================================================
    const postDescription = props.postDescription;
    // ============================================================
    // Get Blog Post Description - ends
    // ============================================================



    // ============================================================
    // Initialize State Variables - starts
    // ============================================================
    const [conclusion, setConclusion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // ============================================================
    // Initialize State Variables - ends
    // ============================================================



    // ============================================================
    // Generate AI-Generated Blog Conclusion - starts
    // ============================================================

    async function handleGenerateAIGeneratedConclusion() {

        // Reset Error and Set Loading State
        setError(null);
        setLoading(true);

        // Prepare Blog Content for API Request
        const values = {
            blogText: getPlainText(postDescription)
        };

        try {
            // Call AI Blog Conclusion API
            const response = await axios.post(
                `${backendBaseURL}/api/generativeAI/generateBlogConclusion`,
                values
            );

            if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.log(response);
			}

            setConclusion(response.data.blogConclusion);
        } catch (error) {
            if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
				console.error(error);
			}
            setError("Failed to generate conclusion. Please try again");
        } finally {
            setLoading(false);
        }
    }

    // ============================================================
    // Generate AI-Generated Blog Conclusion - starts
    // ============================================================




    // ============================================================
    // JSX Section - starts
    // ============================================================

    return (
        <motion.section
            className="ai-conclusion-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="ai-conclusion-header">

                <motion.div
                    className="ai-conclusion-icon"
                    animate={{
                        boxShadow: [
                            "0 0 0 rgba(124, 58, 237, 0.2)",
                            "0 0 25px rgba(124, 58, 237, 0.45)",
                            "0 0 0 rgba(124, 58, 237, 0.2)"
                        ]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity
                    }}
                >
                    ✦
                </motion.div>

                <div className="ai-conclusion-header-content">
                    <span className="ai-conclusion-label">
                        AI INSIGHT
                    </span>

                    <h4 className="ai-conclusion-title">
                        Generated Conclusion
                    </h4>

                    <p className="ai-conclusion-description">
                        Get a concise conclusion based on this article.
                    </p>
                </div>

            </div>

            <motion.button
                type="button"
                className="ai-conclusion-generate-button"
                disabled={loading}
                onClick={handleGenerateAIGeneratedConclusion}
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
            >
                {loading ? (
                    <>
                        <span className="ai-conclusion-spinner"></span>
                        <span>Generating...</span>
                    </>
                ) : (
                    <>
                        <span className="ai-conclusion-button-sparkle">
                            ✦
                        </span>
                        <span>Generate Conclusion</span>
                    </>
                )}
            </motion.button>

            <AnimatePresence mode="wait">

                {loading && (
                    <motion.div
                        className="ai-conclusion-loading"
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
                        <div className="ai-conclusion-loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <span className="ai-conclusion-loading-text">
                            AI is analyzing your article...
                        </span>
                    </motion.div>
                )}

                {error && !loading && (
                    <motion.div
                        className="ai-conclusion-error"
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
                        <span className="ai-conclusion-error-icon">
                            !
                        </span>

                        <p className="ai-conclusion-error-text">
                            {error}
                        </p>
                    </motion.div>
                )}

                {conclusion && !loading && !error && (
                    <motion.div
                        className="ai-conclusion-result"
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
                        <div className="ai-conclusion-result-header">
                            <div className="ai-conclusion-result-icon">
                                ✦
                            </div>

                            <span>
                                AI Generated Conclusion
                            </span>
                        </div>

                        <p className="ai-conclusion-result-text">
                            {conclusion}
                        </p>

                        <div className="ai-conclusion-result-glow"></div>
                    </motion.div>
                )}

            </AnimatePresence>
        </motion.section>
    );

    // ============================================================
    // JSX Section - ends
    // ============================================================
}

export default AIGeneratedConclusion;