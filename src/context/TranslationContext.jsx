import React, { createContext, useState, useEffect } from "react";

const TranslationContext = createContext();

const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({
    en: { english: "ENGLISH", french: "FRANCE" },
    fr: { english: "ANGLAIS", french: "FRANCE" },
  });

  const translateText = async (text, targetLanguage) => {
    const apiKey = "AIzaSyBluxXUIGe3mEi5U_c3VejVscZ3vZbSPMk";
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, target: targetLanguage, format: "text" }),
      });
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // ফেল করলে মূল টেক্সট ফেরত দেওয়া
    }
  };

  const toggleLanguage = async () => {
    const newLanguage = language === "en" ? "fr" : "en";
    setLanguage(newLanguage);

    // সমস্ত টেক্সট ট্রান্সলেট করার জন্য (উদাহরণ হিসেবে)
    const updatedTranslations = { ...translations };
    updatedTranslations[newLanguage] = {
      english: await translateText("ENGLISH", newLanguage),
      french: await translateText("FRANCE", newLanguage),
    };
    setTranslations(updatedTranslations);
  };

  return (
    <TranslationContext.Provider value={{ language, toggleLanguage, t: (key) => translations[language][key] }}>
      {children}
    </TranslationContext.Provider>
  );
};

export { TranslationContext, TranslationProvider };