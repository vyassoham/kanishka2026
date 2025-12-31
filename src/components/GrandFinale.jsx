import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import './GrandFinale.css'

const GrandFinale = () => {
    const sectionRef = useRef(null)

    const handleGrandCelebration = () => {
        const end = Date.now() + 5 * 1000;

        // go Buckeyes!
        const colors = ['#bb0000', '#ffffff'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    return (
        <section className="section finale-section" ref={sectionRef}>
            <div className="fireworks-container"></div>

            <div className="container finale-content">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <motion.h1
                        className="finale-title"
                        animate={{
                            textShadow: [
                                "0 0 20px #fff",
                                "0 0 40px #ff00de",
                                "0 0 20px #fff"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        HAPPY NEW YEAR KANISHKA
                    </motion.h1>

                    <p className="finale-message text-elegant">
                        May your 2026 be as spectacular as you are.
                    </p>

                    <motion.button
                        className="btn btn-primary mt-5"
                        onClick={handleGrandCelebration}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Launch Final Fireworks 🎆
                    </motion.button>
                </motion.div>

                <footer className="footer">
                    <p>© 2026 Crafted with  For Kanishka</p>
                </footer>
            </div>
        </section>
    )
}

export default GrandFinale
