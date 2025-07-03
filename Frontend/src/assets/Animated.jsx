import { motion } from 'framer-motion';

const topPhotoVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0], // slides up 10px and back down, looped
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut'
    }
  }
};

function Animated({ src, alt, className = '' }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`rounded-xl shadow-lg border-4 border-white ${className}`}
      variants={topPhotoVariants}
      initial="initial"
      animate="animate"
      style={{ width: 300, position: 'relative', zIndex: 30 }}
    />
  );
}

export default Animated;
