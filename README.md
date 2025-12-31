# Happy New Year 2026 - Kanishka

A cinematic, interactive, and visually stunning digital experience created for Kanishka to celebrate New Year 2026.

## 🌟 Features

- **Cinematic Intro**: Animated landing page with particle effects and parallax stars.
- **Countdown to 2026**: Interactive countdown with fireworks trigger.
- **Personal Message**: Touching, animated letter with handwritten typography.
- **Memory Gallery**: 3D tilt-enabled photo gallery (placeholders included).
- **Video Section**: Full-width video tribute area.
- **Interactive Surprises**: Clickable elements with confetti and hidden messages.
- **Grand Finale**: Massive celebratory ending with fireworks.
- **Audio Experience**: Background ambient music with custom controls.

## 🛠️ Tech Stack

- **React**: UI Component library
- **Vite**: Build tool
- **Framer Motion**: Animation library
- **GSAP**: Advanced animations
- **Canvas Confetti**: Particle effects
- **React Tilt**: 3D interaction

## 🚀 How to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Click the link shown in the terminal (usually `http://localhost:3000`)

## 🎨 Customization Guide

### Adding Music
1. Place your audio file in `public/audio/` (create the folder first).
2. Name it `ambient-music.mp3` or update the reference in `src/App.jsx`.

### Adding Photos
1. Open `src/components/MemoryGallery.jsx`.
2. Replace the placeholder gradients in the `memories` array with your actual image paths/URLs.

### Changing Text
- Edit the text content in `src/components/HeroSection.jsx`, `PersonalMessageSection.jsx`, etc.

## 🎆 Enjoy the Celebration!

This project was crafted with attention to detail to provide a premium, "gift-like" experience.
