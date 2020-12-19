export const calculateDelay = (expiresAt: number) =>
    new Date(expiresAt).getTime() - new Date().getTime();
