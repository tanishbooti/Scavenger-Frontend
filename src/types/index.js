// User shape
/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {number} age
 * @property {string} occupation
 * @property {string} phoneNumber
 * @property {ScamDetection[]} scamDetectionHistory
 * @property {string} createdAt
 * @property {string} updatedAt
 */

// ScamDetection shape
/**
 * @typedef {Object} ScamDetection
 * @property {string} _id
 * @property {string} content
 * @property {'scam' | 'safe' | 'suspicious'} result
 * @property {string} explanation
 * @property {'text' | 'image' | 'url' | 'phone'} sourceType
 * @property {string} date
 */

// ScamUpdate shape
/**
 * @typedef {Object} ScamUpdate
 * @property {string} _id
 * @property {string} title
 * @property {string} description
 * @property {'warning' | 'alert' | 'info'} type
 * @property {string} date
 */

// WatchlistEntry shape
/**
 * @typedef {Object} WatchlistEntry
 * @property {string} _id
 * @property {string} user
 * @property {string} value
 * @property {'phone' | 'email' | 'url'} type
 * @property {string} dateAdded
 */

// Analytics shape
/**
 * @typedef {Object} Analytics
 * @property {number} totalScams
 * @property {{ text: number, image: number, url: number, phone: number }} typeCount
 * @property {number} safetyScore
 */

// AuthState shape
/**
 * @typedef {Object} AuthState
 * @property {User | null} user
 * @property {string | null} accessToken
 * @property {string | null} refreshToken
 * @property {boolean} isAuthenticated
 * @property {boolean} loading
 * @property {string | null} error
 */

// ApiResponse shape
/**
 * @typedef {Object} ApiResponse
 * @property {any} [data]
 * @property {string} [message]
 * @property {string} [error]
 */

// LoginCredentials shape
/**
 * @typedef {Object} LoginCredentials
 * @property {string} [phoneNumber]
 * @property {string} [email]
 * @property {string} password
 */

// RegisterData shape
/**
 * @typedef {Object} RegisterData
 * @property {string} name
 * @property {string} email
 * @property {number} age
 * @property {string} password
 * @property {string} occupation
 * @property {string} phoneNumber
 */

// ScamCheckResult shape
/**
 * @typedef {Object} ScamCheckResult
 * @property {'scam' | 'safe' | 'suspicious'} result
 * @property {string} explanation
 * @property {string} [extractedText]
 */

// ThemeState shape
/**
 * @typedef {Object} ThemeState
 * @property {boolean} isDark
 */
