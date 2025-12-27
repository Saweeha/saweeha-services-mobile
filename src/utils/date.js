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
