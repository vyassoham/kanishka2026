import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import './InteractiveSurprises.css'

const InteractiveSurprises = () => {
    const [activeSurprise, setActiveSurprise] = useState(null)

    const triggerConfetti = (origin) => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: origin.x / window.innerWidth, y: origin.y / window.innerHeight },
            colors: ['#FFD700', '#B026FF', '#00F0FF']
        })
    }

    const handleSupriseClick = (id, event) => {
        setActiveSurprise(id)
        triggerConfetti({ x: event.clientX, y: event.clientY })

        // Auto reset after a few seconds
        setTimeout(() => setActiveSurprise(null), 3000)
    }

    const surprises = [
        { id: 1, label: "Your Luck", emoji: "💃", message: "2026 is your Blockbuster year!" },
        { id: 2, label: "Your Joy", emoji: "🎊", message: "Full-on Masti & Thumkas!" },
        { id: 3, label: "Your Magic", emoji: "✨", message: "Picture Abhi Baaki Hai, Dost!" },
    ]

    return (
        <section className="section interactive-section">
            <div className="container text-center">
                <motion.h2
                    className="section-title mb-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    Unlock Your Blessings
                </motion.h2>

                <div className="surprises-grid">
                    {surprises.map((item) => (
                        <motion.div
                            key={item.id}
                            className="surprise-card"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => handleSupriseClick(item.id, e)}
                        >
                            <div className="surprise-icon">
                                {activeSurprise === item.id ? item.emoji : "?"}
                            </div>
                            <h3>{activeSurprise === item.id ? item.message : item.label}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default InteractiveSurprises
