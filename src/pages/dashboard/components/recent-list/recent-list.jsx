import { RecentListElement } from "./recent-list-element";
import './recent-list.css'

export const RecentList = ({records}) => {

    const numberOfRecords = "5";

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {records.slice(0, numberOfRecords).map((record, index) => <RecentListElement record={record} key={index} /> )}
            </tbody>
        </table>
    )
}
