import React, { useState } from "react";
import AddEmployee from "./AddEmployee";
const Employees = () => {
  const [employees, setEmployees] = useState([
    { empId: 1234, name: "abc", designation: "SE" },
    { empId: 4567, name: "mno", designation: "SSE" },
    { empId: 8910, name: "pqr", designation: "TA" },

   
  ]);

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(employees);
  const addEmployee = (newEmployee) => {
    setData([...employees, newEmployee]);
  };

  const handleChange = value => {
   setSearchText(value);

    filterData(value);
  };

  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    console.log(lowercasedValue)
    if (lowercasedValue === "") setData([...employees])
    else {
      console.log("hi i m in filter data")
      const filteredData = data.filter(item => {
        return Object.keys(item).some(key =>
           item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      console.log(filteredData);
      setData(filteredData);
    }
  }

  return (
    <React.Fragment>
      <input type="text" placeholder="search employee"  value={searchText} onChange={e => handleChange(e.target.value)} />

      <table style={{ width: "60%" }} className="table">
        <thead className="thead-light">
          <tr>
            <th>EmpID</th>
            <th>Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, i) => {
            return (
              <tr key={i}>
                <td>{data.empId}</td>
                <td>{data.name}</td>
                <td>{data.designation}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length === 0 && <span>No records found to display!</span>}
      <br />
      <br />
      <AddEmployee addEmployee={addEmployee} />
    </React.Fragment>
  );
};
export default Employees;
