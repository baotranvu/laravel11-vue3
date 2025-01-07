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
    // eslint-disable-next-line
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};