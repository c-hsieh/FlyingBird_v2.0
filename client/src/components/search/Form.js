import React, { useState, useEffect, useContext } from "react";
// import customData from './listdep.json';
import customData from "./d.json";
import { Context } from '../../flux/store';
import Timeselect from "./TimeSelect";
import { CSSTransitionGroup } from "react-transition-group";

import Selection from "@simonwep/selection-js/dist/selection.min.js";
import "./time.css";
const TimeSelectListInital = {
  checkWkSection10: "0",
  checkWkSection11: "0",
  checkWkSection12: "0",
  checkWkSection13: "0",
  checkWkSection14: "0",
  checkWkSection15: "0",
  checkWkSection16: "0",
  checkWkSection17: "0",
  checkWkSection18: "0",
  checkWkSection19: "0",
  checkWkSection110: "0",
  checkWkSection111: "0",
  checkWkSection112: "0",
  checkWkSection113: "0",
  checkWkSection114: "0",
  checkWkSection20: "0",
  checkWkSection21: "0",
  checkWkSection22: "0",
  checkWkSection23: "0",
  checkWkSection24: "0",
  checkWkSection25: "0",
  checkWkSection26: "0",
  checkWkSection27: "0",
  checkWkSection28: "0",
  checkWkSection29: "0",
  checkWkSection210: "0",
  checkWkSection211: "0",
  checkWkSection212: "0",
  checkWkSection213: "0",
  checkWkSection214: "0",
  checkWkSection30: "0",
  checkWkSection31: "0",
  checkWkSection32: "0",
  checkWkSection33: "0",
  checkWkSection34: "0",
  checkWkSection35: "0",
  checkWkSection36: "0",
  checkWkSection37: "0",
  checkWkSection38: "0",
  checkWkSection39: "0",
  checkWkSection310: "0",
  checkWkSection311: "0",
  checkWkSection312: "0",
  checkWkSection313: "0",
  checkWkSection314: "0",
  checkWkSection40: "0",
  checkWkSection41: "0",
  checkWkSection42: "0",
  checkWkSection43: "0",
  checkWkSection44: "0",
  checkWkSection45: "0",
  checkWkSection46: "0",
  checkWkSection47: "0",
  checkWkSection48: "0",
  checkWkSection49: "0",
  checkWkSection410: "0",
  checkWkSection411: "0",
  checkWkSection412: "0",
  checkWkSection413: "0",
  checkWkSection414: "0",
  checkWkSection50: "0",
  checkWkSection51: "0",
  checkWkSection52: "0",
  checkWkSection53: "0",
  checkWkSection54: "0",
  checkWkSection55: "0",
  checkWkSection56: "0",
  checkWkSection57: "0",
  checkWkSection58: "0",
  checkWkSection59: "0",
  checkWkSection510: "0",
  checkWkSection511: "0",
  checkWkSection512: "0",
  checkWkSection513: "0",
  checkWkSection514: "0",
  checkWkSection60: "0",
  checkWkSection61: "0",
  checkWkSection62: "0",
  checkWkSection63: "0",
  checkWkSection64: "0",
  checkWkSection65: "0",
  checkWkSection66: "0",
  checkWkSection67: "0",
  checkWkSection68: "0",
  checkWkSection69: "0",
  checkWkSection610: "0",
  checkWkSection611: "0",
  checkWkSection612: "0",
  checkWkSection613: "0",
  checkWkSection614: "0"
};
const Form = prop => {
  const [depFilter, setDepFilter] = useState("");
  const [dep, setDep] = useState(Object.keys(customData[0]));
  const [SUBmit, setSUBmit] = useState(false);
  const [timeShow, setTimeShow] = useState(false);
  const [timeList, setTimeList] = useState([]);
  const [timeSelectList, setTimeSelectList] = useState(TimeSelectListInital);
  const [dis, setDis] = useState(0);
  const { query } = useContext(Context);
  const [state, setState] = query;

  // const selection = new Selection({
  //   class: "selection",

  //   // All elements in this container can be selected
  //   selectables: [".box-wrap > div.table"],

  //   // The container is also the boundary in this case
  //   boundaries: [".box-wrap"]
  // });

  useEffect(() => {
    let t = Object.assign(TimeSelectListInital)
    // console.log("TimeSelectListInital", t);
    Object.keys(t).forEach((item) => {
      if (timeList.some(ele=>ele===item)){
         t[item] = "1"
      }else{
         t[item] = "0"
      };
    });
    // timeList.forEach(i => (t[i] = "1"));

    setTimeSelectList(t);
    console.log("setTimeList", t)
  }, [timeList]);

  const FormValueInitial = {
    serialNo: "",
    chnName: "",
    teacher: "",
    deptCode: "",
    formS: "",
    class1: "",
    generalCore: "",
    notFull: "",
    courseCode: "",
    action: "showGrid",
    actionButton: "query",
    page: "1",
    start: "0",
    limit: "999999"
  };
  const [formValue, setFormValue] = useState(FormValueInitial);
  // console.log(dep)

  const classLevel = {
    "": "",
    甲班: "1",
    乙班: "2",
    丙班: "3",
    丁班: "4",
    大碩博合開: "7",
    碩博合開: "8",
    大碩合開: "9"
  };

  useEffect(() => {
    //console.log('formValue', formValue)
    if (SUBmit) {
      if (
        formValue.chnName === "" &&
        formValue.serialNo === "" &&
        formValue.teacher === "" &&
        formValue.deptCode === "" &&
        formValue.generalCore === "" &&
        (formValue.courseCode === "" || formValue.courseCode === "1")
      ) {
        //console.log('emepty')
        // alert = <p>Try again</p>
        prop.setAlert(
          prop.alertFun("warning", "Warning! ", " Please enter something...")
        );
        window.setTimeout(() => {
          prop.setAlert(null);
        }, 2500);
      } else {
        prop.handleBlock();
        //console.log('formValue', formValue)
        //console.log('FormValueInitial', FormValueInitial)
        //console.log('get a submit')
        setState({ class_list: [], heading: "Searching" });
        // setState({
        //     ...state,
        //     ['class_list']: []
        // });
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...formValue, ...timeSelectList })
        };
        fetch("/api/search/query", options)
          .then(res => {
            return res.json();
          })
          .then(j => {
            //console.log('j', j);

            if (j.err === undefined) {
              if (j.length === 0) {
                console.log(j.length);
                setState({ class_list: [], heading: "Empty" });
              //   dispatch({ 
              //     type: "Empty",
              //     payload: []
              // });
              } else {
                setState({ class_list: j, heading: "Finish" });
              }
            } else {
              setState({ class_list: [], heading: "Err" });
            }
            // setFormValue(FormValueInitial);
            // setTimeSelectList(TimeSelectListInital);
            //console.log(j)
          })
          .catch(err => {
            console.error(err);
          });
      }

      setSUBmit(false);
    }
  }, [formValue, alert]);

  const setvalue = async e => {
    //console.log("Hello", e.target.id)
    if (e.target.id === "notFull") {
      console.log("e.target.checked", e.target.checked)
      setFormValue({
        ...formValue,
        [e.target.id]: (e.target.checked) ? "1" : "0",
        ["serialNo"]: ""
      });
    } else if (e.target.id === "teacher" || e.target.id === "chnName") {
      setFormValue({
        ...formValue,
        [e.target.id]: e.target.value,
        ["serialNo"]: ""
      });
    } else if (e.target.id === "formsubmit") {
      setFormValue({
        ...formValue
      });
    } else {
      setFormValue({
        ...formValue,
        [e.target.id]: e.target.value,
        ["serialNo"]: ""
      });
    }
  };
  const findClass = async e => {
    e.preventDefault();
    setvalue(e);

    setSUBmit(true);
  };
  const onChangeFilter = e => {
    //console.log('dep', dep)
    let depRes = Object.keys(customData[0]).filter(
      x => customData[0][x].indexOf(e.target.value) > -1
    );
    //console.log('dep', dep)
    setDep(depRes);

    setDepFilter(e.target.value);
    setFormValue({
      ...formValue,
      ["deptCode"]: depRes[0]
    });
  };
  // useEffect(() => {
  //     console.log('formValue', formValue)
  // }, [formValue])
  const onChange = e => {
    // setvalue(e)
    // console.log(e.target.id )
    if (e.target.id === "serialNo") {
      setFormValue({
        ...FormValueInitial,
        [e.target.id]: e.target.value,
        ["courseCode"]: formValue.courseCode
      });
    } else {
      if (e.target.id === "courseCode") {
        setDis(parseInt(e.target.value));
        setFormValue({
          ...FormValueInitial,
          [e.target.id]: e.target.value
        });
      } else {
        setvalue(e);
      }
    }

    // console.log('e.target.value', e.target.value)
    // console.log('e.target.id', e.target.id)
  };
  // console.log(customData);
  const reSetasd = e => {
    e.preventDefault();
    setFormValue({
      ...FormValueInitial
    });
    // setTimeSelectList({...TimeSelectListInital})

    setTimeShow(false);
    let t = Object.assign(TimeSelectListInital);
    Object.keys(t).forEach(item => {
      t[item] = "0";
    });
    setTimeSelectList(t);
    //console.log(prop);
  };
  //console.log('alert', alert)

  const timeshowF = e => {
    e.preventDefault();
    // setTimeShow(!timeShow);
    setTimeShow(true);
  };

  return (
    <React.Fragment>
      {/* {console.log("formValue", formValue)} */}
      {/* {alert} */}
      {/* {console.log('timeListFROM', timeList)} */}
      {/* {console.log('TimeSelectListFROM', timeSelectList)} */}
      {/* TimeSelectList */}
      <div className="row ">
        <div className="col d-flex justify-content-end">
          <button
            className="btn btn-warning mr-1"
            onClick={timeshowF}
            type="button"
          >
            Time Select
          </button>
          <button
            className="btn btn-dark btn-sm "
            onClick={reSetasd}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>
      <form onSubmit={findClass} id="formsubmit">
        <div className="row">
          <div className="form-group col-xs-4 col-sm-3">
            {/* <label htmlFor="acadmYear">Acadm Year</label> */}
            <label htmlFor="acadmYear">學年</label>
            <input
              type="text"
              className="form-control"
              id="acadmYear"
              onChange={onChange}
              value={108}
              readOnly
            />
          </div>
          <div className="form-group col-xs-4 col-sm-3">
            {/* <label htmlFor="acadmTerm">Acadm Term</label> */}
            <label htmlFor="acadmTerm">學期</label>
            <input
              type="text"
              className="form-control"
              id="acadmTerm"
              onChange={onChange}
              value={3}
              readOnly
            />
          </div>
          <div className="clearfix visible-xs"></div>
          <div className="form-group col-xs-4 col-sm-6">
            {/* <label htmlFor="courseCode">Course Type:</label> */}
            <label htmlFor="courseCode">科目類別: </label>
            <select
              className="form-control select2 "
              id="courseCode"
              onChange={onChange}
              value={formValue.courseCode}
            >
              {/* {Object.keys(dep).map(i => <option key={customData[0][dep[i]]} value={customData[0][dep[i]]}>{dep[i]}</option>)} */}
              {[
                "",
                "一般科目",
                "通識科目",
                "一般體育科目",
                "共同科目",
                "教育學程科目",
                "大一體育"
              ].map((e, i) => (
                <option key={i} value={i > 0 ? i : ""}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={onChange}
            checked={formValue.notFull==="1"?true:false}
            id="notFull"
          />
          {/* <label className="form-check-label" htmlFor="notFull">
            Not Full Course
          </label> */}
          <label className="form-check-label" htmlFor="notFull">
            未額滿課程
          </label>
        </div>

        <div className="row">
          <div className="form-group col">
            {/* <label htmlFor="chnName">Course Name</label> */}
            <label htmlFor="chnName">課程名稱:</label>
            <input
              type="text"
              className="form-control"
              id="chnName"
              placeholder=""
              onChange={onChange}
              value={formValue.chnName}
            />
          </div>
          <div className="form-group col">
            {/* <label htmlFor="teacher">Teacher:</label> */}
            <label htmlFor="teacher">教師姓名:</label>
            <input
              type="text"
              className="form-control"
              id="teacher"
              placeholder=""
              onChange={onChange}
              value={formValue.teacher}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-3 col-sm-3 pr-sm-0 pr-xs-1">
            {/* <label htmlFor="depFilter">Dept. Filter:</label> */}
            <label htmlFor="depFilter">系所Keyword: </label>
            <input
              type="text"
              className="form-control"
              id="acadmTerm"
              onChange={onChangeFilter}
              value={depFilter}
              placeholder="Keyword... (e.g. 數學)"
              disabled={
                dis === 2 || dis === 3 || dis === 4 || dis === 6
                  ? "disabled"
                  : ""
              }
            />
          </div>
          <div className="form-group col-xs-3 col-sm-3 pl-sm-0 pl-xs-1">
            {/* <label htmlFor="deptCode">Dept. Select:</label> */}
            <label htmlFor="deptCode">系所/學程:</label>
            <select
              className="form-control select2 "
              id="deptCode"
              onChange={onChange}
              value={formValue.deptCode}
              disabled={
                dis === 2 || dis === 3 || dis === 4 || dis === 6
                  ? "disabled"
                  : ""
              }
            >
              {Object.keys(dep).map(i => (
                <option key={dep[i]} value={dep[i]}>
                  {customData[0][dep[i]]}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="clearfix visible-xs"></div> */}
          <div className="form-group col-xs-6 col-sm-3">
            {/* <label htmlFor="formS">Year Select:</label> */}
            <label htmlFor="formS">年級:</label>
            <select
              className="form-control form-control"
              id="formS"
              onChange={onChange}
              value={formValue.formS}
              disabled={
                dis === 2 || dis === 3 || dis === 4 || dis === 6
                  ? "disabled"
                  : ""
              }
            >
              {/* {Object.keys(classLevel).map(i => <option key={classLevel[i]} value={classLevel[i]}>{i}</option>)} */}
              {[
                "",
                "1年級",
                "2年級",
                "3年級",
                "4年級",
                "5年級",
                "6年級",
                "7年級"
              ].map((e, i) => (
                <option key={i} value={i > 0 ? i : ""}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-xs-6 col-sm-3">
            {/* <label htmlFor="class1">Class Select:</label> */}
            <label htmlFor="class1">班級:</label>
            <select
              className="form-control form-control"
              id="class1"
              onChange={onChange}
              value={formValue.class1}
              disabled={
                dis === 2 || dis === 3 || dis === 4 || dis === 6
                  ? "disabled"
                  : ""
              }
            >
              {Object.keys(classLevel).map(i => (
                <option key={classLevel[i]} value={classLevel[i]}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="form-group col">
            {/* <label htmlFor="serialNo">Serial Number</label> */}
            <label htmlFor="serialNo">開課序號</label>
            <input
              type="text"
              className="form-control"
              id="serialNo"
              placeholder="(e.g. 2653)"
              onChange={onChange}
              value={formValue.serialNo}
            />
          </div>
          <div className="form-group col">
            {/* <label htmlFor="generalCore">Field Category:</label> */}
            <label htmlFor="generalCore">通識課程類別:</label>
            <select
              className="form-control form-control"
              id="generalCore"
              onChange={onChange}
              value={formValue.generalCore}
              disabled={dis !== 2 ? "disabled" : ""}
            >
              {/* {Object.keys(classLevel).map(i => <option key={classLevel[i]} value={classLevel[i]}>{i}</option>)} */}
              {[
                "",
                "藝術與美感",
                "哲學思維與道德推理",
                "公民素養與社會探究",
                "歷史與文化",
                "數學與科學思維",
                "科學與生命",
                "一般通識",
                "所有通識"
              ].map((e, i) => (
                <option key={i} value={i > 0 ? i : ""}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>

        {timeShow ? (
          <Timeselect
            setTimeList={i => {
              setTimeList(i);
            }}
          />
        ) : (
          <p></p>
        )}
        <button className="btn btn-primary btn-lg btn-block mb-5">
          Search...
        </button>
      </form>
    </React.Fragment>
  );
};

export default Form;
