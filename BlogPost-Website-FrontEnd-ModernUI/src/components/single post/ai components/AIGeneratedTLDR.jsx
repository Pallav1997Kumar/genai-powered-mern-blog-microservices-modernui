import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import "../../../style/single post/ai components/AIGeneratedTLDR.scss";

import backendBaseURL from "../../../backendBaseURL.js";
import { getPlainText } from "../../../utils/utility functions.js";



function AIGeneratedTLDR(props) {
    const postDescription = props.postDescription;

    const [tldr, setTldr] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleGenerateAIGeneratedTLDR() {
        setError(null);
        setLoading(true);

        const values = {
            blogText: getPlainText(postDescription)
        };

        try {
            const response = await axios.post(
                `${backendBaseURL}/api/generativeAI/generateBlogTldr`,
                values
            );

            setTldr(response.data.blogTLDR);
        } catch (error) {
            console.log(error);
            setError("Failed to generate TLDR. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.section
            className="ai-tldr-section"
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
            <div className="ai-tldr-header">

                <motion.div
                    className="ai-tldr-icon"
                    animate={{
                        boxShadow: [
                            "0 0 0 rgba(139, 92, 246, 0.15)",
                            "0 0 25px rgba(139, 92, 246, 0.4)",
                            "0 0 0 rgba(139, 92, 246, 0.15)"
                        ]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity
                    }}
                >
                    ⚡
                </motion.div>

                <div className="ai-tldr-header-content">

                    <span className="ai-tldr-label">
                        AI QUICK READ
                    </span>

                    <h4 className="ai-tldr-title">
                        AI Generated TLDR
                    </h4>

                    <p className="ai-tldr-description">
                        Get the key message of this article in seconds.
                    </p>

                </div>

            </div>


            {/* Generate Button */}
            <motion.button
                type="button"
                className="ai-tldr-generate-button"
                disabled={loading}
                onClick={handleGenerateAIGeneratedTLDR}
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
            >

                {loading ? (
                    <>
                        <span className="ai-tldr-spinner"></span>

                        <span>
                            Generating...
                        </span>
                    </>
                ) : (
                    <>
                        <span className="ai-tldr-button-icon">
                            ⚡
                        </span>

                        <span>
                            Generate TLDR
                        </span>
                    </>
                )}

            </motion.button>


            <AnimatePresence mode="wait">

                {/* Loading */}
                {loading && (
                    <motion.div
                        className="ai-tldr-loading"
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

                        <div className="ai-tldr-loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <span className="ai-tldr-loading-text">
                            AI is creating your quick summary...
                        </span>

                    </motion.div>
                )}


                {/* Error */}
                {error && !loading && (
                    <motion.div
                        className="ai-tldr-error"
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

                        <span className="ai-tldr-error-icon">
                            !
                        </span>

                        <p className="ai-tldr-error-text">
                            {error}
                        </p>

                    </motion.div>
                )}


                {/* TLDR */}
                {tldr && !loading && !error && (
                    <motion.div
                        className="ai-tldr-result"
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

                        <div className="ai-tldr-result-header">

                            <div className="ai-tldr-result-icon">
                                ⚡
                            </div>

                            <span>
                                TLDR
                            </span>

                        </div>

                        <p className="ai-tldr-result-text">
                            {tldr}
                        </p>

                        <div className="ai-tldr-result-glow"></div>

                    </motion.div>
                )}

            </AnimatePresence>

        </motion.section>
    );
}

export default AIGeneratedTLDR;