import { FaLinkedin, FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center mt-auto">
      <p className="mb-4 text-sm">
        © {new Date().getFullYear()} Expense Tracker. All rights reserved.
      </p>

      <div className="flex justify-center space-x-6 text-2xl">
        <a
          href="https://www.linkedin.com/in/tushar-solra-4837bb23a"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://www.facebook.com/share/16au7CNXvd/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition"
        >
          <FaFacebook />
        </a>

        <a
          href="https://www.instagram.com/tusharsolra"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          <FaInstagram />
        </a>

        <a
          href="https://x.com/tusharsolra"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition"
        >
          <FaXTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
