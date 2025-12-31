import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './LoadingScreen.css'

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 2
            })
        }, 40)

        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
            <div className="loading-content">
                {/* Animated logo/symbol */}
                <motion.div
                    className="loading-symbol"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <div className="symbol-ring ring-1"></div>
                    <div className="symbol-ring ring-2"></div>
                    <div className="symbol-ring ring-3"></div>
                    <div className="symbol-center">2026</div>
                </motion.div>

                {/* Loading text */}
                <motion.h2
                    className="loading-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Preparing something special...
                </motion.h2>

                {/* Progress bar */}
                <div className="loading-progress-container">
                    <motion.div
                        className="loading-progress-bar"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <motion.p
                    className="loading-percentage"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {progress}%
                </motion.p>

                {/* Floating particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="loading-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            y: [0, -100],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default LoadingScreen
