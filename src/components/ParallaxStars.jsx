import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './ParallaxStars.css'

const ParallaxStars = ({ mousePosition }) => {
    const starsRef = useRef([])

    useEffect(() => {
        // Generate random star positions
        const generateStars = (count, className) => {
            return Array.from({ length: count }, (_, i) => ({
                id: `${className}-${i}`,
                className,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                size: Math.random() * 3 + 1,
                delay: Math.random() * 3,
                duration: Math.random() * 2 + 2,
            }))
        }

        starsRef.current = [
            ...generateStars(50, 'star-layer-1'),
            ...generateStars(50, 'star-layer-2'),
            ...generateStars(50, 'star-layer-3'),
        ]
    }, [])

    return (
        <div className="parallax-stars">
            {/* Star layers with different parallax speeds */}
            <motion.div
                className="star-layer layer-1"
                animate={{
                    x: mousePosition.x * 10,
                    y: mousePosition.y * 10,
                }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
                {starsRef.current
                    .filter((star) => star.className === 'star-layer-1')
                    .map((star) => (
                        <motion.div
                            key={star.id}
                            className="star"
                            style={{
                                left: star.left,
                                top: star.top,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                            }}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: star.duration,
                                repeat: Infinity,
                                delay: star.delay,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
            </motion.div>

            <motion.div
                className="star-layer layer-2"
                animate={{
                    x: mousePosition.x * 20,
                    y: mousePosition.y * 20,
                }}
                transition={{ type: 'spring', stiffness: 40, damping: 20 }}
            >
                {starsRef.current
                    .filter((star) => star.className === 'star-layer-2')
                    .map((star) => (
                        <motion.div
                            key={star.id}
                            className="star"
                            style={{
                                left: star.left,
                                top: star.top,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                            }}
                            animate={{
                                opacity: [0.4, 1, 0.4],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: star.duration,
                                repeat: Infinity,
                                delay: star.delay,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
            </motion.div>

            <motion.div
                className="star-layer layer-3"
                animate={{
                    x: mousePosition.x * 30,
                    y: mousePosition.y * 30,
                }}
                transition={{ type: 'spring', stiffness: 30, damping: 20 }}
            >
                {starsRef.current
                    .filter((star) => star.className === 'star-layer-3')
                    .map((star) => (
                        <motion.div
                            key={star.id}
                            className="star"
                            style={{
                                left: star.left,
                                top: star.top,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                            }}
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.4, 1],
                            }}
                            transition={{
                                duration: star.duration,
                                repeat: Infinity,
                                delay: star.delay,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
            </motion.div>

            {/* Shooting stars */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`shooting-${i}`}
                    className="shooting-star"
                    initial={{
                        x: -100,
                        y: Math.random() * 300,
                        opacity: 0,
                    }}
                    animate={{
                        x: window.innerWidth + 100,
                        y: Math.random() * 600 + 200,
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 5 + Math.random() * 3,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    )
}

export default ParallaxStars
