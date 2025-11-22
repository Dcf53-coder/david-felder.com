/**
 * Simple pluralization helper for English words.
 * Handles common musical instrument plural patterns.
 */
export function pluralize(word: string, count: number): string {
  if (count <= 1) return word;

  const lowerWord = word.toLowerCase();

  // Handle common musical instrument plurals
  if (lowerWord.endsWith("o")) return word + "s"; // piccolo -> piccolos
  if (lowerWord.endsWith("ss")) return word + "es"; // bass -> basses
  if (lowerWord.endsWith("s")) return word; // already plural or ends in s
  if (lowerWord.endsWith("y") && !/[aeiou]y$/i.test(lowerWord)) {
    return word.slice(0, -1) + "ies";
  }

  return word + "s";
}
