import {DividerComponent} from "@/components/DividerComponent.tsx";
import "@/styles/components/sponsor.scss"
import {SponsorRegistrationForm} from "@/components/FormComponent.tsx";

export const SponsorComponent = () => {

    return (
        <>
            <main>
                <div className="sponsor">
                    <DividerComponent title="Tilmed dig som sponsor"/>

                    <div className="sponsor__section">
                        <p className="sponsor__text">
                            Da det er meget individuelt, hvor meget en virksomhed kan og ønsker at støtte med, har
                            vi opdelt støttemulighederne i 3 kategorier:
                        </p>

                        <div className={"sponsor__section__container"}>
                            <div className="sponsor__category">
                                <h2 className="sponsor__heading">Børnesponsorat</h2>
                                <p className="sponsor__description">
                                    Hvis din virksomhed vælger at blive børnesponsor, dækker I omkostningerne for et
                                    navngivet barns ophold og transport til og fra Langeland.
                                </p>
                                <p className="sponsor__description">
                                    Prisen pr. barn varierer fra lejr til lejr, men vi har fastsat en gennemsnitspris på
                                    kr. 4.000,- pr. barn for et ophold.
                                </p>
                                <p className="sponsor__details">
                                    Denne pris inkluderer transport, forplejning, forsikring, udflugter,
                                    adgangsbilletter til udflugtsmålene, smågaver og slik til ét barn.
                                </p>
                            </div>

                            <div className="sponsor__category">
                                <h2 className="sponsor__heading">Lejrsponsorat</h2>
                                <p className="sponsor__description">
                                    For kr. 2.000,- kan virksomheden blive lejrsponsor og være med til at dække alle
                                    omkostningerne ved børnelejren, som bl.a. omfatter ejendommens drifts- og
                                    vedligeholdelsesomkostninger samt eventuelle ekstra udgifter omkring en lejr, der
                                    f.eks. kan være løn til specialuddannet personale.
                                </p>
                            </div>

                            <div className="sponsor__category">
                                <h2 className="sponsor__heading">Støtte til foreningen</h2>
                                <p className="sponsor__description">
                                    Virksomheder, der ønsker at støtte foreningens arbejde med et mindre beløb, kan
                                    vælge at blive diplomsponsorer.
                                </p>
                                <p className="sponsor__minimum">
                                    Af administrative årsager skal der minimum støttes med kr. 1.000,- for at man kan
                                    modtage et trykt diplom til ophængning i virksomheden, men alle støttebeløb - store
                                    som små - er naturligvis velkomne.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <SponsorRegistrationForm/>
            </main>
        </>
    );
};