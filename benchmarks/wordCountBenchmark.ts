import { countWords } from '../src/utils/helpers.ts';

const originalCountWords = (text: string) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

const testData = "word ".repeat(1000000); // 1 million words

function benchmark(fn: (text: string) => number, name: string) {
  const start = performance.now();
  const result = fn(testData);
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(2)}ms, Result: ${result}`);
  return end - start;
}

console.log("Starting benchmark...");
const originalTimes = [];
const optimizedTimes = [];

for (let i = 0; i < 5; i++) {
  originalTimes.push(benchmark(originalCountWords, "Original"));
  optimizedTimes.push(benchmark(countWords, "Optimized"));
}

const avgOriginal = originalTimes.reduce((a, b) => a + b, 0) / originalTimes.length;
const avgOptimized = optimizedTimes.reduce((a, b) => a + b, 0) / optimizedTimes.length;

console.log(`\nAverage Original: ${avgOriginal.toFixed(2)}ms`);
console.log(`Average Optimized: ${avgOptimized.toFixed(2)}ms`);
console.log(`Improvement: ${((avgOriginal - avgOptimized) / avgOriginal * 100).toFixed(2)}%`);

// Verification
const sampleTexts = [
  "   Hello   world  this is  a test   ",
  "word",
  "",
  "   ",
  "\n\t  word1 \n word2 \r\t word3   ",
  "   a   b   c   ",
  "word1\u00a0word2\fword3\vword4"
];

console.log("\nRunning verification tests...");
for (const sampleText of sampleTexts) {
  const original = originalCountWords(sampleText);
  const optimized = countWords(sampleText);
  if (original !== optimized) {
    console.error(`ERROR: Implementations do not match for: "${sampleText}"`);
    console.error("Original:", original);
    console.error("Optimized:", optimized);
    process.exit(1);
  } else {
    console.log(`Verification passed for: "${sampleText}" (Result: ${original})`);
  }
}
