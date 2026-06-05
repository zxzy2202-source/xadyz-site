/**
 * Generate a UUID v4. Uses crypto.randomUUID when available,
 * otherwise falls back to a compatible implementation for older browsers/Node.
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback: UUID v4 using crypto.getRandomValues or Math.random
  const getRandomValues =
    typeof crypto !== 'undefined' && crypto.getRandomValues
      ? crypto.getRandomValues.bind(crypto)
      : (arr: Uint8Array) => {
          for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
          return arr;
        };
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = getRandomValues(new Uint8Array(1))[0] & 15;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
