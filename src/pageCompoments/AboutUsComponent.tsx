import swimmingPool from "@/assets/pictures/image1.png";
import "@/styles/components/aboutus.scss"
export const AboutUsComponent = () => {
    return (
        <section className="about-us">
            <div className="about-us__content">
                <h2 className="about-us__title">Om Os</h2>
                <p className="about-us__text">
                    Børnelejren på Langeland er en velgørende, non-profit forening, som afholder finansierede lejre for dårligt stillede børn og unge fra hele landet.
                </p>
                <p className="about-us__text">
                    Børnelejrene bliver afholdt på foreningens bondegård, Søgård Hovedgård, som ligger i naturskønne omgivelser på sydspidsen af Langeland.
                </p>
                <p className="about-us__text">
                    Samtlige omkostninger til alle børns ophold og transport til/fra lejren bliver finansieret af foreningen, og det er et krav fra foreningens side, at der ikke opkræves brugerbetaling af børnenes forældre for opholdet på Søgård.
                </p>
                <p className="about-us__text">
                    Foreningens bestyrelse og frivillige hjælpere arbejder ulønnet for Foreningen. Medarbejderne fra institutionerne på foreningens lejre, får ikke kolonitillæg udbetalt af Foreningen.
                </p>
                <p className="about-us__text">
                    Det er primært virksomheder og støttemedlemmer, der finansierer foreningens drift og aktiviteter. Vi har heldigvis erfaret, at rigtig mange virksomheder er villige til at bakke op omkring lejren, ligesom vi håber på endnu flere private, passive støttemedlemmer.
                </p>
                <p className="about-us__text">
                    Alle skriftlige henvendelser vedrørende Foreningen Børnelejren på Langeland og Søgård Hovedgård bedes venligst sendt til Knud Bro Alle 1, st. mf., 3660 Stenløse. Telefoniske henvendelser bedes ligeledes rettet til sekretariatet på telefon 38711260. Foreningens formand er dagligt at træffe i sekretariatet.
                </p>
            </div>
            <div className="about-us__image-container">
                <img src={swimmingPool} alt="Udsigt over swimmingpoolen" className="about-us__image" />
            </div>
        </section>
    );
};
