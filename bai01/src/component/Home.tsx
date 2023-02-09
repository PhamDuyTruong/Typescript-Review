import React, { useEffect, useState } from "react";
import { IEmployee, PageNum } from "./Employee.type";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import "./Home.style.css";
import EditEmployee from "./EditEmployee";

const Home = () => {
  const [employeeList, setEmployeeList] = useState([] as IEmployee[]);
  const [showPage, setShowPage] = useState(PageNum.list);
  const [dataToEdit, setDataToEdit] = useState({} as IEmployee);

  useEffect(() => {
    const listInString = window.localStorage.getItem("EmployeeList");
    if (listInString) {
      handleEmployeeList(JSON.parse(listInString));
    }
  }, []);

  const onAddEmployeeClick = () => {
    setShowPage(PageNum.add);
  };

  const handleEmployeeList = (list: IEmployee[]) => {
    setEmployeeList(list);
    window.localStorage.setItem("EmployeeList", JSON.stringify(list));
  };

  const addEmployeeList = (data: IEmployee) => {
    handleEmployeeList([...employeeList, data]);
  };

  const showListPage = () => {
    setShowPage(PageNum.list);
  };

  const deleteEmployee = (data: IEmployee) => {
    const deletedIndex = employeeList.indexOf(data);
    const tempList = [...employeeList];
    tempList.splice(deletedIndex, 1);
    handleEmployeeList(tempList);
  };

  const updateData = (data: IEmployee) => {
    const filteredData = employeeList.filter((x) => x.id === data.id)[0];
    const indexOfRecord = employeeList.indexOf(filteredData);
    const tempData = [...employeeList];
    tempData[indexOfRecord] = data;
    handleEmployeeList(tempData);
  };

  const editEmployeeData = (data: IEmployee) => {
    setShowPage(PageNum.edit);
    setDataToEdit(data);
  };

  return (
    <>
      <article className="article-header">
        <header>
          <h1>Simple CRUD Application</h1>
        </header>
      </article>
      <section className="section-content">
        {showPage === PageNum.list && (
          <>
            <input
              type="button"
              value="ADD"
              onClick={onAddEmployeeClick}
              className="add-employee-btn"
            />
            <EmployeeList
              list={employeeList}
              onDeleteClick={deleteEmployee}
              onEdit={editEmployeeData}
            />
          </>
        )}
        {showPage === PageNum.add && (
          <>
            <AddEmployee
              onBackClick={showListPage}
              onSubmitClick={addEmployeeList}
            />
          </>
        )}

        {showPage === PageNum.edit && (
          <EditEmployee
            data={dataToEdit}
            onBackClick={showListPage}
            onUpdateClick={updateData}
          />
        )}
      </section>
    </>
  );
};

export default Home;
