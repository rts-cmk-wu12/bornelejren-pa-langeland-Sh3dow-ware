import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import "@styles/components/navigation.scss";
import headerLogo from "@/assets/logo/logo.png";

export const NavigationComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleMenu = () => {
        if (isOpen) {
            setIsAnimating(true);
            setIsOpen(false);
            setTimeout(() => {
                setIsAnimating(false);
            }, 400);
        } else {
            setIsOpen(true);
        }
    };

    const navClassName = `nav ${isOpen ? "nav--open" : ""} ${isAnimating ? "nav--closing" : ""}`;

    return (
        <header>
            <nav className="menu">
                <div className="menu__top">
                    <img alt="header-logo" src={headerLogo} />
                    <button
                        className="menu__toggle"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <ul className={navClassName}>
                    <li className="nav__item">
                        <Link className="nav__item--link" to="/">Forside</Link>
                    </li>
                    <li className="nav__item">
                        <Link className="nav__item--link" to="/about-us">Om Os</Link>
                    </li>
                    <li className="nav__item">
                        <Link className="nav__item--link" to="/sponsor">Abonner som Sponsor</Link>
                    </li>
                    <li className="nav__item">
                        <Link className="nav__item--link" to="/thanks">Tak</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
