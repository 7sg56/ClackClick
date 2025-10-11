export const formatPercentage = (percentage: number) => {
  return `${percentage.toFixed(2)}%`;
};

export const countErrors = (actual: string, expected: string) => {
  const expectedCharacters = expected.split("");
  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = Math.max(0, total - errors);
    return (corrects / total) * 100;
  }
  return 0;
};

export const calculateWPM = (typedText: string, timeInSeconds: number) => {
  if (timeInSeconds === 0) return 0;
  
  // Count actual words by splitting on whitespace
  const wordsTyped = typedText.trim().split(/\s+/).filter(word => word.length > 0).length;
  const timeInMinutes = timeInSeconds / 60;
  
  return Math.round(wordsTyped / timeInMinutes);
};

export const countWords = (text: string) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

