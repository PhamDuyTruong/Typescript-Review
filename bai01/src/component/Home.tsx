import React, {useEffect, useState} from 'react';
import { IEmployee, PageNum } from './Employee.type';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';
import "./Home.style.css";


const Home = () => {
  const [employeeList, setEmployeeList] = useState([] as IEmployee[]);
  const [showPage, setShowPage] = useState(PageNum.list);
  

  useEffect(() => {
    const listInString = window.localStorage.getItem("EmployeeList");
    if(listInString){
      handleEmployeeList(JSON.parse(listInString));
    }
  }, []);

  const onAddEmployeeClick = () => {
    setShowPage(PageNum.add)
  }

  const handleEmployeeList = (list: IEmployee[]) => {
    setEmployeeList(list);
    window.localStorage.setItem("EmployeeList", JSON.stringify(list));
};

const addEmployeeList = (data: IEmployee) => {
    handleEmployeeList([...employeeList, data])
};

const showListPage = () => {
  setShowPage(PageNum.list);
};

 
  return (
    <>
        <article className='article-header'>
          <header>
            <h1>Simple CRUD Application</h1>
          </header>
        </article>
          <section className='section-content'>
            { showPage === PageNum.list && (
              <>
                 <input type="button" value="ADD" onClick={onAddEmployeeClick}  className="add-employee-btn"/>
                <EmployeeList list={employeeList}/>
              </>
              )
            }
            {showPage === PageNum.add && (
              <>
                <AddEmployee 
                  onBackClick = {showListPage}
                  onSubmitClick = {addEmployeeList}
                />
              </>
            )
            }

          </section>

    </>
  )
}

export default Home