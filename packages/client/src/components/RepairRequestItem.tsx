import classNames from 'classnames';
import dayjs from 'dayjs';
import { RepairRequestsQueryRepairRequest } from './RepairRequestList';

interface Props {
    repairRequest: RepairRequestsQueryRepairRequest
    index: number
}

const RepairRequestItem = ({ index, repairRequest }: Props) => {
    const { id, endo, note, officer, createdAt } = repairRequest || {}

    return (<div className="grid grid-cols-12 " key={index}>
        <div
            className={classNames(
                "col-span-3 p-2",
                index % 2 === 0 && "bg-primary-50"
            )}
        >
            {dayjs(createdAt).format("DD/MM/YYYY")}
        </div>
        <div
            className={classNames(
                "col-span-3 p-2",
                index % 2 === 0 && "bg-primary-50"
            )}
        >
            {officer.officerNum}
        </div>
        <div
            className={classNames(
                "col-span-3 p-2",
                index % 2 === 0 && "bg-primary-50"
            )}
        >
            {`${officer.firstName} ${officer.lastName}`}
        </div>

        <div
            className={classNames(
                "col-span-3 p-2 flex gap-2",
                index % 2 === 0 && "bg-primary-50"
            )}
        >
            {note}

        </div>
    </div>);
}
export default RepairRequestItem