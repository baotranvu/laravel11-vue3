/**
+ * Escapes special characters in task names to prevent XSS attacks
+ * @param str The raw task name input
+ * @returns The sanitized task name with HTML entities
+ */

export const escapeSpecialCharacters = (str: string): string => {
    const HTML_ENTITIES: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
    };

    return str.replace(/[&<>'"]/g, (match) => HTML_ENTITIES[match] || match);
};
/**
+ * Checks if the email is valid
+ * @param email The email to check
+ * @returns True if the email is valid, false otherwise
+ */
export const validateEmail = (email: string): boolean => {
    // eslint-disable-next-line no-control-regex  
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;  
    return email.length <= 254 && emailRegex.test(email);  
};

/**
 * Checks if the password is valid
 * @param password The password to check
 * @returns True if the password is valid, false otherwise
 */
const PASSWORD_REQUIREMENTS = {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL: true
};

interface PasswordValidationResult {
    isValid: boolean;
    errors: string[];
}

export const validatePassword = (password: string): PasswordValidationResult => {
    const errors: string[] = [];
    
    if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
        errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters long`);
    }
    if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBERS && !/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL && !/[@$!%*?&]/.test(password)) {
        errors.push('Password must contain at least one special character (@$!%*?&)');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};