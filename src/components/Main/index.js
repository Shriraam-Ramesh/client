import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import EmpCreation from "./Components/EmpCreation";
import EmpList from "./Components/EmpList";
import { ToastContainer, toast } from "react-toastify";

const Main = () => {
  const [empList, setEmpList] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [isUpdateClick, setIsUpdateClick] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    getAllEmp();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const getAllEmp = () => {
    const url = "http://localhost:8080/api/employee/list";
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) setEmpList(res.data);
        else console.log("Error occurred while fetching data", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const createEmployee = (emp) => {
    const url = "http://localhost:8080/api/employee/create";
    axios
      .post(url, emp)
      .then((res) => {
        if (res.status === 200) {
          getAllEmp();
          toast.success("Employee created successfully");
          setIsCreated(true);
        } else toast.error("Error occurred. Try again later");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const updateEmployee = (data) => {
    setIsUpdateClick(true);
    setSelectedEmp(data);
  };

  const updateEmployeeApi = (emp, empId) => {
    const data = { ...emp, _id: empId };
    const url = "http://localhost:8080/api/employee/update";
    axios
      .put(url, data)
      .then((res) => {
        if (res.status === 200) {
          getAllEmp();
          toast.success("Employee updated successfully");
          setIsUpdateClick(false);
          setIsUpdated(true);
        } else toast.error("Error occurred. Try again later");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const deleteEmployee = (data) => {
    if (data._id) {
      const confirmation = window.confirm(
        `Are you sure want to delete ${data.Name}?`
      );
      if (confirmation) {
        const url = `http://localhost:8080/api/employee/delete/${data._id}`;
        axios
          .delete(url)
          .then((res) => {
            if (res.status === 200) {
              getAllEmp();
              toast.success("Employee deleted successfully");
            } else toast.error("Error occurred. Try again later");
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    } else toast.error("Delete failed. Try again later");
  };

  return (
    <div className={styles.main_container}>
      <ToastContainer autoClose={3000} position="top-right" theme="dark" />
      <nav className={styles.navbar}>
        <h1>Employee Management System</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 style={{ fontWeight: "bold" }}>
              {isUpdateClick ? "Update Employee" : "Employee Creation"}
            </h5>
            <EmpCreation
              empData={createEmployee}
              selectedEmp={selectedEmp}
              isCreated={isCreated}
              isUpdateClick={isUpdateClick}
              updateApiHit={updateEmployeeApi}
              isUpdated={isUpdated}
            />
          </div>
          <div className="col-md-6">
            <h5 style={{ fontWeight: "bold" }}>Employee List</h5>
            <EmpList
              listData={empList}
              setData={updateEmployee}
              delEmp={deleteEmployee}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
