import React, {useState} from 'react';
import { IEmployee } from './Employee.type';
import "./EmployeeForm.style.css";

type IProps = {
    data: IEmployee;
    onBackClick: () => void;
    onUpdateClick: (data: IEmployee) => void;
}

const EditEmployee = (props: IProps) => {
    const {data, onBackClick, onUpdateClick} = props;
    const [firstName, setFirstName] = useState(data.firstName);
    const [lastName, setLastName] = useState(data.lastName);
    const [email, setEmail] = useState(data.email);

    const onChangeFirstName = (e: any) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e: any) => {
        setLastName(e.target.value);
    }

    const onChangeEmail = (e: any)=>{
        setEmail(e.target.value);
    };

    const onChangeSubmit = (e: any) => {
        e.preventDefault();
        const updatedData: IEmployee  = {
            id: data.id,
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        onUpdateClick(updatedData);
        onBackClick();
    }
  return (
    <div className='form-container'>
        <div>
            <h3>Add Employee Form</h3>
        </div>
        <form onSubmit={onChangeSubmit}>
        <div>
                <label>First Name: </label>
                <input 
                   type="text"
                   value={firstName}
                   onChange={onChangeFirstName}
                />
            </div>
            <div>
                <label>Last Name: </label>
                <input 
                   type="text"
                   value={lastName}
                   onChange={onChangeLastName}
                />
            </div>
            <div>
                <label>Email: </label>
                <input 
                   type="text"
                   value={email}
                   onChange={onChangeEmail}
                />
            </div>
            <div>
                <input type="button" value="Back" onClick={onBackClick} />
                <input type="submit" value="Edit Employee"/>
            </div>
        </form>
    </div>
  )
}

export default EditEmployee