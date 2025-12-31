import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './AnimatedBackground.css'

const AnimatedBackground = ({ mousePosition }) => {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const animationFrameRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let width = window.innerWidth
        let height = window.innerHeight

        canvas.width = width
        canvas.height = height

        // Particle class for floating elements
        class Particle {
            constructor() {
                this.reset()
                this.y = Math.random() * height
                this.velocityY = Math.random() * 0.5 + 0.1
            }

            reset() {
                this.x = Math.random() * width
                this.y = -10
                this.size = Math.random() * 3 + 1
                this.velocityY = Math.random() * 0.5 + 0.1
                this.velocityX = (Math.random() - 0.5) * 0.3
                this.opacity = Math.random() * 0.5 + 0.3
                this.hue = Math.random() * 60 + 180 // Blue to purple range
            }

            update() {
                this.x += this.velocityX
                this.y += this.velocityY

                // Add mouse interaction
                if (mousePosition) {
                    const dx = mousePosition.x * 50
                    const dy = mousePosition.y * 50
                    this.x += dx * 0.01
                    this.y += dy * 0.01
                }

                // Reset when off screen
                if (this.y > height + 10) {
                    this.reset()
                }

                if (this.x < -10 || this.x > width + 10) {
                    this.x = Math.random() * width
                }
            }

            draw(ctx) {
                ctx.save()
                ctx.globalAlpha = this.opacity

                // Draw glow
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 3
                )
                gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, 1)`)
                gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`)

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
                ctx.fill()

                // Draw particle
                ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, 1)`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()

                ctx.restore()
            }
        }

        // Initialize particles
        const particleCount = 100
        particlesRef.current = Array.from(
            { length: particleCount },
            () => new Particle()
        )

        // Animation loop
        const animate = () => {
            // Create trailing effect
            ctx.fillStyle = 'rgba(10, 10, 26, 0.1)'
            ctx.fillRect(0, 0, width, height)

            // Update and draw particles
            particlesRef.current.forEach((particle) => {
                particle.update()
                particle.draw(ctx)
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        // Handle resize
        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [mousePosition])

    return (
        <div className="animated-background">
            {/* Canvas for particles */}
            <canvas ref={canvasRef} className="particle-canvas" />

            {/* Gradient overlays */}
            <motion.div
                className="gradient-orb orb-1"
                animate={{
                    x: mousePosition.x * 30,
                    y: mousePosition.y * 30,
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    x: { type: 'spring', stiffness: 50 },
                    y: { type: 'spring', stiffness: 50 },
                    scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
            />

            <motion.div
                className="gradient-orb orb-2"
                animate={{
                    x: mousePosition.x * -20,
                    y: mousePosition.y * -20,
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    x: { type: 'spring', stiffness: 30 },
                    y: { type: 'spring', stiffness: 30 },
                    scale: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                }}
            />

            <motion.div
                className="gradient-orb orb-3"
                animate={{
                    x: mousePosition.x * 40,
                    y: mousePosition.y * -40,
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    x: { type: 'spring', stiffness: 40 },
                    y: { type: 'spring', stiffness: 40 },
                    scale: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 },
                }}
            />
        </div>
    )
}

export default AnimatedBackground
