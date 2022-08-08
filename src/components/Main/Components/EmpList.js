import React, { useState } from "react";
import ViewEmployeeModal from "./ViewEmployeeModal";
import moment from "moment";
const EmpList = ({ listData, setData, delEmp }) => {
  const [modal, setModal] = useState(false);
  const [clickedData, setClickedData] = useState({});

  const toggle = () => {
    setModal(!modal);
  };

  const viewEmployee = (e, data) => {
    e.preventDefault();
    setClickedData(data);
    toggle();
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">City</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listData && listData.length > 0 ? (
            listData
              .sort((a, b) => moment(a.createdTime) < moment(b.createdTime))
              .map((x, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{x.Name ? x.Name : ""}</td>
                  <td>{x.Age ? x.Age : ""}</td>
                  <td>{x.City ? x.City : ""}</td>
                  <td>
                    <i
                      className="fa-solid fa-eye"
                      id="viewIcon"
                      style={{ color: "#714c4c", cursor: "pointer" }}
                      onClick={(e) => viewEmployee(e, x)}
                    />
                    <i
                      className="fa-solid fa-pencil"
                      id="editIcon"
                      style={{
                        marginLeft: "8px",
                        color: "#6767f4",
                        cursor: "pointer",
                      }}
                      onClick={(e) => setData(x)}
                    />
                    <i
                      className="fa-solid fa-trash-can"
                      id="deleteIcon"
                      style={{
                        marginLeft: "8px",
                        color: "#f46262",
                        cursor: "pointer",
                      }}
                      onClick={(e) => delEmp(x)}
                    />
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={5}>No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ViewEmployeeModal data={clickedData} modalShow={modal} toggle={toggle} />
    </>
  );
};

export default EmpList;
