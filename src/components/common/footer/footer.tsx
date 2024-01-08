import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full text-xs italic font-light text-pretty text-text-color/80">
      &copy; 2024. {t("footer")}
      <span className="mx-1 hover:text-accent">
        <Link to="https://www.linkedin.com/in/damilolabada/" target="_blank">
          Damilola Bada
        </Link>
      </span>
    </div>
  );
}

export default Footer;
