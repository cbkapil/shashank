import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "components/Headers/Header";
import "../../assets/css/app.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import moment from "moment";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { padding } from "@mui/system";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ marginTop: "0%", padding: "0%" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    // 'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [docdate, setdocdate] = useState(moment(new Date()).toISOString());
  const [depositdate, setdepositdate] = useState(
    moment(new Date()).toISOString()
  );
  const [amount2k, setAmount2k] = useState(0);
  const [amount500, setAmount500] = useState(0);
  const [amount200, setAmount200] = useState(0);
  const [amount100, setAmount100] = useState(0);
  const [amount50, setAmount50] = useState(0);
  const [amount20, setAmount20] = useState(0);
  const [amount10, setAmount10] = useState(0);
  const [amount5, setAmount5] = useState(0);
  const [amountCoins, setAmountCoins] = useState(0);

  const [firmdata, setFirmData] = useState([]);
  const [firmid, setfirmid] = useState("");
  const [bankdata, setBankData] = useState([]);
  const [bankid, setbankid] = useState("");
  const [searchbranch, setsearchbranch] = useState([]);
  const [userid, setuserid] = useState("");
  const [branchdata, setbranchdata] = useState([]);
  const [branchid, setbranchid] = useState([]);
  const [accountfin, setaccountfin] = useState("");
  const [totalamount, settotalamount] = useState("");
  const [firmnamee, setfirmnamee] = useState("");
  const [total, setTotal] = useState(0);
  const [total2k, settotal2k] = useState(0);
  const [total500, settotal500] = useState(0);
  const [total200, settotal200] = useState(0);
  const [total100, settotal100] = useState(0);
  const [total50, settotal50] = useState(0);
  const [total20, settotal20] = useState(0);
  const [total10, settotal10] = useState(0);
  const [total5, settotal5] = useState(0);
  const [partydata, setpartydata] = useState("");

  const [party2name, setparty2name] = useState("");
  const [chequeno, setchequeno] = useState("");
  const [amount, setamount] = useState("");

  function doTotal() {
    var Total =
      amount2k * 2000 +
      amount500 * 500 +
      amount200 * 200 +
      amount100 * 100 +
      amount50 * 50 +
      amount20 * 20 +
      amount10 * 10 +
      amount5 * 5 +
      amountCoins * 1;
    setTotal(Total);

    settotal2k(amount2k * 2000);
    settotal500(amount2k * 500);
    settotal200(amount2k * 200);
    settotal100(amount2k * 100);
    settotal50(amount50 * 50);
    settotal20(amount20 * 20);
    settotal10(amount10 * 10);
    settotal5(amount5);
  }

  console.log(total2k);
  console.log(docdate);
  console.log(depositdate)

  const token = localStorage.getItem("token");
  console.log(token);

  const getParty = async () => {
    let result = await fetch("http://localhost:8000/getparty", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    result = await result.json();
    var partyarray = [];
    result &&
      result.partyDatas.partyLink.forEach((element) => {
        partyarray.push(element.partyname);
      });
    setpartydata(partyarray);
  };

  const getFirm = async () => {
    let result = await fetch("http://localhost:8000/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    result = await result.json();
    console.log("hahahah", result);

    var firmarray = [];
    result.firmDatas.firmid.forEach((element) => {
      firmarray.push({ _id: element._id, firmname: element.firmname });
      console.log(firmarray);
      return setFirmData(firmarray);
    });
    console.log(firmarray);
    //  getBank(firmarray);
    const firmname = firmarray.find((element) => {
      return element._id === firmid;
    });
    console.log(firmname);
    const firmm = firmname?.firmname;
    setfirmnamee(firmm);
    console.log(firmnamee);
  };
  console.log("hello", firmid);

  const getBank = async (firmarray) => {
    if (!firmid) return;
    else {
      let result = await fetch("http://localhost:8000/getbank2", {
        method: "post",
        body: JSON.stringify({ firmid }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      result = await result.json();
      console.warn("kkkkk", result);

      var bankarray = [];
      var bankarray2 = [];
      result.firmDatas.bankLink.forEach((element) => {
        // console.log(element);
        bankarray.push(element.bank);
        bankarray2 = removeDuplicates(bankarray);

        console.log(bankarray);

        return setBankData(bankarray2);
      });
    }
  };
  // console.log("array", bankdata);
  console.log(bankid);

  function removeDuplicates(bankarray) {
    var unique = [];
    bankarray.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique;
  }

  const getbranch = async () => {
    console.log("hello");

    console.log(firmid, bankid);
    console.log("hello");
    if (branchid && firmid) {
      let result = await fetch("http://localhost:8000/getbranches", {
        method: "post",
        body: JSON.stringify({ firmid, bankid }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      result = await result.json();
      // console.warn("kkkkk", result);
      console.log(result);
      var brancharray = [];
      result.forEach((element) => {
        // console.log(element);
        brancharray.push({ branch: element.branch, account: element.account });

        return setbranchdata(brancharray);
      });
    } else return;
  };

  console.log(amountCoins);
  const firmSubmit = async (e) => {
    e.preventDefault();

    let result = await fetch("http://localhost:8000/generateslip", {
      method: "post",
      body: JSON.stringify({
        amount2k,
        amount500,
        amount200,
        amount100,
        amount50,
        amount20,
        amount10,
        amount5,
        amountCoins,
        total2k,
        total500,
        total200,
        total100,
        total50,
        total20,
        total10,
        total5,
        firmid,
        bankid,
        userid,
        branchid,
        accountfin,
        totalamount,
        firmnamee,
        total,
        docdate,
        depositdate,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    result = await result.json();
    console.log(result);

    if (result.status) {
      alert("data added");
    } else {
      console.warn("error");
    }

    console.warn(result);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
 console.log( bankid,
  userid,
  branchid,
  accountfin,
  party2name,
  firmnamee,
  chequeno,
  amount,
  docdate,
  depositdate,)
    let result = await fetch("http://localhost:8000/createchequeslip", {
      
      method: "post",
      body: JSON.stringify({
        bankid,
        userid,
        branchid,
        accountfin,
        party2name,
        firmnamee,
        chequeno,
        amount,
        docdate,
        depositdate,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    result = await result.json();
    console.log(result);

    if (result.status) {
      alert("data added");
    } else {
      console.warn("error");
    }

    console.warn(result);
  };
console.log(party2name)
  console.log(amount200);

  useEffect(() => {
    doTotal();
  }, [
    amount5,
    amount10,
    amount20,
    amount100,
    amount200,
    amount500,
    amount2k,
    amount50,
    amountCoins,
  ]);

  console.log(branchid);
  console.log(totalamount);
  useEffect(() => {
    getFirm();
    getBank();
    getbranch();
    getParty();
  }, [firmid, firmnamee, bankid, accountfin, totalamount, branchid]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Header />
      <Container className="Container mt--0 " fluid>
        <Box sx={{ bgcolor: "#fff", width: "100%" }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              // variant="fullWidth"
              // aria-label="full width tabs example"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <Tab label="Cash Deposit Slips" {...a11yProps(0)} />
              <Tab label="Cheque Deposit Slips" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            className="swipeview"
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Form className="p-1 ">
                <Row className="mt-0">
                  <Col lg="4">
                    <label className="form-control-label" htmlFor="input-email">
                      FIRM NAME
                    </label>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={firmdata}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label=" Select Firm" />
                      )}
                      getOptionLabel={(option) => option?.firmname}
                      onChange={(e, value) => {
                        setfirmid(value._id);
                      }}
                    />

                    <label className="form-control-label" htmlFor="input-email">
                      BANK NAME
                    </label>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={!bankdata ? <div>loading...</div> : bankdata}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label=" Select Bank" />
                      )}
                      onChange={(e, value) => {
                        setbankid(value);
                      }}
                    />

                    <label className="form-control-label" htmlFor="input-email">
                      BRANCH NAME
                    </label>

                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={
                        !branchdata
                          ? [{ label: "Loading...", id: 0 }]
                          : branchdata
                      }
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label=" Select Branch" />
                      )}
                      getOptionLabel={(option) => option?.branch}
                      onChange={(e, value) => {
                        setaccountfin(value.account);
                        setbranchid(value.branch);
                      }}
                    />

                    <FormGroup className="mb-3">
                      <Row>
                        <Col>
                          {" "}
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Account Number
                          </label>
                        </Col>
                        <Col>
                          {" "}
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            {accountfin}
                          </label>
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <Row>
                        <Col>
                          {" "}
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Doc Date
                          </label>
                        </Col>
                        <Col>
                          {" "}
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-username"
                            type="date"
                            value={docdate}
                            onChange={(e) => {
                              setdocdate(e.target.value);
                            }}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <Row>
                        <Col>
                          {" "}
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Deposit date
                          </label>
                        </Col>
                        <Col>
                          {" "}
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-username"
                            type="date"
                            value={depositdate}
                            onChange={(e) => {
                              setdepositdate(e.target.value);
                            }}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>

                  <Col lg="8">
                    <Table
                      className="align-items-center table-flush "
                      responsive
                    >
                      <thead className="thead-light gentabletbody ">
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Note</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="gentabletbody">
                        <tr>
                          <td>1</td>
                          <td>2000</td>
                          <td>
                            <Input
                              className="form-control-alternative"
                              defaultValue="0"
                              id="input-username"
                              type="number"
                              min="0"
                              //   max="100"
                              value={amount2k}
                              onChange={(e) => setAmount2k(e.target.value)}
                            />
                          </td>

                          <td className="text-center">
                            <h6>{amount2k * 2000}</h6>
                          </td>
                        </tr>

                        <tr className="">
                          <td>2</td>
                          <td>500</td>
                          <td>
                            <Input
                              className="form-control-alternative"
                              defaultValue="0"
                              id="input-username"
                              type="number"
                              min="0"
                              //   max="100"
                              value={amount500}
                              onChange={(e) => setAmount500(e.target.value)}
                            />
                          </td>

                          <td className="text-center">
                            <h6>{amount500 * 500}</h6>
                          </td>
                        </tr>
                        <tr className="m-0 p-0">
                          <td>3</td>
                          <td>200</td>
                          <td>
                            <Input
                              className="form-control-alternative"
                              defaultValue="0"
                              id="input-username"
                              type="number"
                              min="0"
                              //   max="100"
                              value={amount200}
                              onChange={(e) => setAmount200(e.target.value)}
                            />
                          </td>

                          <td className="text-center">
                            <h6>{amount200 * 200}</h6>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>100</td>
                          <td>
                            <Input
                              className="form-control-alternative"
                              defaultValue="0"
                              id="input-username"
                              type="number"
                              min="0"
                              //   max="100"
                              value={amount100}
                              onChange={(e) => setAmount100(e.target.value)}
                            />
                          </td>

                          <td className="text-center">
                            <h6>{amount100 * 100}</h6>
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>50</td>
                          <td>
                            <Input
                              className="form-control-alternative"
                              defaultValue="0"
                              id="input-username"
                              type="number"
                              min="0"
                              //   max="100"
                              value={amount50}
                              onChange={(e) => setAmount50(e.target.value)}
                            />
                          </td>

                          <td className="text-center">
                            <h6>{amount50 * 50}</h6>
                          </td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>20</td>
                          <td>
                            <Input
                              className="form-control-alternative"
                              defaultValue="0"
                              id="input-username"
                              type="number"
                              min="0"
                              //   max="100"
                              value={amount20}
                              onChange={(e) => setAmount20(e.target.value)}
                            />
                          </td>

                          <td className="text-center">
                            <h6>{amount20 * 20}</h6>
                          </td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>10</td>
                          <td>
                            <Input
                              className="form-control-alternative"
                              defaultValue="0"
                              id="input-username"
                              type="number"
                              min="0"
                              //   max="100"
                              value={amount10}
                              onChange={(e) => setAmount10(e.target.value)}
                            />
                          </td>

                          <td className="text-center">
                            <h6>{amount10 * 10}</h6>
                          </td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>5</td>
                          <td>
                            <Input
                              className="form-control-alternative"
                              defaultValue="0"
                              id="input-username"
                              type="number"
                              min="0"
                              //   max="100"
                              value={amount5}
                              onChange={(e) => setAmount5(e.target.value)}
                            />
                          </td>

                          <td className="text-center">
                            <h6>{amount5 * 5}</h6>
                          </td>
                        </tr>
                        <tr>
                          <td>9</td>
                          <td>Coins</td>
                          <td>
                            <Input
                              className="form-control-alternative"
                              defaultValue="0"
                              id="input-username"
                              type="number"
                              min="0"
                              //   max="100"
                              value={amountCoins}
                              onChange={(e) => setAmountCoins(e.target.value)}
                            />
                          </td>

                          <td className="text-center">
                            <h6>{amountCoins * 1}</h6>
                          </td>
                        </tr>

                        <tr>
                          <td colspan="3" className=" text-right">
                            <h1>TOTAL AMOUNT</h1>
                          </td>
                          <td className="text-center">
                            <h1>{total}</h1>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>

                <Button
                  className="companybutton"
                  variant="primary"
                  type="submit"
                  onClick={firmSubmit}
                >
                  Generate Slip
                </Button>
              </Form>
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
              <Form className="p-1 ">
                <Row className="mt-0">
                  <Col lg="6">
                    <label className="form-control-label" htmlFor="input-email">
                      FIRM NAME
                    </label>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={firmdata}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label=" Select Firm" />
                      )}
                      getOptionLabel={(option) => option?.firmname}
                      onChange={(e, value) => {
                        setfirmid(value._id);
                      }}
                    />

                    <label className="form-control-label" htmlFor="input-email">
                      BANK NAME
                    </label>

                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={!bankdata ? <div>loading...</div> : bankdata}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label=" Select Bank" />
                      )}
                      onChange={(e, value) => {
                        setbankid(value);
                      }}
                    />

                    <label className="form-control-label" htmlFor="input-email">
                      BRANCH NAME
                    </label>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={
                        !branchdata
                          ? [{ label: "Loading...", id: 0 }]
                          : branchdata
                      }
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label=" Select Branch" />
                      )}
                      getOptionLabel={(option) => option?.branch}
                      onChange={(e, value) => {
                        setaccountfin(value.account);
                        setbranchid(value.branch);
                      }}
                    />

                    <FormGroup className="mb-3">
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Account Number
                          </label>
                        </Col>
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            {accountfin}
                          </label>
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <Row>
                        <Col>
                          {" "}
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Doc Date
                          </label>
                        </Col>
                        <Col>
                          {" "}
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-username"
                            type="date"
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <Row>
                        <Col>
                          {" "}
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Deposit date
                          </label>
                        </Col>
                        <Col>
                          {" "}
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-username"
                            type="date"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>

                  <Col lg="6">
                    <label className="form-control-label" htmlFor="input-email">
                      Customer NAME
                    </label>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={partydata}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(e) => setparty2name(e.target.textContent)}
                    />

                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-city"
                      >
                        Cheque No.
                      </label>
                      <Input
                        className="form-control-alternative"
                        defaultValue=""
                        id="input-city"
                        placeholder="Cheque No."
                        type="text"
                        onChange={(e) => setchequeno(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-city"
                      >
                        Amount
                      </label>
                      <Input
                        className="form-control-alternative"
                        defaultValue=""
                        id="input-city"
                        placeholder="Cheque No."
                        type="number"
                        onChange={(e) => setamount(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Button
                  className="companybutton"
                  variant="primary"
                  type="submit"
                  onClick={formSubmit}
                >
                  Generate Slip
                </Button>
              </Form>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Container>
    </>
  );
}

// import Header from "components/Headers/Header";
// import React, { useState } from "react";

// import {
//   Button,
//   FormGroup,
//   Form,
//   Input,
//   Table,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";

// const CashSlip = () => {

//   return (
//     <>
//       <Header />

//     </>
//   );
// };

// export default CashSlip;
