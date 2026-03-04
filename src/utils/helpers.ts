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

export const countWords = (text: string) => {
  let count = 0;
  let inWord = false;

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    // Fast check for common whitespace: space (32), tab (9), newline (10), carriage return (13)
    if (
      charCode === 32 ||
      charCode === 9 ||
      charCode === 10 ||
      charCode === 13 ||
      (charCode >= 11 && charCode <= 12) || // vertical tab (11), form feed (12)
      charCode === 160 || // non-breaking space
      (charCode >= 0x2000 && charCode <= 0x200b) || // various unicode spaces
      charCode === 0x3000 // ideographic space
    ) {
      if (inWord) {
        count++;
        inWord = false;
      }
    } else {
      inWord = true;
    }
  }

  if (inWord) {
    count++;
  }

  return count;
};

export const calculateWPM = (typedText: string, timeInSeconds: number) => {
  if (timeInSeconds === 0) return 0;
  
  const wordsTyped = countWords(typedText);
  const timeInMinutes = timeInSeconds / 60;
  
  return Math.round(wordsTyped / timeInMinutes);
};
