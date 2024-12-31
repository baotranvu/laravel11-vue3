export const useAuthHelper = () => {
    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop();
            return cookieValue ? cookieValue.split(';').shift() ?? null : null;
        }
    };
    return {
        getCookie
    }
}