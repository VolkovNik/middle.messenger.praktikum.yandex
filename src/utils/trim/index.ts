export const trim = (inputString: string, stringToDelete?: string) => {
  if (stringToDelete) {
    const regex = new RegExp(`[${stringToDelete}]`, 'gi');
    return (inputString.replace(regex, ''));
  }

  return inputString.trim();
};
