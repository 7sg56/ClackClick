import { countWords } from './src/utils/helpers.ts';

const originalCountWords = (text: string) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

const extraWhitespace = "word1\u00a0word2\fword3\vword4";
console.log("Testing with extra whitespace characters...");
console.log("Original:", originalCountWords(extraWhitespace));
console.log("Optimized:", countWords(extraWhitespace));

if (originalCountWords(extraWhitespace) !== countWords(extraWhitespace)) {
  console.log("Mismatch found for non-standard whitespace.");
} else {
  console.log("Match found for non-standard whitespace.");
}
