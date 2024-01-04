import { ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./theme-toggle/theme-toggle";

const TestComponent = () => {
  const { t, i18n } = useTranslation();

  // Set default language to English on mount
  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  const switchLanguage = async (event: ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    try {
      await i18n.changeLanguage(lang);
    } catch (error) {
      console.log("The lang is possibly invalid ", error);
    }
  };

  // Dynamically create options based on available languages in the resources
  const languageOptions = Object.keys(i18n.options.resources || {}).map(
    (lang) => (
      <option key={lang} value={lang}>
        {lang.toUpperCase()}
      </option>
    ),
  );

  return (
    <div className="w-screen h-screen bg-background">
      <select value={i18n.language} onChange={switchLanguage}>
        {languageOptions}
      </select>
      <ThemeToggle />

      <h2>Minimal React TS App with React-i18next Lazyloading</h2>
      <p className="text-4xl text-text-color">{t("welcome")}</p>
    </div>
  );
};

export default TestComponent;
