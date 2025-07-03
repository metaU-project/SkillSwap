// error enums
const ERROR_CODES = {
    INVALID_EMAIL: 'Invalid email format',
    USER_EXISTS: 'User already exists',
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
    INVALID_PASSWORD: 'Invalid password',
    MISSING_FIELDS: 'Missing fields',
    REGISTRATION_FAILED: 'Registration failed. Please try again.',
    TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
    INVALID_CREDENTIALS: 'Invalid credentials',
    LOGIN_FAILED: 'Log in failed. Please try again.',
    LOGOUT_FAILED: 'Log out failed. Please try again.',
    NOT_AUTHORIZED : 'Not authorized',
    INTEREST_ERROR: "Interests must be an array" ,
    POSTS_ERROR: "failed to get posts",
    REVIEWS_ERROR : "failed to get reviews",
    MISSING_POST: "Post not found",
    MISSING_USER: "User not found",
    CREATE_REVIEW_ERROR: "failed to create review",
}

module.exports = ERROR_CODES;
