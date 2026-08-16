import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import "../../../style/single post/ai components/AIGeneratedFAQ.scss";

import backendBaseURL from "../../../backendBaseURL.js";
import { getPlainText } from "../../../utils/utility functions.js";



function AIGeneratedFAQ(props) {
    const postDescription = props.postDescription;

    const [faq, setFaq] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleGenerateAIGeneratedFAQ() {
        setError(null);
        setLoading(true);

        const values = {
            blogText: getPlainText(postDescription)
        };

        try {
            const response = await axios.post(
                `${backendBaseURL}/api/generativeAI/generateBlogFAQ`,
                values
            );

            setFaq(response.data.blogFAQ);
        } catch (error) {
            console.log(error);
            setError("Failed to generate FAQ. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.section
            className="ai-faq-section"
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
            <div className="ai-faq-header">

                <motion.div
                    className="ai-faq-icon"
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
                    ?
                </motion.div>

                <div className="ai-faq-header-content">

                    <span className="ai-faq-label">
                        AI INSIGHT
                    </span>

                    <h4 className="ai-faq-title">
                        AI Generated FAQ
                    </h4>

                    <p className="ai-faq-description">
                        Get answers to common questions about this article.
                    </p>

                </div>

            </div>


            {/* Generate Button */}
            <motion.button
                type="button"
                className="ai-faq-generate-button"
                disabled={loading}
                onClick={handleGenerateAIGeneratedFAQ}
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
            >

                {loading ? (
                    <>
                        <span className="ai-faq-spinner"></span>

                        <span>
                            Generating...
                        </span>
                    </>
                ) : (
                    <>
                        <span className="ai-faq-button-icon">
                            ?
                        </span>

                        <span>
                            Generate FAQ
                        </span>
                    </>
                )}

            </motion.button>


            <AnimatePresence mode="wait">

                {/* Loading */}
                {loading && (
                    <motion.div
                        className="ai-faq-loading"
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

                        <div className="ai-faq-loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <span className="ai-faq-loading-text">
                            AI is finding the most relevant questions...
                        </span>

                    </motion.div>
                )}


                {/* Error */}
                {error && !loading && (
                    <motion.div
                        className="ai-faq-error"
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

                        <span className="ai-faq-error-icon">
                            !
                        </span>

                        <p className="ai-faq-error-text">
                            {error}
                        </p>

                    </motion.div>
                )}


                {/* FAQ Results */}
                {faq && !loading && !error && (
                    <motion.div
                        className="ai-faq-list"
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

                        {faq.map((item, index) => (
                            <motion.div
                                className="ai-faq-item"
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 15
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    delay: index * 0.08,
                                    duration: 0.4
                                }}
                                whileHover={{
                                    y: -2
                                }}
                            >

                                <div className="ai-faq-question">

                                    <span className="ai-faq-question-number">
                                        Q{index + 1}
                                    </span>

                                    <h5>
                                        {item.question}
                                    </h5>

                                </div>

                                <div className="ai-faq-answer">

                                    <span className="ai-faq-answer-label">
                                        A
                                    </span>

                                    <p>
                                        {item.answer}
                                    </p>

                                </div>

                            </motion.div>
                        ))}

                    </motion.div>
                )}

            </AnimatePresence>

        </motion.section>
    );
}

export default AIGeneratedFAQ;