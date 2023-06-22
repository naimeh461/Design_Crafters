import logo from "../assets/logo/logo-2.png"
import darklogo from "../assets/logo/logo.png"
import { FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-neutral text-neutral-content blue-primary dark:bg-white dark:bg-opacity-60 dark:text-[#1c254b]">
                <div>
                    <img className="w-32 dark:hidden" src={logo} alt="" />
                    <img className="w-32 hidden dark:list-item" src={darklogo} alt="" />
                    <p>Design Crafters Ltd.<br />Tech design fast and fun</p>
                </div>
                <div>
                    <span className="footer-title">Social</span>
                    <div className="grid grid-flow-col gap-4">
                        <a href="https://twitter.com/" className="text-2xl"><FaTwitter></FaTwitter></a>
                        <a href="https://facebook.com/" className="text-2xl"><FaFacebook></FaFacebook></a>
                        <a href="https://youtube.com/" className="text-2xl"><FaYoutube></FaYoutube></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;