import {useEffect, useState} from "react";
import {DividerComponent} from "@/components/DividerComponent.tsx";
import "@/styles/components/thanks_sponsor.scss";
import image0 from "@/assets/pictures/image0.png";
import image4 from "@/assets/pictures/image4.png";

interface SponsorFormData {
    supportType: string;
    companyName: string;
    email: string;
    address: string;
    phone: string;
    amount: string;
}

export const ThanksComponent = () => {
    const [sponsors, setSponsors] = useState<SponsorFormData[]>([]);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const response = await fetch("http://localhost:3000/getInformation");
                if (!response.ok) throw new Error("Could not fetch sponsors");

                const data = await response.json();
                setSponsors(data);
            } catch (err) {
                console.error("Failed to load sponsor data:", err);
            }
        };

        fetchSponsors();
    }, []);

    return (
        <main>
            <section className="thanks__section">
                <div className="thanks__container">
                    <h2 className="thanks__section--title">Lejren Takker</h2>
                    <p className="thanks__section--description">
                        Børnelejren på Langeland takker alle, der på den ene eller anden måde, har støttet
                        foreningens arbejde med at sende dårligt stillede børn på et ophold på Søgård Hovedgård
                        – det være sig ved naturaliesponsorater eller økonomisk støtte fra støttemedlemmer,
                        virksomhedssponsorer og donationer fra fonde.
                    </p>
                </div>
            </section>

            <div className="pictures">
                <div className="pictures__section">
                    <img className="pictures__section--image" src={image0} alt="lejren"/>
                </div>
                <div className="pictures__section">
                    <img className="pictures__section--image" src={image4} alt="lejren"/>
                </div>
            </div>

            <div className="thanks__sponsor">
                <DividerComponent title="En særlig tak til:"/>

                <ul className="thanks__sponsor-list">
                    {sponsors.map((sponsor, index) => (
                        <li key={index} className="thanks__sponsor-list-item">
                            <p><span className={"bold"}>Firma Navn:</span> {sponsor.companyName}</p>
                            <p><span className={"bold"}>Støtte Type:</span> {sponsor.supportType}</p>
                            <p><span className={"bold"}>Betalt:</span> {sponsor.amount} Kr.</p>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};
