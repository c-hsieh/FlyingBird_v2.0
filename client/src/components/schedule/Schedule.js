import React, { useState, useEffect, useContext } from "react";
// import Title from "./Title";
import { Context } from "../../flux/store";
import TableData from "./TableData";
import {
  getLikes
} from "../../flux/actions/likeActions";
import "./schedule.css";

const MyCourses =  () =>{
    const { query, dispatch, auth, error, like } = useContext(Context);
  const [courses, setCourses] = useState([])
  const [display, setDisplay] = useState(null)
  const [color, setColor] = useState({})
  const [courseBlock, setCourseBlock] = useState([])
  const [emptyBox, setEmptyBox] = useState(75);
  const colorPalettes = [
    "#3ec1d3",
    "#2eb872",
    "#ffe75e",
    "#ff9a00",
    "#3366CC",
    "#ff165d",
    "#e1f2fb",
    "#3399FF",
    "#2DFF65",
    "#a3de83",
    "#f688bb",
    "#FFBD21",
    "#2095F2"
  ];
//   const [likeList, setLikeList] = useState(like.likes);
// like.likes
  const dealSession = (s) => {
    if (s == "A") {
      return 11;
    } else if (s == "B") {
      return 12;
    } else if (s == "C") {
      return 13;
    } else if (s == "D") {
      return 14;
    }else{
      return s
    }
  }
  
  const coverToNum = (w) => {
    if (w === "一") {
      return 1;
    } else if (w === "二") {
      return 2;
    } else if (w === "三") {
      return 3;
    } else if (w === "四") {
      return 4;
    } else if (w === "五") {
      return 5;
    } else if (w === "六") {
      return 6;
    }
  }
    useEffect(() => {
      if (auth.user === null) {
        // console.log("auth.token", auth.token);
      } else if (like.initial===false) {
        (async function banana() {
          await getLikes(auth.user.email, dispatch, auth.token);
          
          // console.log("like.likes", like.likes);
        })();
      }
    //   setLikeList(like.likes);
    }, [auth, like.likes]);

  useEffect(() => {
    let courseBlock = [];
    let emptyBoxNum = 90
    console.log("settimes");
    like.likes.forEach(item => {
        if(item.isJoin === true){
            let times = item.time_inf.split(", ");
            let color = colorPalettes[parseInt(item.serial_no) % 13];
            times.map(async itemT => {
              let sessionBlock = item;
              let time = itemT.split(" ");
              let week = coverToNum(time[0]);
              let timeSession = time[1].split("-");
              // let timeSession0 = timeSession[0]; //toNumber
              let timeSession0 = dealSession(timeSession[0]); //toNumber
              let timeSession1 = dealSession(timeSession[timeSession.length - 1]); //toNumber
              emptyBoxNum = emptyBoxNum - (timeSession1 - timeSession0 + 1);
              //   console.log(time, week, timeSession);
              sessionBlock = {
                ...sessionBlock,
                ["week"]: week,
                ["timeSession0"]: timeSession0,
                ["timeSession1"]: timeSession1,
                ["color"]: color
              };
              //   console.log("sessionBlock", sessionBlock);
              courseBlock.push(sessionBlock);
            });
        }
    });
     setCourseBlock(courseBlock);
     setEmptyBox(emptyBoxNum);
    console.log("courseBlock", courseBlock);
  }, [like.likes]);
  

 

  

  const onTableMouseOver = id => {
    const thisDisplay = courseBlock.filter(course => course.serial_no === id)[0]
      .serial_no;
    setDisplay(thisDisplay);
  };

  const onTableMouseLeave = () => {
    setDisplay("x")
  };

  

  
    return (
      <>
        {auth.isAuthenticated ? null : (
          <h2
            className="text-center mt-2 md-2 "
            style={{ color: "#d6d6d6", verticalAlign: "middle" }}
          >
            Please Login.....
          </h2>
        )}
        <div className="myCourses">
          <div className="timetable">
            <section className="timeWrapper">
              {[
                "00<br/>07:10 - 08:00",
                "01<br/>08:10 - 09:00",
                "02<br/>09:10 - 10:00",
                "03<br/>10:20 - 11:10",
                "04<br/>11:20 - 12:10",
                "05<br/>12:20 - 13:10",
                "06<br/>13:20 - 14:10",
                "07<br/>14:20 - 15:10",
                "08<br/>15:30 - 16:20",
                "09<br/>16:30 - 17:20",
                "10<br/>17:30 - 18:20",
                "A<br/>18:40 - 19:30",
                "B<br/>19:35 - 20:25",
                "C<br/>20:30 - 21:20",
                "D<br/>21:25 - 22:15"
              ].map(i => (
                <div className="timeWrapperDIV">
                  <div
                    className="timeWrapperDIVDIV"
                    dangerouslySetInnerHTML={{ __html: i }}
                  ></div>
                </div>
              ))}
            </section>
            <section className="titleWrapper">
              <div className="titleWrapperDIV timeColumn">
                <p className="titleWrapperP">TIME</p>
              </div>
              {/* <p>TIME</p> */}
              {[
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY"
              ].map(i => (
                <div className="titleWrapperDIV">
                  <p className="titleWrapperP">{i}</p>
                </div>
              ))}
            </section>
            {[...Array(emptyBox).keys()].map(i => (
              <div className="gridBox"></div>
            ))}
            {/* {console.log("emptyBox", emptyBox)} */}
            {courseBlock.map(course => (
              <TableData
                key={course.serial_no}
                id={course.serial_no}
                color={course.color}
                course={course}
                //   type={course.Type}
                day={course.week}
                startTime={course.timeSession0.toString()}
                endTime={course.timeSession1.toString()}
                //   room={course.Room}
                onMouseOver={() => onTableMouseOver(course.serial_no)}
                onMouseLeave={onTableMouseLeave}
                onClick={() => onTableMouseOver(course.serial_no)}
                display={display}
              />
            ))}
          </div>
        </div>
      </>
    );
  
}

export default MyCourses;
