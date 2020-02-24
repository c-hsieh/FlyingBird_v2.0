import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../../flux/store";
import { getLikes, deleteALLLike } from "../../flux/actions/likeActions";

const List = (prop) => {
    const { likeItem, del } = prop;
    // console.log(prop.prevPath)
    

    return (
      <React.Fragment>
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="row ">
                <div class="col-sm-8 col-10">
                  <h5 className="float-left" style={{ "font-size": "1.5em" }}>
                    {likeItem.chn_name.split("</br>")[0]}
                  </h5>
                </div>
                <div class="col-sm-2 col-8">
                  <button
                    type="button"
                    className={
                      likeItem.isJoin
                        ? "btn btn-sm   btn-success float-right mr-2"
                        : "btn btn-sm   btn-secondary float-right mr-2"
                    }
                    // style={
                    //   likeItem.isJoin
                    //     ? { backgroundColor: "#00FF00", borderColor: "#64fa64" }
                    //     : { backgroundColor: "#98999B", borderColor: "#64fa64" }
                    // }
                    id={likeItem.serial_no}
                    // onClick={e => del(e.target.id)}
                  >
                    Join
                  </button>
                </div>
                <div class="col-sm-2 col-8 ">
                  <button
                    type="button"
                    className="btn btn-sm btn-warning float-right"
                    id={likeItem.serial_no}
                    onClick={e => del(e.target.id)}
                  >
                    Delete
                  </button>
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
              <a
                className="btn btn-dark btn-block"
                href={`http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/SyllabusCtrl?year=${likeItem.acadm_year}&term=${likeItem.acadm_term}&courseCode=${likeItem.course_code}&courseGroup=&deptCode=${likeItem.dept_code}&formS=&classes1=&deptGroup=`}
                rel="noopener noreferrer"
                target="_blank"
                role="button"
              >
                Detial
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}
const Like = () => {
  const { query, dispatch, auth, error, like } = useContext(Context);
  // const [likeList, setLikeList] = useState(
  //   localStorage.getItem("LikeList")
  //     ? JSON.parse(localStorage.getItem("LikeList"))
  //     : []
  // );
  const [likeList, setLikeList] = useState(like.likes);

  // console.log("like")

  const del = async code => {
    // console.log(code, code)
    setLikeList(likeList.filter(li => li.serial_no !== code));
  };
  useEffect(() => {
    // console.log('likeList', likeList)
    localStorage.setItem("LikeList", JSON.stringify(likeList));
  }, [likeList]);

  useEffect(() => {
    if (auth.user === null) {
      console.log("auth.token", auth.token);
    } else if(like.initial===false) {
      getLikes(auth.user.email, dispatch, auth.token);
      console.log("Email", auth.user.email);
    }
    
    // getLikes(auth.user.email, dispatch, auth.token);
  }, [auth]);
  useEffect(()=>{
    setLikeList(like.likes);
  },[like])
  return (
    <React.Fragment>
      {console.log("likeList", likeList)}
      <h3 className="text-center mt-2 mb-4">
        <i className="fas fa-heart"></i>Like
      </h3>
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
        {likeList.map(item => (
          <List key={item.serial_no} likeItem={item} del={del} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Like;