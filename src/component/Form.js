import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "../../src/App.css";
import { useForm } from "react-hook-form";
const initialvalue = {
  id: "",
  fullName: "",
  fname: "",
  lname: "",
  email: "",
  Phone: "",
  gender: "",
  hobby: [],
  bloodgroup: "",
  dob: "",
};

export default function Form() {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formInputData, setformInputData] = useState(initialvalue);
  const [togglesubmit, setToggleSubmit] = useState(false);
  const [editIndex, setEditIndex] = useState();

  /************************     OnchangeWEvent   ******************************* */

  const Changehandle = (e) => {
    const { name, value } = e.target;
    setformInputData({ ...formInputData, [name]: value });
  };
  /***********************   Submit Button    ***************************** */
  const HandleSubmit = (evnt) => {
    console.log("submit");
    var names = formInputData.fullName.split(" ");
    formInputData.fname = names[0];
    formInputData.lname = names[1];
    evnt.preventDefault();
    if(validate){
      setFormErrors(validate(formInputData));
    }else{
      setformInputData(tableData);
    }
    
    setTableData([...tableData, { ...formInputData }]);
    const checkEmptyInput = !Object.values(formInputData).every(
      (res) => res === ""
    );
    if (checkEmptyInput) {
      const emptyInput = {
        fullName: "",
        fname: "",
        lname: "",
        email: "",
        Phone: "",
        gender: "",
        hobby: [],
        bloodgroup: "",
        dob: "",
      };
      setformInputData(emptyInput);
    }

    console.log("formInputData", formInputData);

  };

  useEffect(() => {
    console.log("formErrors",formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("formInputData",formInputData);
    }
  }, [formErrors]);

  const validate = (values) => {
    
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const pregex=/^([+]\d{2}[ ])?\d{10}$/;
    if (!values.fullName) {
      errors.fullName = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if(!values.Phone){
      errors.Phone="contact required!";
    }
    else if(!pregex.test(values.Phone)){
      errors.Phone="Enter valid number"
    }
    if(!values.gender){
      errors.gender="select gender!";
    }
    if(!values.hobby[false]){
      errors.hobby="select hobby!";
    }
    if(!values.bloodgroup){
      errors.bloodgroup="select your bloodgroup!";
    }
    if(!values.dob){
      errors.dob="choose your birthdate!";
    }
    return errors;
  };
  /********************   ResetButton  ********************* */
  const HandleReset = () => {
    const emptyInput = {
      fullName: "",
      fname: "",
      lname: "",
      email: "",
      Phone: "",
      gender: "",
      hobby: [],
      bloodgroup: "",
      dob: "",
    };
    setformInputData(emptyInput);
  };
  /******************   MultiCheckbox  ***************** */
  const gethobby = (e) => {
    const { value } = e.target;
    if ((formInputData.hobby || []).includes(value)) {
      const values = formInputData.hobby.filter((e) => e !== value);
      setformInputData((prev) => ({ ...prev, hobby: values }));
    } else {
      setformInputData((prev) => ({ ...prev, hobby: [...prev.hobby, value] }));
    }
  };
  /**********************  Delete   ********************************* */

  const deleteTableRows = (index) => {
    tableData.splice(index, 1);
    setTableData([...tableData]);
  };

  /***************************** Edit    ******************************** */

  const EditTableRows = (i) => {
    setformInputData(tableData[i]);
    setToggleSubmit(true);
    setEditIndex(i);
  };

  /******************************  HandleUpdate  *************************** */
  const HandleUpdate = () => {
    setToggleSubmit(false);
    var names = formInputData.fullName.split(" ");
    formInputData.fname = names[0];
    formInputData.lname = names[1];
    tableData.splice(editIndex, 1, formInputData);
    setTableData([...tableData]);
    setformInputData(initialvalue);
  };
  return (
    <div>
      <form>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "15px",
            border: "13px solid #b4f0b4",
            color: "rgb(11, 167, 11)",
          }}
        >
          User Form
        </h1>
        <Card
          sx={{
            maxWidth: 500,
            marginLeft: 80,
            height: 700,
            backgroundColor: "lightBlue",
            padding: 5,
            border: "2px solid black",
            borderRadius: 4,
          }}
        >
          <div>
            <FormLabel>
              <b>FullName:</b>
            </FormLabel>
            <TextField
              size="small" className="textinput"
              id="outlined-basic"
              label=" fullName"
              variant="outlined"
              name="fullName"
              value={formInputData.fullName}
              onChange={Changehandle}
            />
            <p className="p">{formErrors.fullName}</p>
            <br />
            <FormLabel>
              <b>Email:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </FormLabel>
            <TextField className="textinput"
              size="small"
              type="email"
              id="outlined-basic"
              label="email"
              variant="outlined"
              name="email"
              value={formInputData.email}
              onChange={Changehandle}
            />
            <p className="p">{formErrors.email}</p>
            <br />
            <FormLabel>
              <b>Contact:</b>&nbsp;&nbsp;&nbsp;
            </FormLabel>
            <TextField className="textinput"
              size="small"
              type="text"
              id="outlined-basic"
              label="contact"
              variant="outlined"
              name="Phone"
              value={formInputData.Phone}
              onChange={Changehandle}
            />
            <p className="p">{formErrors.Phone}</p>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <b>Gender</b>
              </FormLabel>
              <RadioGroup className="textinput"
                size="small"
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="gender"
                onChange={Changehandle}
                value={formInputData.gender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  checked={formInputData.gender === "female"}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  checked={formInputData.gender === "male"}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  checked={formInputData.gender === "other"}
                />
              </RadioGroup>
            </FormControl>
            <p className="p">{formErrors.gender}</p>
            <FormLabel>
              <b>Hobby:</b>
            </FormLabel>
            <FormGroup className="textinput"
              size="small"
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="hobby"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInputData.hobby.includes("Cricket")}
                    onChange={gethobby}
                  />
                }
                label="Cricket"
                value="Cricket"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInputData.hobby.includes("Music")}
                    onChange={gethobby}
                  />
                }
                label="Music"
                value="Music"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInputData.hobby.includes("Writing")}
                    onChange={gethobby}
                  />
                }
                label="Writing"
                value="Writing"
              />
            </FormGroup>
            <p className="p">{formErrors.hobby}</p>
            <FormControl sx={{ minWidth: 200 }} size="small" className="textinput">
              <InputLabel id="demo-controlled-open-select-label">
                BloodGroup
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                label="booldgroup"
                name="bloodgroup"
                onChange={Changehandle}
                value={formInputData.bloodgroup}
              >
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </Select>
            </FormControl>
            <p className="p">{formErrors.bloodgroup}</p>
            <TextField className="textinput"
              size="small"
              id="date"
              label="Choose your birthdate"
              type="date"
              name="dob"
              value={formInputData.dob}
              onChange={Changehandle}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <p className="p">{formErrors.dob}</p>
            {!togglesubmit ? (
              <Button
                onClick={HandleSubmit}
                style={{
                  marginLeft:150,
                  backgroundColor: "green",
                  color: "white",
                  border: "1px solid black",
                }}
                type="button"
              >
                {" "}
                Submit
              </Button>
            ) : (
              <Button
                onClick={HandleUpdate}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  border: "1px solid black",
                }}
                type="button"
              >
                {" "}
                Update
              </Button>
            )}
            &nbsp;&nbsp;
            <Button
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "1px solid black",
              }}
              type="reset"
              onClick={HandleReset}
            >
              Reset
            </Button>
          </div>
        </Card>
      </form>
      <br />
      <br />
      <div>
        <table border={1} style={{ marginLeft: 340 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>firstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Hobby</th>
              <th>BloodGroup</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td> {item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                  <td>{item.Phone}</td>
                  <td>{item.gender}</td>
                  <td>{item.hobby}</td>
                  <td>{item.bloodgroup}</td>
                  <td>{item.dob}</td>
                  <td>
                    <Button
                      className="Delete"
                      style={{
                        backgroundColor: "red",
                        border: "2px solid black",
                        size: "small",
                        color: "white",
                      }}
                      onClick={() => deleteTableRows(i)}
                    >
                      Delete
                    </Button>
                    &nbsp;
                    <Button
                      style={{
                        backgroundColor: "green",
                        border: "2px solid black",
                        size: "small",
                        color: "white",
                      }}
                      onClick={() => EditTableRows(i)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
