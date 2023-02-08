import React, {useState} from 'react';
import { IEmployee } from './Employee.type';
import "./EmployeeList.style.css"

type IProps ={
    list: IEmployee[]
}

const EmployeeList = (props: IProps) => {
    const {list} = props;
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
                <tr key={item.id}>
                    <td>{`${item.firstName} ${item.lastName}`}</td>
                    <td>{item.email}</td>
                    <td>
                        Actions
                    </td>
                </tr>
            ))}
        </table>
    </div>
  )
}

export default EmployeeList