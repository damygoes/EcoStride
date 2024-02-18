import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex items-center justify-start w-full h-full text-xs italic font-light text-pretty text-text-color/80">
      &copy; 2024.
      <span className="mx-1 hover:text-accent">
        <Link to="https://www.linkedin.com/in/damilolabada/" target="_blank">
          Damilola Bada
        </Link>
      </span>
    </div>
  );
}

export default Footer;
