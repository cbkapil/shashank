import Header from "components/Headers/Header";
import { useEffect, useState } from "react";
import moment, { now } from "moment";
import { view } from "@risingstack/react-easy-state";
import SearchBar from "material-ui-search-bar";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { findParentElementFromClassName } from "@mui/x-data-grid-pro/internals";
import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Form from "react-bootstrap/Form"
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewChequeSlip = () => {
  const [dataa, setdataa] = useState([]);
  const [startDate, setStartDate] = useState( new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchtext, setsearchtext] = useState();
  const token = localStorage.getItem("token");
  console.log(token);
  const searchbydate = async () => {
    console.log("hi from search");
    if (startDate && endDate) {
      let result = await fetch("http://localhost:8000/searchbydate", {
        method: "post",
        body: JSON.stringify({ startDate, endDate }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      result = await result.json();
      console.log("hahahahahahha", result);
      setdataa(result);
    } else return;
  };

  const searchbytext = async () => {
    console.log("hi from search");
    if (searchtext) {
      let result = await fetch("http://localhost:8000/searchbyword", {
        method: "post",
        body: JSON.stringify({ searchtext }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      result = await result.json();
      console.log("hahahahahahha", result);
      setdataa(result);
    } else return;
  };

  const onGridReady = async () => {
    let result = await fetch("http://localhost:8000/getchequeslips", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    result = await result.json();
    console.log(result);
    let data = [];
    result.Chequeslips.chequeslips.forEach((element) => {
      data.push(element);
    });
    setdataa(data);
    console.log(dataa);
  };

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "scroll",
  };

  const columns = [
    {
      label: "Firm Name",
      name: "firmname",
      options: {
        filter: false,
      },
    },
    {
      label: "Account No",
      name: "accountno",
      options: {
        filter: true,
      },
    },
    {
      label: "Party Name",
      name: "partyname",
      options: {
        filter: true,
      },
    },

    {
      label: "Cheque No",
      name: "chequeno",
      options: {
        filter: true,
      },
    },
    {
      label: "Amount",
      name: "amount",
      options: {
        filter: true,
      },
    },

    {
      label: "Doc Date",
      name: "docdate",
      options: {
        filter: true,
      },
    },
    {
      label: "Deposit Date",
      name: "depositdate",
      options: {
        filter: true,
      },
    },

    {
      name: "link",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <button>Print</button>
        ),
      },
    },
  ];

  console.log(startDate);
  console.log(endDate);
  useEffect(() => {
    onGridReady();
  }, []);

  return (
    <>
      <Header />
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          renderInput={(params) => <TextField {...params} />}
        />

        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider> */}

<Form.Control
                type="date"
                name="datepic"
                placeholder="DateRange"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
<Form.Control
                type="date"
                name="datepic"
                placeholder="DateRange"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
<button onClick={searchbydate}>Search</button>


      <div>
        <MUIDataTable
          title={"ACME Employee list"}
          data={dataa}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default ViewChequeSlip;
