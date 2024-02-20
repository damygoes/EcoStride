import { buttonVariants } from "@components/ui/button/button-variants";
import { cn } from "@lib/utils";
import { ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";

type LocaleSwitchProps = {
  className?: string;
};

function LocaleSwitch({ className }: LocaleSwitchProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    } else {
      i18n.changeLanguage("en");
    }
  }, [i18n]);

  const switchLanguage = async (event: ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    try {
      await i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    } catch (error) {
      console.error("Error changing language", error);
    }
  };

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
      className={cn(
        buttonVariants({ variant: "gradient", size: "sm", className }),
      )}
    >
      {languageOptions}
    </select>
  );
}

export default LocaleSwitch;
