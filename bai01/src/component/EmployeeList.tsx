import React, {useState} from 'react';
import { IEmployee } from './Employee.type';
import "./EmployeeList.style.css"
import EmployeeModal from './EmployeeModal';

type IProps ={
    list: IEmployee[];
    onDeleteClick: (data: IEmployee) => void;
    onEdit: (data: IEmployee) => void
}

const EmployeeList = (props: IProps) => {
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState(null as IEmployee | null);

    const {list, onDeleteClick, onEdit} = props;

    const viewEmployee = (data: IEmployee) => {
        setDataToShow(data);
        setShowModal(true);
    };

    const onCloseModal = () => setShowModal(false);
  return (
    <div>
        <article>
            <h3 className="list-header">Employee List</h3>
        </article>
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            {list.map((item) => (
                <tr>
                    <td>{`${item.firstName} ${item.lastName}`}</td>
                    <td>{item.email}</td>
                    <td>
                        <div>
                        <input
                            type="button"
                            value="View"
                             onClick={() => viewEmployee(item)}
                        />
                           <input
                            type="button"
                            value="Edit"
                            onClick={() => onEdit(item)}
                            />
                          <input
                            type="button"
                            value="Delete"
                            onClick={() => onDeleteClick(item)}
                        />
                        </div>
                    </td>
                </tr>
            ))}
        </table>
        {showModal && dataToShow !== null && (
            <EmployeeModal onClose={onCloseModal} data={dataToShow} />
      )}
    </div>
  )
}

export default EmployeeList