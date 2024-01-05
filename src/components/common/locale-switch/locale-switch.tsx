import { buttonVariants } from "@components/ui/button/button-variants";
import { cn } from "@lib/utils";
import { ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";

function LocaleSwitch() {
  const { i18n } = useTranslation();

  // Set default language to English on mount
  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  const switchLanguage = async (event: ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    try {
      await i18n.changeLanguage(lang);
    } catch (error) {
      console.error("The language is possibly invalid ", error);
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
    <select
      value={i18n.language}
      onChange={switchLanguage}
      className={cn(buttonVariants({ variant: "gradient", size: "sm" }))}
    >
      {languageOptions}
    </select>
  );
}

export default LocaleSwitch;
