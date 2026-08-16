import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import "../../../style/single post/ai components/AIGeneratedKeyTakeaways.scss";

import backendBaseURL from "../../../backendBaseURL.js";
import { getPlainText } from "../../../utils/utility functions.js";



function AIGeneratedKeyTakeaways(props) {
    const postDescription = props.postDescription;

    const [keyTakeaways, setKeyTakeaways] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleGenerateAIGeneratedKeyTakeaways() {
        setError(null);
        setLoading(true);

        const values = {
            blogText: getPlainText(postDescription)
        };

        try {
            const response = await axios.post(
                `${backendBaseURL}/api/generativeAI/generateBlogKeyTakeaways`,
                values
            );

            setKeyTakeaways(response.data.blogKeyTakeaways);
        } catch (error) {
            console.log(error);
            setError(
                "Failed to generate key takeaways. Please try again"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.section
            className="ai-keytakeaways-section"
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
            <div className="ai-keytakeaways-header">

                <motion.div
                    className="ai-keytakeaways-icon"
                    animate={{
                        boxShadow: [
                            "0 0 0 rgba(16, 185, 129, 0.15)",
                            "0 0 25px rgba(16, 185, 129, 0.4)",
                            "0 0 0 rgba(16, 185, 129, 0.15)"
                        ]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity
                    }}
                >
                    ✓
                </motion.div>

                <div className="ai-keytakeaways-header-content">

                    <span className="ai-keytakeaways-label">
                        AI INSIGHTS
                    </span>

                    <h4 className="ai-keytakeaways-title">
                        AI Generated Key Takeaways
                    </h4>

                    <p className="ai-keytakeaways-description">
                        Quickly understand the most important lessons from this article.
                    </p>

                </div>

            </div>


            {/* Generate Button */}
            <motion.button
                type="button"
                className="ai-keytakeaways-generate-button"
                disabled={loading}
                onClick={handleGenerateAIGeneratedKeyTakeaways}
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
            >

                {loading ? (
                    <>
                        <span className="ai-keytakeaways-spinner"></span>

                        <span>
                            Generating...
                        </span>
                    </>
                ) : (
                    <>
                        <span className="ai-keytakeaways-button-icon">
                            ✓
                        </span>

                        <span>
                            Generate Key Takeaways
                        </span>
                    </>
                )}

            </motion.button>


            <AnimatePresence mode="wait">

                {/* Loading */}
                {loading && (
                    <motion.div
                        className="ai-keytakeaways-loading"
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

                        <div className="ai-keytakeaways-loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <span className="ai-keytakeaways-loading-text">
                            AI is extracting the key takeaways...
                        </span>

                    </motion.div>
                )}


                {/* Error */}
                {error && !loading && (
                    <motion.div
                        className="ai-keytakeaways-error"
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

                        <span className="ai-keytakeaways-error-icon">
                            !
                        </span>

                        <p className="ai-keytakeaways-error-text">
                            {error}
                        </p>

                    </motion.div>
                )}


                {/* Key Takeaways */}
                {keyTakeaways && !loading && !error && (
                    <motion.div
                        className="ai-keytakeaways-result"
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

                        <div className="ai-keytakeaways-result-header">

                            <div className="ai-keytakeaways-result-icon">
                                ✓
                            </div>

                            <span>
                                Key Takeaways
                            </span>

                        </div>


                        <ul className="ai-keytakeaways-list">

                            {keyTakeaways.map(
                                function (takeaway, index) {

                                    return (
                                        <motion.li
                                            className="ai-keytakeaways-item"
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

                                            <span className="ai-keytakeaways-number">
                                                {index + 1}
                                            </span>

                                            <span className="ai-keytakeaways-text">
                                                {takeaway}
                                            </span>

                                        </motion.li>
                                    );

                                }
                            )}

                        </ul>

                        <div className="ai-keytakeaways-result-glow"></div>

                    </motion.div>
                )}

            </AnimatePresence>

        </motion.section>
    );
}

export default AIGeneratedKeyTakeaways;