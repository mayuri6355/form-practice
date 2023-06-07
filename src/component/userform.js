import React, { useState } from "react";

import {
  Card,
  Checkbox,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { datePickerToolbarClasses, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import validator from "validator";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import '../../src/App.css'

export default function Userform(props) {


  const[tabledata,setTableData]=useState([]);

  const [name, setName] = useState("");

  /*********************Email*************************/

 const[email,setEmail]=useState("");
 
  //********  phone number  ********* */

  const [mobile, setmobile] = useState("");
  const [isError, setIsError] = useState(false);

  //****************  Gender  ****************** */
  const [gender, setGender] = useState(" ");

  /*********************Hobby******************** */
  const [hobby,setHobby] = useState(" ");

  /*********************Bloodgroup*********************** */
  const [bloodgroup,setBloodGroup] = useState("");
 /********************Brithdate*************************** */

 const [date, setDate] = useState(dayjs());
 const handleChange = (newValue) => {
   setDate(newValue);
 };
 const[list,setList]=useState([])
  const HandleSubmit= (event) => {
    event.preventDefault();
    const list = {
      name,
      email,
      mobile,
      gender,
      hobby,
      bloodgroup,
      date
    };
    console.log(list);
   
 
    clearState();
  };

const clearState = () => {
  setName('');
  setEmail('');
  setmobile('');
  setGender('');
  setHobby('');
  setBloodGroup('');
  setDate('');
};
 

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>UserForm</h1>
      <Card
        sx={{
          maxWidth: 345,
          marginLeft: 75,
          height: 660,
          backgroundColor:'gold',
          padding: 10,
          border:"black"
        }}
      >
       <form onSubmit={HandleSubmit}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            value={name}
            size="small"
            helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="Name"
            fullWidth
          />
          <br />
          <br />
          <TextField
            fullWidth
            size="small"
            helperText="Please enter email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="userEmail"
            value={email}
            required
          />
        
          <br />
          <br />
          <TextField
            fullWidth
            size="small"
            type="number"
            helperText="Please enter valid contact"
            error={isError}
            value={mobile}
            label="Contact"
            onChange={(e) => {
              setmobile(e.target.value);
              if (e.target.value.length > 10) {
                setIsError(true);
              }
            }}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">+91</InputAdornment>
            //   ),
            // }}
          />
          <br />
          <FormLabel
            sx={{ marginRight: 35 }}
            id="demo-row-radio-buttons-group-label"
          >
            Gender
          </FormLabel>
          <RadioGroup
            size="small"
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e)=>setGender(e.target.value)}
            value={gender}
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
              checked={gender === "Female"}
            />
            <FormControlLabel
              value="Male"
              control={<Radio />}
              label="Male"
              checked={gender === "Male"}
            />
            <FormControlLabel
              value="Other"
              control={<Radio />}
              label="Other"
              checked={gender === "Other"}
            />
          </RadioGroup>
          <br />
          <FormLabel
            sx={{ marginRight: 37 }}
            id="demo-row-radio-buttons-group-label"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
          >
            Hobby
            <br />
            <FormControlLabel
              control={<Checkbox />}
              value="Cricket"
              label="Cricket"
            />
            <FormControlLabel
              control={<Checkbox />}
              value="Music"
              label="Music"
            />
            <FormControlLabel
              control={<Checkbox />}
              value="Writing"
              label="Writing"
            />
          </FormLabel>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">BloodGroup</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="bloodgroup"
              value={bloodgroup}
              onChange={(e)=>setBloodGroup(e.target.value)}
            >
              <MenuItem value="A+">A Positive</MenuItem>
              <MenuItem value="B+">B Positive</MenuItem>
              <MenuItem value="AB+">AB Positive</MenuItem>
              <MenuItem value="AB-">AB Negative</MenuItem>
              <MenuItem value="O+"> O Positive</MenuItem>
              <MenuItem value="O-">O Negative</MenuItem>
            </Select>
            <FormHelperText>Select a BloodGroup</FormHelperText>
          </FormControl>
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Date of Birth"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <br />
          <Button
           className="submit"
            type="submit"
            onChange={HandleSubmit}
          >
            Submit
          </Button>
          &nbsp;&nbsp;
          <Button
            style={{
            backgroundColor:'blue',
              color: "black",
              border: "1px solid",
            }}
            type="reset"
            onClick={clearState}
          >
           Reset
          </Button>
        </form>
      </Card>

    {
      tabledata.map((item)=>{
        return(
          <tr>
            <td>{item.name}</td>
           <td>{item.email}</td>
          </tr>
          
        )
      })
    }
    </div>
  );
}
