"use client";
import { useEffect } from "react";

const STORAGE_KEY = "preferred_language";

declare global {
  interface Window {
    google: any;
    googleTranslateInit: () => void;
  }
}

export default function GoogleTranslateLoader() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "es,en",
          multilanguagePage: true,
          autoDisplay: false,
        },
        "google_translate_element",
      );

      // Apply saved language preference after widget initializes
      const savedLang = localStorage.getItem(STORAGE_KEY);
      const targetLang = savedLang === "en" ? "en" : "es";

      const interval = setInterval(() => {
        const select = document.querySelector(
          ".goog-te-combo",
        ) as HTMLSelectElement;
        if (select) {
          select.value = targetLang;
          select.dispatchEvent(new Event("change"));
          clearInterval(interval);
        }
      }, 500);
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateInit";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
}
