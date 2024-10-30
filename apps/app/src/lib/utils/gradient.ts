export function generateGradient(username: string) {
  // Convert string to a consistent 6-character hex color
  function stringToHexColor(str: string): string {
    const hash = str.split("").reduce((acc, char) => {
      const value = char.charCodeAt(0);
      return (acc << 5) - acc + value;
    }, 0);

    // Ensure positive number and take last 6 digits
    const hex = Math.abs(hash).toString(16).slice(-6).padStart(6, "0");
    return `#${hex}`;
  }

  // Generate two colors - one from username and one from username + 'alt'
  const from = stringToHexColor(username);
  const to = stringToHexColor(`${username}alt`);

  return `linear-gradient(135deg, ${from}, ${to})`;
}
