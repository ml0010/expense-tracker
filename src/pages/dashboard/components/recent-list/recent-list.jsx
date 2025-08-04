import { RecentListElement } from "./recent-list-element";
import './recent-list.css'

export const RecentList = ({records}) => {

    const numberOfRecords = "5";

    return (
        <div className="recent-list">
            {records.slice(0, numberOfRecords).map((record, index) => <RecentListElement record={record} key={index} /> )}
        </div>
    )
}
