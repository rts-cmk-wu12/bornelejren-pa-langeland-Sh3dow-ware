import * as React from "react";
import { useEffect, useState } from "react";
import "@/styles/components/formRegistration.scss";
import { validatePhoneNumber, validateEmail } from "@/utils/FormValidator.tsx";

interface SponsorFormData {
    supportType: string;
    companyName: string;
    email: string;
    address: string;
    phone: string;
    amount: string;
}

export const SponsorRegistrationForm = () => {
    const [formData, setFormData] = useState<SponsorFormData>({
        supportType: "",
        companyName: "",
        email: "",
        address: "",
        phone: "",
        amount: "",
    });

    const [errors, setErrors] = useState<{ email: boolean; phone: boolean }>({
        email: false,
        phone: false,
    });

    useEffect(() => {
        if (formData.supportType === "børnesponsorat") {
            setFormData((prev) => ({ ...prev, amount: "4000" }));
        } else if (formData.supportType === "lejrsponsorat") {
            setFormData((prev) => ({ ...prev, amount: "2000" }));
        } else if (formData.supportType === "foreningsstøtte") {
            setFormData((prev) => ({ ...prev, amount: "1000" }));
        } else {
            setFormData((prev) => ({ ...prev, amount: "" }));
        }
    }, [formData.supportType]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "email") {
            setErrors((prev) => ({ ...prev, email: !validateEmail(value) }));
        }
        if (name === "phone") {
            setErrors((prev) => ({ ...prev, phone: !validatePhoneNumber(value) }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailValid = validateEmail(formData.email);
        const phoneValid = validatePhoneNumber(formData.phone);

        setErrors({
            email: !emailValid,
            phone: !phoneValid,
        });

        if (!emailValid || !phoneValid) return;

        try {
            const response = await fetch("http://localhost:3000/sendInformation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form data");
            }

            console.log("Sponsor data submitted:", formData);
            alert("Tak for din støtte! Vi kontakter dig snart.");

            setFormData({
                supportType: "",
                companyName: "",
                email: "",
                address: "",
                phone: "",
                amount: "",
            });
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Noget gik galt. Prøv igen senere.");
        }
    };


    return (
        <div className="form">
        <form className="sponsor-form" onSubmit={handleSubmit}>
            <h2 className="sponsor-form__title">Formular til registrering som sponsor</h2>

            <div className="sponsor-form__group">
                <label className="sponsor-form__label">
                    Støttetype:
                    <select
                        className="sponsor-form__input"
                        name="supportType"
                        value={formData.supportType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Vælg type</option>
                        <option value="børnesponsorat">Børnesponsorat</option>
                        <option value="lejrsponsorat">Lejrsponsorat</option>
                        <option value="foreningsstøtte">Støtte til foreningen</option>
                    </select>
                </label>

                {formData.supportType === "børnesponsorat" && (
                    <p className="sponsor-form__description">
                        Dækker ophold og transport for ét barn til Langeland. Gennemsnitspris: kr. 4.000,-
                    </p>
                )}

                {formData.supportType === "lejrsponsorat" && (
                    <p className="sponsor-form__description">
                        For kr. 2.000,- støtter I driften og vedligeholdelsen af børnelejren.
                    </p>
                )}

                {formData.supportType === "foreningsstøtte" && (
                    <p className="sponsor-form__description">
                        Mindstebeløb på kr. 1.000,- for diplom. Alle støttebeløb er velkomne!
                    </p>
                )}
            </div>

            <div className="sponsor-form__group">
                <label className="sponsor-form__label">
                    Firmanavn:
                    <input
                        className="sponsor-form__input"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>

            <div className="sponsor-form__group">
                <label className="sponsor-form__label">
                    Mail:
                    <input
                        className={`sponsor-form__input${errors.email ? " sponsor-form__input--error" : ""}`}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>

            <div className="sponsor-form__group">
                <label className="sponsor-form__label">
                    Adresse:
                    <input
                        className="sponsor-form__input"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>

            <div className="sponsor-form__group">
                <label className="sponsor-form__label">
                    Telefon:
                    <input
                        className={`sponsor-form__input${errors.phone ? " sponsor-form__input--error" : ""}`}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>

            <div className="sponsor-form__group">
                <label className="sponsor-form__label">
                    Beløb:
                    <input
                        className="sponsor-form__input"
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        min={
                            formData.supportType === "børnesponsorat"
                                ? 4000
                                : formData.supportType === "lejrsponsorat"
                                    ? 2000
                                    : formData.supportType === "foreningsstøtte"
                                        ? 1000
                                        : 0
                        }
                        step="1"
                        required
                    />
                </label>
            </div>

            <button type="submit" className="sponsor-form__button">
                Registrer sponsor
            </button>
        </form>
        </div>
    );
};
