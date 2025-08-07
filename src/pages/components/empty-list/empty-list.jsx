import { SmileyXEyesIcon } from "@phosphor-icons/react"
import "./empty-list.css";

export const EmptyList = () => {
    return (
        <div className="empty-list">
            <SmileyXEyesIcon size={40} />
            <p>No Result</p>
        </div>
    )
}
