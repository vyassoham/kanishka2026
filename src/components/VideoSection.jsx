import { motion } from 'framer-motion'
import './VideoSection.css'

const VideoSection = () => {
    return (
        <section className="section video-section">
            <div className="container video-grid-container">
                <motion.div
                    className="video-header text-center"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-gradient">A Cinematic Tribute</h2>
                    <p className="subtitle">Moments captured in time, just for you.</p>
                </motion.div>

                <div className="video-grid">
                    <motion.div
                        className="video-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <video
                            controls
                            className="memory-video"
                            src="/videos/video1.mp4"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>

                    <motion.div
                        className="video-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <video
                            controls
                            className="memory-video"
                            src="/videos/video2.mp4"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default VideoSection
