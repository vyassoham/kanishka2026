import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import './CountdownSection.css'

const CountdownSection = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const [isNewYear, setIsNewYear] = useState(false)

    useEffect(() => {
        // Set target date to New Year 2026 (or assume next year if already passed in real-time)
        // For specific requirement "New Year 2026"
        const targetDate = new Date('January 1, 2026 00:00:00').getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = targetDate - now

            if (distance < 0) {
                clearInterval(interval)
                setIsNewYear(true)
                triggerFireworks()
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                })
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const triggerFireworks = () => {
        const duration = 15 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        const randomInRange = (min, max) => Math.random() * (max - min) + min

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        }, 250)
    }

    return (
        <section id="countdown-section" className="section countdown-section">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="countdown-container"
            >
                <h2 className="section-title text-gradient">
                    {isNewYear ? "Welcome to the Future!" : "Counting Down The Moments"}
                </h2>

                {!isNewYear ? (
                    <div className="countdown-grid">
                        <TimeUnit value={timeLeft.days} label="Days" color="cyan" />
                        <div className="separator">:</div>
                        <TimeUnit value={timeLeft.hours} label="Hours" color="purple" />
                        <div className="separator">:</div>
                        <TimeUnit value={timeLeft.minutes} label="Minutes" color="gold" />
                        <div className="separator">:</div>
                        <TimeUnit value={timeLeft.seconds} label="Seconds" color="pink" />
                    </div>
                ) : (
                    <motion.div
                        className="celebration-message"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                    >
                        <h1>HAPPY NEW YEAR 2026!</h1>
                    </motion.div>
                )}
            </motion.div>
        </section>
    )
}

const TimeUnit = ({ value, label, color }) => {
    return (
        <div className={`time-unit glow-${color}`}>
            <motion.div
                key={value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="time-value"
            >
                {value < 10 ? `0${value}` : value}
            </motion.div>
            <div className="time-label">{label}</div>
        </div>
    )
}

export default CountdownSection
