/**
 * Utility functions to clean text from markdown and formatting artifacts
 */

/**
 * Removes all markdown formatting, asterisks, and cleans up text
 */
export function cleanText(text: string): string {
  if (!text) return ''
  
  // Remove all asterisks (bold, italic, etc.)
  let cleaned = text.replace(/\*\*/g, '').replace(/\*/g, '')
  
  // Remove markdown links [text](url) -> text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
  
  // Remove markdown headers
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '')
  
  // Remove inline code
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1')
  
  // Clean up multiple spaces
  cleaned = cleaned.replace(/ {2,}/g, ' ')
  
  // Clean up multiple newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n')
  
  // Trim each line
  const lines = cleaned.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  
  return lines.join('\n')
}

/**
 * Removes asterisks from a string (simple version)
 */
export function removeAsterisks(text: string): string {
  if (!text) return ''
  return text.replace(/\*\*/g, '').replace(/\*/g, '')
}

