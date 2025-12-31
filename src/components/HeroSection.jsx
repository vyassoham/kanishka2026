import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './HeroSection.css'

const HeroSection = ({ onStartJourney, hasStarted }) => {
    const containerRef = useRef(null)
    const { scrollY } = useScroll()

    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    return (
        <section className="section hero-section" ref={containerRef}>
            <motion.div
                className="hero-content"
                style={{ y: y1, opacity }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hero-subtitle"
                >
                    <span className="line-before"></span>
                    A Digital Experience For
                    <span className="line-after"></span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    className="hero-title text-gradient"
                >
                    KANISHKA
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="hero-year-container"
                >
                    <span className="hero-year text-gold">20</span>
                    <span className="hero-year text-purple">26</span>
                </motion.div>

                {!hasStarted && (
                    <motion.button
                        className="btn btn-primary start-btn"
                        onClick={onStartJourney}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ delay: 2, duration: 0.5 }}
                    >
                        Start The Journey
                    </motion.button>
                )}
            </motion.div>

            {/* Atmospheric elements */}
            <motion.div
                className="hero-atmosphere"
                style={{ y: y2 }}
            >
                <div className="fog-layer"></div>
                <div className="glow-corner top-left"></div>
                <div className="glow-corner bottom-right"></div>
            </motion.div>

            {/* Scroll indicator */}
            {hasStarted && (
                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="scroll-text">Scroll to Begin</span>
                    <div className="scroll-line"></div>
                </motion.div>
            )}
        </section>
    )
}

export default HeroSection
