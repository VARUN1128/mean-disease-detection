import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <motion.div
          className="relative h-20 w-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary-200/50"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-r-primary-500"></div>
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-8 w-8 rounded-full bg-primary-600/20"></div>
        </motion.div>
      </div>
      <motion.p
        className="mt-6 text-lg font-semibold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Processing...
      </motion.p>
      <motion.p
        className="mt-2 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Analyzing your image with AI
      </motion.p>
      <motion.div
        className="mt-4 w-48 h-1 bg-muted rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}

