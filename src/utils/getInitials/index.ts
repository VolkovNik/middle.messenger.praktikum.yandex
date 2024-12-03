export const getInitials = (input: string): string => {
  const words = input.trim().split(/\s+/);

  const firstWord = words[0] || '';
  const secondWord = words[1] || '';

  const firstInitial = firstWord.slice(0, 1).toUpperCase();
  const secondInitial = secondWord.slice(0, 1).toUpperCase();

  return secondWord ? firstInitial + secondInitial : firstInitial;
};
