import { Facebook, SmartphoneNfc } from "lucide-react";
import { FacebookLink, MobilePayLink } from "@/utils/links.tsx";
import "@/styles/components/footer.scss"
export const FooterComponent = () => {
    return (
        <footer className={"footer"}>
            <ul className={"footer__list"}>
                <li className={"footer__list__item"}>
                    <Facebook />
                    <a className={"footer__list__item__link"} target={"_blank"} href={FacebookLink}>
                        Facebook
                    </a>
                </li>
                <li className={"footer__list__item"}>
                    <SmartphoneNfc />
                    <a href={MobilePayLink} target={"_blank"} className={"footer__list__item__link"}>
                        MobilePay: 27231
                    </a>
                </li>
            </ul>
            <address className="footer__contact">
                <h3>Adresse & Kontakt</h3>
                <p>
                    Knud Bro Alle 1, st. mf.<br />
                    3660 Stenløse
                </p>
                <ul className="footer__contact__list">
                    <li>
                        Telefon: <span className="footer__contact__highlight">38711260</span>
                    </li>
                    <li>
                        E-mail: <a className="footer__contact__highlight" href="mailto:info@lejren.dk">info@lejren.dk</a>
                    </li>
                </ul>
            </address>

            <section className="footer__location">
                <h3>Lejren</h3>
                <address>
                    Søgård Hovedgård<br />
                    Søgårdsvej 8A<br />
                    5935 Bagenkop
                </address>
            </section>
        </footer>
    );
};
