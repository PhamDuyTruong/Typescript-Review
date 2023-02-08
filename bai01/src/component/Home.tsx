import React, {useEffect, useState} from 'react';
import { IEmployee } from './Employee.type';
import EmployeeList from './EmployeeList';
import "./Home.style.css";


const Home = () => {
  const [employeeList, setEmployeeList] = useState([] as IEmployee[])
  return (
    <>
        <article className='article-header'>
          <header>
            <h1>Simple CRUD Application</h1>
          </header>
          <section className='section-content'>
              <input type="button" value="ADD"  className="add-employee-btn"/>
              <EmployeeList list={employeeList}/>
          </section>
        </article>
    </>
  )
}

export default Home