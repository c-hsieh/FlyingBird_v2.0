import React, {useState, useEffect} from "react";
import "./schedule.css";

const TableData = props => {
    const [size, setSize] = useState(window.innerWidth);
    const [divHeight, setDivHeight] = useState(0);

    useEffect(() => {
      window.addEventListener("resize", () => {
        setSize(window.innerWidth);
        // console.log("setSize");
      });
    }, []);

  const convertDay = weekDay => {
    // console.log("weekDay", weekDay);
    if (weekDay == "1") return "monday";
    else if (weekDay == "2") return "tuesday";
    else if (weekDay == "3") return "wednesday";
    else if (weekDay == "4") return "thursday";
    else if (weekDay == "5") return "friday";
    else if (weekDay == "6")return "saturday";
    else return null;
  };

  const convertStartTime = start_time => {
    if (start_time === "0") return "eightThirty";
    else if (start_time === "1") return "nineOclock";
    else if (start_time === "2") return "nineThirty";
    else if (start_time === "3") return "tenOclock";
    else if (start_time === "4") return "tenThirty";
    else if (start_time === "5") return "elevenOclock";
    else if (start_time === "6") return "elevenThirty";
    else if (start_time === "7") return "twelveOclock";
    else if (start_time === "8") return "twelveThirty";
    else if (start_time === "9") return "oneOclock";
    else if (start_time === "10") return "oneThirty";
    else if (start_time === "11") return "twoOclock";
    else if (start_time === "12") return "twoThirty";
    else if (start_time === "13") return "threeOclock";
    else if (start_time === "14") return "threeThirty";
    else if (start_time === "15") return "fourOclock";
    else return null;
  };

  const convertEndTime = end_time => {
    
    if (end_time === "0") return "endEightThirty";
    else if (end_time === "1") return "endNineOclock";
    else if (end_time === "2") return "endNineThirty";
    else if (end_time === "3") return "endTenOclock";
    else if (end_time === "4") return "endTenThirty";
    else if (end_time === "5") return "endElevenOclock";
    else if (end_time === "6") return "endElevenThirty";
    else if (end_time === "7") return "endTwelveOclock";
    else if (end_time === "8") return "endTwelveThirty";
    else if (end_time === "9") return "endOneOclock";
    else if (end_time === "10") return "endOneThirty";
    else if (end_time === "11") return "endTwoOclock";
    else if (end_time === "12") return "endTwoThirty";
    else if (end_time === "13") return "endThreeOclock";
    else if (end_time === "14") return "endThreeThirty";
    else if (end_time === "15") return "endFourOclock";
  };


  if (props.day !== null) {
    const tableDataMainStyle = {
      backgroundColor: props.color,
      fontSize: "14px"
    };
    

    if (props.display === props.id) {
        // {console.log("display",typeof props.display);}
      return (
        <div
          className={`courseElement ${convertDay(props.day)}
          ${convertStartTime(props.startTime)} 
          ${convertEndTime(props.endTime)}`}
          onMouseOver={props.onMouseOver}
          onMouseLeave={props.onMouseLeave}
          onClick={props.onClick}
        >
          <div class="card shadow tableElement" style={tableDataMainStyle}>
            {/* <div class="card-header" style={{ fontSize: "1em" }}>
              {props.course.chn_name}
            </div> */}
            {/* style={{ padding: "4px" }} */}
            <div class="card-body p-2">
              <p
                className="card-text"
                // style={{ textAlign: "left", fontSize: "0.6em" }}
                style={
                  size > 800
                    ? { textAlign: "left", fontSize: "1em" }
                    : { textAlign: "left", fontSize: "0.6em" }
                }
              >
                <strong>
                  <i className="fas fa-play float-left" /> 時間/地點
                </strong>
                : {props.course.time_inf}
                <br />
                <strong>
                  <i className="fas fa-compact-disc" /> 課程代碼
                </strong>
                : {props.course.serial_no}
              </p>
            </div>
            {/* <button className="btn btn-warning btn-sm mx-auto mt-auto" type="button">
              Hello
            </button> */}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`courseElement ${convertDay(props.day)}
          ${convertStartTime(props.startTime)} 
          ${convertEndTime(props.endTime)}`}
          onMouseOver={props.onMouseOver}
          onMouseLeave={props.onMouseLeave}
          onClick={props.onClick}
          ref={el => {
            // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
            if (!el) return;

            // console.log("www", el.getBoundingClientRect().height); // prints 200px
            setDivHeight(el.getBoundingClientRect().height);
          }}
        >
          {/* <div className="tableElement"></div> */}
          {/* <div style={tableDataMainStyle} className="tableElement">
            {props.course} <br />
            {props.startTime} to {props.endTime}
          </div> */}
          <div class="card  tableElement" style={tableDataMainStyle}>
            {/* <div
              class="card-header "
              style={{ fontSize: "1em", padding: "1px" }}
            ></div> */}

            <h5
              class="card-title"
              style={size > 800 ? { fontSize: "1.3em" } : { fontSize: "0.8em" }}
            >
              {props.course.chn_name}
            </h5>
            {/* <div className="row ">
                  <div>

                  </div>
              </div> */}
            {size > 800 & divHeight > 80? (
              <div class="card-body p-1 pt-1" >
                <p
                  className="card-text"
                  style={{ textAlign: "left", fontSize: "1em" }}
                >
                  <strong>
                    <i className="fas fa-play float-left" /> 時間/地點
                  </strong>
                  : {props.course.time_inf}
                  <br />
                  <strong>
                    <i className="fas fa-compact-disc" /> 課程代碼
                  </strong>
                  : {props.course.serial_no}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
};

export default TableData;
