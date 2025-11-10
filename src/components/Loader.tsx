import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className="relative h-16 w-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-primary-200 border-t-primary-600"></div>
      </motion.div>
      <motion.p
        className="mt-4 text-lg font-medium text-muted-foreground"
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
    </div>
  )
}

