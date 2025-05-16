import "@/styles/components/home-component.scss";
import outsideImage from "@/assets/pictures/image6.png";
import {DividerComponent} from "@/components/DividerComponent.tsx";

export const HomeComponent = () => {
    return (
        <main className="home">
            <section className="home__welcome">
                <h2 className="home__title">Velkommen til Børnelejren</h2>
                <a className="home__button" href="#intro">Se mere</a>
            </section>

            <DividerComponent title={"Hvem er vi?"}></DividerComponent>

            <section className="home__intro" id="intro">
                <h3 className="home__intro-title">Vi er Børnelejren på Langeland</h3>

                <p className="home__text">
                    Børnelejren på Langeland er en forening med et klart formål: at give dårligt stillede børn og unge
                    mulighed for et ophold i trygge, landlige omgivelser på det naturskønne Sydlangeland.
                </p>

                <p className="home__text">
                    Mange børn i Danmark vokser op under svære forhold. Det gælder børn med medfødte handicap, kroniske
                    sygdomme, omsorgssvigt eller traumatiske oplevelser. Nogle er fjernet fra deres familier, andre
                    lever i fattigdom.
                </p>

                <img className="home__image" src={outsideImage} alt="Børnelejren udefra"/>

                <p className="home__text">
                    Vi kender alle et barn, der kunne bruge et pusterum. Derfor samler vi midler fra erhvervsliv, fonde
                    og private for at give dem et velfortjent ophold på Søgård.
                </p>

                <p className="home__text home__text--emphasis">
                    Hjælp os med at hjælpe dem!
                </p>
            </section>

            <DividerComponent title={"Kontakt os"}></DividerComponent>
        </main>
    );
};
