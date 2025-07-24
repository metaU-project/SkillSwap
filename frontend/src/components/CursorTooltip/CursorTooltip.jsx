import './CursorTooltip.css';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTooltip = ({ isVisible, content, position, className }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`cursor-tooltip ${className || ''}`}
          style={{
            left: position.x + 15,
            top: position.y - 10,
          }}
        >
          <div className="tooltip-content">{content}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CursorTooltip;
