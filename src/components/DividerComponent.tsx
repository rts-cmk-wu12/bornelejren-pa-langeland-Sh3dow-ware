import type {JSX} from "react";
import "@/styles/components/divider.scss"
interface DividerProps {
    title: string;
}

export const DividerComponent = ({title}: DividerProps): JSX.Element => {
    return (
        <div className="divider">
            <h2 className="divider-title">{title}</h2>
        </div>
    )
}