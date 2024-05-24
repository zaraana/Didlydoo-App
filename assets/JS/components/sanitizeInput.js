export const sanitizeInput = (string) => {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
