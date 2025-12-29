/**
 * Formats a date string into YYYY-MM-DD format
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';

    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) return String(date); // Fallback to original if invalid

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error formatting date:', error);
        return String(date);
    }
};

/**
 * Formats a date string into a relative format (e.g., Today, Yesterday, 2 days ago)
 * @param {string|Date} dateString - The date to format
 * @returns {string} Formatted relative date string
 */
export const formatRelativeDate = (dateString) => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
        return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
    } catch (error) {
        console.error('Error formatting relative date:', error);
        return '';
    }
};
