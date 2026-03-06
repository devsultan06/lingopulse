/**
 * Simple translation service using MyMemory API (Free, No Key Required for basic usage)
 * documentation: https://mymemory.translated.net/doc/spec.php
 */

export const translateText = async (
  text: string,
  targetLang: string,
  sourceLang: string = "auto",
) => {
  if (!text.trim()) return "";

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }

    console.warn("Translation failed or returned empty:", data);
    return text; // Fallback to original text
  } catch (error) {
    console.error("Translation service error:", error);
    return text; // Fallback to original text
  }
};
