import React, { useEffect, useState } from "react";

const EmpCreation = ({
  empData,
  selectedEmp,
  isCreated,
  isUpdated,
  isUpdateClick,
  updateApiHit,
}) => {
  const initialState = {
    Name: "",
    Age: "",
    City: "",
  };

  const [employee, setEmployee] = useState(initialState);

  useEffect(() => {
    if (selectedEmp._id != null) {
      setEmployee({
        ...employee,
        Name: selectedEmp.Name,
        Age: selectedEmp.Age,
        City: selectedEmp.City,
      });
    }
  }, [selectedEmp]);

  useEffect(() => {
    if (isCreated || isUpdated) setEmployee(initialState);
  }, [isCreated, isUpdated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: name === "Age" ? value.replace(/[^0-9]+/g, "") : value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (employee.Name && employee.Age && employee.City) {
      empData(employee);
    } else alert("All fields are mandatory!");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (employee.Name && employee.Age && employee.City) {
      if (selectedEmp._id) {
        updateApiHit(employee, selectedEmp._id);
      }
    } else alert("All fields are mandatory!");
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="NameIp">Name</label>
          <input
            style={{ marginTop: "5px" }}
            type="text"
            className="form-control"
            id="NameIp"
            name="Name"
            onChange={handleChange}
            value={employee.Name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="AgeIp">Age</label>
          <input
            style={{ marginTop: "5px" }}
            type="text"
            maxLength={3}
            className="form-control"
            id="AgeIp"
            name="Age"
            onChange={handleChange}
            value={employee.Age}
          />
        </div>
        <div className="form-group">
          <label htmlFor="CityIp">City</label>
          <input
            type="text"
            style={{ marginTop: "5px" }}
            className="form-control"
            id="CityIp"
            name="City"
            onChange={handleChange}
            value={employee.City}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={isUpdateClick ? handleUpdate : handleCreate}
          style={{ marginTop: "10px" }}
        >
          {isUpdateClick ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default EmpCreation;
