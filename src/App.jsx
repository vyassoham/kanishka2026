import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Import all components
import AnimatedBackground from './components/AnimatedBackground'
import MusicController from './components/MusicController'
import HeroSection from './components/HeroSection'
import CountdownSection from './components/CountdownSection'
import PersonalMessageSection from './components/PersonalMessageSection'
import MemoryGallery from './components/MemoryGallery'
import VideoSection from './components/VideoSection'
import InteractiveSurprises from './components/InteractiveSurprises'
import GrandFinale from './components/GrandFinale'
import ParallaxStars from './components/ParallaxStars'
import LoadingScreen from './components/LoadingScreen'

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [hasStarted, setHasStarted] = useState(false)
    const [isMusicPlaying, setIsMusicPlaying] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const appRef = useRef(null)

    // Handle loading animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    // Track mouse position for parallax effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (appRef.current) {
                const { clientX, clientY } = e
                const { innerWidth, innerHeight } = window

                setMousePosition({
                    x: (clientX / innerWidth - 0.5) * 2,
                    y: (clientY / innerHeight - 0.5) * 2
                })
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Handle journey start
    const handleStartJourney = () => {
        setHasStarted(true)
        setIsMusicPlaying(true)

        // Smooth scroll to countdown section
        setTimeout(() => {
            const countdownSection = document.getElementById('countdown-section')
            if (countdownSection) {
                countdownSection.scrollIntoView({ behavior: 'smooth' })
            }
        }, 500)
    }

    // Toggle music
    const toggleMusic = () => {
        setIsMusicPlaying(!isMusicPlaying)
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loading" />}
            </AnimatePresence>

            {!isLoading && (
                <div className="app" ref={appRef}>
                    {/* Animated background with particles */}
                    <AnimatedBackground mousePosition={mousePosition} />

                    {/* Parallax stars layer */}
                    <ParallaxStars mousePosition={mousePosition} />

                    {/* Music controller - fixed position */}
                    <MusicController
                        isPlaying={isMusicPlaying}
                        onToggle={toggleMusic}
                    />

                    {/* Main content sections */}
                    <main className="app-content">
                        {/* Section 1: Hero/Landing */}
                        <HeroSection
                            onStartJourney={handleStartJourney}
                            hasStarted={hasStarted}
                        />

                        {/* Section 2: Countdown */}
                        <CountdownSection />

                        {/* Section 3: Personal Message */}
                        <PersonalMessageSection />

                        {/* Section 4: Memory Gallery */}
                        <MemoryGallery />

                        {/* Section 5: Video Section */}
                        <VideoSection />

                        {/* Section 6: Interactive Surprises */}
                        <InteractiveSurprises />

                        {/* Section 7: Grand Finale */}
                        <GrandFinale />
                    </main>

                    {/* Audio element for background music */}
                    <audio
                        id="background-music"
                        loop
                        preload="auto"
                    >
                        <source src="/audio/bollywood-vibe.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </>
    )
}

export default App
