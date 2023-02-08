import React, {useState} from 'react'
import { IEmployee } from './Employee.type';

const AddEmployee = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

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
        const data: IEmployee  = {
            id: new Date().toJSON().toString(),
            firstName: firstName,
            lastName: lastName,
            email: email
        }
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
                {/* Back button */}
                <input type="submit" value="Add Employee"/>
            </div>
        </form>
    </div>
  )
}

export default AddEmployee