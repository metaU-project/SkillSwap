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
}

module.exports = ERROR_CODES;
