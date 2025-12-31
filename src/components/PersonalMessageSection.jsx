import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './PersonalMessageSection.css'

const PersonalMessageSection = () => {
    const containerRef = useRef(null)

    // Stagger animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.5
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className="section message-section" ref={containerRef}>
            <div className="container">
                <motion.div
                    className="message-card-container"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="decorative-border"></div>

                    <motion.h2 variants={item} className="message-title text-elegant">
                        Dear Kanishka,
                    </motion.h2>

                    <motion.div variants={item} className="message-body text-handwritten">
                        <p>
                            As the stars align to welcome 2026, I wanted to take a moment to celebrate you.
                            This isn't just another year passing by—it's a new chapter waiting to be written with
                            your dreams, your laughter, and your unique brilliance.
                        </p>
                        <p>
                            May this new year bring you moments that take your breath away, success that feels
                            effortless, and joy that radiates from within. You are a spark in the universe,
                            and 2026 is your time to shine brighter than ever before.
                        </p>
                        <p>
                            Leave behind what no longer serves you. Embrace the magic of new beginnings.
                            The world is ready for everything you have to offer.
                        </p>
                    </motion.div>

                    <motion.div variants={item} className="message-footer">
                        <div className="signature">With love & hope,</div>
                        <div className="sender-name text-gradient">Your Well Wisher</div>
                    </motion.div>

                    <motion.div
                        className="floating-hearts"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={`heart heart-${i + 1}`}>♥</div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default PersonalMessageSection
