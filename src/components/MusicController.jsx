import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import './MusicController.css'

const MusicController = ({ isPlaying, onToggle }) => {
    const [volume, setVolume] = useState(0.5)
    const [showVolumeSlider, setShowVolumeSlider] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        // Get audio element from DOM (defined in App.jsx)
        const audioEl = document.getElementById('background-music')
        if (audioEl) {
            audioRef.current = audioEl
            audioRef.current.volume = volume
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    useEffect(() => {
        if (!audioRef.current) return

        if (isPlaying) {
            // Fade in audio
            audioRef.current.volume = 0
            const playPromise = audioRef.current.play()

            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log("Audio play prevented:", error)
                })
            }

            let fadeVolume = 0
            const fadeInterval = setInterval(() => {
                if (fadeVolume < volume) {
                    fadeVolume += 0.05
                    if (fadeVolume > 1) fadeVolume = 1
                    audioRef.current.volume = Math.min(fadeVolume, volume)
                } else {
                    clearInterval(fadeInterval)
                }
            }, 100)

            return () => clearInterval(fadeInterval)
        } else {
            // Fade out audio
            let fadeVolume = audioRef.current.volume
            const fadeInterval = setInterval(() => {
                if (fadeVolume > 0) {
                    fadeVolume -= 0.05
                    if (fadeVolume < 0) fadeVolume = 0
                    audioRef.current.volume = fadeVolume
                } else {
                    audioRef.current.pause()
                    clearInterval(fadeInterval)
                }
            }, 100)

            return () => clearInterval(fadeInterval)
        }
    }, [isPlaying])

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
    }

    return (
        <motion.div
            className="music-controller"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
        >
            <div className="music-controller-content">
                {/* Play/Pause button */}
                <motion.button
                    className="music-toggle-btn"
                    onClick={onToggle}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{
                            duration: 3,
                            repeat: isPlaying ? Infinity : 0,
                            ease: 'linear',
                        }}
                    >
                        <FaMusic />
                    </motion.div>
                </motion.button>

                {/* Volume control */}
                <motion.button
                    className="volume-toggle-btn"
                    onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Volume control"
                >
                    {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                </motion.button>

                {/* Volume slider */}
                <AnimatePresence>
                    {showVolumeSlider && (
                        <motion.div
                            className="volume-slider-container"
                            initial={{ opacity: 0, width: 0, overflow: 'hidden' }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                                aria-label="Volume slider"
                            />
                            <span className="volume-percentage">
                                {Math.round(volume * 100)}%
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Equalizer visualization */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        className="equalizer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="equalizer-bar"
                                animate={{
                                    scaleY: [0.3, 1, 0.5, 0.8, 0.3].map(s => s + Math.random() * 0.5),
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: 'easeInOut',
                                    repeatType: "reverse"
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Audio wave ring effect */}
            {isPlaying && (
                <motion.div
                    className="audio-ring"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />
            )}
        </motion.div>
    )
}

export default MusicController
