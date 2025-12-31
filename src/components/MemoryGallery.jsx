import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tilt } from 'react-tilt'
import './MemoryGallery.css'

// Placeholder images - using gradients or solid colors if real images aren't available
// In a real app, you would imports these or use URLs
const memories = [
    { id: 1, title: 'Cute Doggo Vibe', image: '/images/kanishka1.png' },
    { id: 2, title: 'Laughter & Fun', image: '/images/kanishka2.png' },
    { id: 3, title: 'Dreams 2026', color: 'linear-gradient(45deg, #ffd700, #ffaa00)' },
    { id: 4, title: 'Success Ahead', color: 'linear-gradient(45deg, #b026ff, #6600cc)' },
]

const MemoryGallery = () => {
    const [selectedId, setSelectedId] = useState(null)

    return (
        <section className="section gallery-section">
            <div className="container">
                <motion.h2
                    className="section-title text-center mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Cherished Memories
                </motion.h2>

                <div className="gallery-grid">
                    {memories.map((item) => (
                        <Tilt key={item.id} options={{ max: 15, scale: 1.05 }}>
                            <motion.div
                                className="memory-card"
                                layoutId={`card-${item.id}`}
                                onClick={() => setSelectedId(item.id)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div
                                    className="memory-image-placeholder"
                                    style={{
                                        background: item.image ? 'none' : item.color,
                                        backgroundImage: item.image ? `url(${item.image})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    {!item.image && <span className="memory-icon">✨</span>}
                                </div>
                                <div className="memory-info">
                                    <h3>{item.title}</h3>
                                    <p>Click to view</p>
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedId && (
                        <motion.div
                            className="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                        >
                            <motion.div
                                className="modal-content"
                                layoutId={`card-${selectedId}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <motion.button
                                    className="close-btn"
                                    onClick={() => setSelectedId(null)}
                                >
                                    ×
                                </motion.button>

                                <div
                                    className="modal-image"
                                    style={{
                                        background: memories.find(m => m.id === selectedId)?.image ? 'none' : memories.find(m => m.id === selectedId)?.color,
                                        backgroundImage: memories.find(m => m.id === selectedId)?.image ? `url(${memories.find(m => m.id === selectedId)?.image})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>

                                <div className="modal-details">
                                    <h2>{memories.find(m => m.id === selectedId)?.title}</h2>
                                    <p>
                                        A beautiful memory from the journey so far. May 2026 bring even
                                        more moments like this to cherish forever.
                                    </p>
                                    <button className="btn btn-primary" onClick={() => setSelectedId(null)}>
                                        Close Memory
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default MemoryGallery
