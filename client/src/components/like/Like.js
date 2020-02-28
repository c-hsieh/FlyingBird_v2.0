import React, { useState, useEffect, useContext, useCallback } from "react";
import { Context } from "../../flux/store";
import {
  getLikes,
  deleteALLLike,
  setJoin,
  deleteLike
} from "../../flux/actions/likeActions";
import { useAlert } from "react-alert";

const List = (prop) => {
    const { likeItem, del, toSetJoin } = prop;
    // console.log(prop.prevPath)
    

    return (
      <React.Fragment>
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="row ">
                <div class="col-sm-8 col-8">
                  {/* <h5 className="float-left" style={{ "fontSize": "1.2em" }}> */}
                  {/* {console.log("likeItem", likeItem)} */}
                  {/* {likeItem.chn_name.toString().split("</br>")[0]} */}
                  {/* </h5> */}
                  <a
                    // className="btn btn-dark btn-block"
                    href={`http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/SyllabusCtrl?year=${likeItem.acadm_year}&term=${likeItem.acadm_term}&courseCode=${likeItem.course_code}&courseGroup=&deptCode=${likeItem.dept_code}&formS=&classes1=&deptGroup=`}
                    rel="noopener noreferrer"
                    style={{ "fontSize": "1em" }}
                    target="_blank"
                    role="button"
                  >
                    {likeItem.chn_name.toString().split("</br>")[0]}
                  </a>
                </div>

                {/* <div className="float-right">
                                <button type="button" className="btn btn-warning btn-sm ">Delete</button>
                            </div> */}
              </div>

              <br />
              <p className="card-text">
                <strong>
                  <i className="fas fa-play float-left" /> 時間/地點
                </strong>
                : {likeItem.time_inf}
                <br />
                <strong>
                  <i className="fas fa-compact-disc" /> 課程代碼
                </strong>
                : {likeItem.serial_no}
              </p>
              {/* <Link
                            to={`lyrics/track/${track.track_id}`}
                            className="btn btn-dark btn-block"
                        >
                            <i className="fas fa-chevron-right" /> View Lyrics
                        </Link> */}
              <div className="row ">
                <div class="col-sm-6 col-6">
                  <button
                    type="button"
                    className={
                      likeItem.isJoin
                        ? "btn btn-sm btn-success btn-block"
                        : "btn btn-sm btn-secondary btn-block"
                    }
                    // float-right mr-1
                    // style={
                    //   likeItem.isJoin
                    //     ? { backgroundColor: "#00FF00", borderColor: "#64fa64" }
                    //     : { backgroundColor: "#98999B", borderColor: "#64fa64" }
                    // }
                    id={likeItem.serial_no}
                    onClick={e => {
                      e.preventDefault();
                      toSetJoin(likeItem.serial_no, !likeItem.isJoin, likeItem.time_inf);
                    }}
                  >
                    Join
                  </button>
                </div>
                <div class="col-sm-6 col-6 ">
                  <button
                    type="button"
                    className="btn btn-sm btn-warning btn-block"
                    id={likeItem.serial_no}
                    onClick={e => del(e.target.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}
const Like = () => {
  const { query, dispatch, auth, error, like } = useContext(Context);
  const [likeList, setLikeList] = useState(like.likes);
  const [joinCourse, setJoinCourse] = useState([]);
  const alert = useAlert();

  // console.log("like")
  // const toSetJoin = useCallback((serial_no, isJoin) => {
    
  // });
  const dealSession = s => {
    if (s == "A") {
      return 11;
    } else if (s == "B") {
      return 12;
    } else if (s == "C") {
      return 13;
    } else if (s == "D") {
      return 14;
    } else {
      return s;
    }
  };
  const coverToNum = w => {
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
  };
  const toSetJoin = (serial_no, isJoin, time_inf) => {
    // console.log("toSetJoin");
    // console.log("isJoin: ", isJoin);
    
    if (isJoin===true) {
      let joinCourseArr = [];
      let times = time_inf.split(", ");
      times.map(itemT => {
        
        // let sessionBlock = item;
        let time = itemT.split(" ");
        let week = (coverToNum(time[0]) - 1) * 15;
        let timeSession = time[1].split("-");
        let timeSession0 = dealSession(timeSession[0]); //toNumber
        let timeSession1 = dealSession(timeSession[timeSession.length - 1]); //toNumber
        console.log("qwqw", timeSession0);
        [...Array(timeSession1 - timeSession0 + 1).keys()].map(i =>
          joinCourseArr.push(
            parseInt(week) + parseInt(timeSession0) + parseInt(i)
          )
        );
      });
      let abc = joinCourseArr.some(ele => joinCourse.some(e=>e===ele));
      if(!abc){
        setJoin(auth.user.email, serial_no, isJoin, dispatch, auth);
      }else{
        console.log("Exists")
        alert.show("Time conflicts!");
      }
    }else{
      setJoin(auth.user.email, serial_no, isJoin, dispatch, auth);
    }

   
  }

  const del =  code => {
    // console.log(code, code)
    deleteLike(auth.user.email, code, dispatch, auth);
    // setLikeList(likeList.filter(li => li.serial_no !== code));

  };

  useEffect(() => {
    if (auth.user === null) {
      console.log("auth.token", auth.token);
    } else if(like.initial===false) {
      (async function banana() {
        await getLikes(auth.user.email, dispatch, auth.token);
        setLikeList(like.likes);
      })();
    }
  }, [auth]);
  useEffect(() => {
    let joinCourseArr = [];
    like.likes.forEach(item => {
      if (item.isJoin === true) {
        let times = item.time_inf.split(", ");
        times.map(itemT => {
          // let sessionBlock = item;
          let time = itemT.split(" ");
          let week = (coverToNum(time[0])-1)*15;
          let timeSession = time[1].split("-");
          let timeSession0 = dealSession(timeSession[0]); //toNumber
          let timeSession1 = dealSession(timeSession[timeSession.length - 1]); //toNumber
          console.log("qwqw", timeSession0);
          [...Array(timeSession1 - timeSession0 + 1).keys()].map(i =>
            joinCourseArr.push(
              parseInt(week) + parseInt(timeSession0) + (parseInt(i))
            )
          );
        });
      }
    });
    console.log("joinCourseArr", joinCourseArr);
    setJoinCourse(joinCourseArr);
  }, [like.likes]);

  return (
    <React.Fragment>
      {console.log("likeList", likeList)}
      {auth.isAuthenticated ? (
        <h3 className="text-center mt-2 mb-4">
          <i className="fas fa-heart"></i>Like
        </h3>
      ) : (
        <h2
          className="text-center mt-5 "
          style={{ color: "#d6d6d6", verticalAlign: "middle" }}
        >
          Please Login.....
        </h2>
      )}

      {likeList.length !== 0 ? (
        <div className="row mt-2 md-2">
          <div className="form-group col d-flex justify-content-end">
            <button
              className="btn btn-warning btn-sm mr-1"
              onClick={e => {
                e.preventDefault();
                setLikeList([]);
                // localStorage.removeItem("LikeList");
                deleteALLLike(auth.user.email, dispatch, auth);
              }}
              type="button"
            >
              Clear All
            </button>
            {/* <Link className="btn btn-primary btn-sm" to="/searchsim">
                            Clear All
                            <i className="fas fa-search"></i>
                        </Link> */}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="row">
        {/* {console.log('maplikeList', likeList)} */}
        {like.likes.map(item => (
          <List
            key={item.serial_no}
            likeItem={item}
            del={del}
            toSetJoin={toSetJoin}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Like;