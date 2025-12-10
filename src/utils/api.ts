/**
 * API utility for backend communication
 */

// Remove trailing slash from API base URL to avoid double slashes
const getApiBaseUrl = () => {
  const url = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000'
  const cleanUrl = url.replace(/\/+$/, '') // Remove trailing slashes
  
  // Log the API URL in development for debugging (not in production)
  if (import.meta.env.DEV) {
    console.log('API Base URL:', cleanUrl)
  }
  
  return cleanUrl
}

const API_BASE_URL = getApiBaseUrl()

// Helper function to build API URLs without double slashes
const buildApiUrl = (path: string): string => {
  const base = API_BASE_URL.replace(/\/+$/, '') // Remove trailing slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}` // Ensure path starts with /
  return `${base}${cleanPath}`.replace(/([^:]\/)\/+/g, '$1') // Remove double slashes (except after ://)
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user_id: string
  email: string
}

export interface PredictionResponse {
  prediction: string
  confidence: number
  description: string
  recommended: string
  disclaimer: string
}

/**
 * Register a new user
 */
export async function registerUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(buildApiUrl('/auth/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    let errorMessage = 'Registration failed'
    try {
      const error = await response.json()
      errorMessage = error.detail || error.message || JSON.stringify(error)
    } catch {
      errorMessage = `Registration failed: ${response.status} ${response.statusText}`
    }
    throw new Error(errorMessage)
  }

  return response.json()
}

/**
 * Login user
 */
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(buildApiUrl('/auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    let errorMessage = 'Login failed'
    try {
      const error = await response.json()
      errorMessage = error.detail || error.message || JSON.stringify(error)
    } catch {
      errorMessage = `Login failed: ${response.status} ${response.statusText}`
    }
    throw new Error(errorMessage)
  }

  return response.json()
}

/**
 * Predict disease from image
 * Sends image as multipart/form-data using FormData
 * Note: Do NOT set Content-Type header - browser will set it with multipart boundary
 */
export async function predictDisease(imageFile: File): Promise<PredictionResponse> {
  const formData = new FormData()
  formData.append('file', imageFile)

  // Do NOT set Content-Type header - browser will set it with multipart boundary
  const response = await fetch(buildApiUrl('/predict'), {
    method: 'POST',
    body: formData,
    // No headers - let browser set Content-Type with boundary automatically
  })

  if (!response.ok) {
    // Try to get error message from response
    let errorMessage = `API error ${response.status}: ${response.statusText}`
    try {
      const text = await response.text()
      try {
        const error = JSON.parse(text)
        errorMessage = error.detail || error.message || text
      } catch {
        errorMessage = text || errorMessage
      }
    } catch {
      // If we can't read the response, use status
      if (response.status === 0 || response.status === 404) {
        errorMessage = 'Cannot connect to the server. Please check your internet connection.'
      } else {
        errorMessage = `API error ${response.status}: ${response.statusText}`
      }
    }
    throw new Error(errorMessage)
  }

  return response.json()
}

/**
 * Get all diseases
 */
export async function getAllDiseases() {
  const response = await fetch(buildApiUrl('/diseases'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to fetch diseases')
  }

  return response.json()
}

/**
 * Get disease by ID
 */
export async function getDiseaseById(diseaseId: string) {
  const response = await fetch(buildApiUrl(`/diseases/${diseaseId}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to fetch disease')
  }

  return response.json()
}
