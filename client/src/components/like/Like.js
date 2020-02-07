import React, { useState, useEffect, useContext } from 'react'

import TimeSelect from '../search/TimeSelect'
const List = (prop) => {
    const { likeItem } = prop;
   
    return (
        <React.Fragment>
            <div className="col-md-6">
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5>{likeItem.chn_name}</h5>
                        <p className="card-text">
                            <strong>
                                <i className="fas fa-play" /> 時間/地點
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
                            href={`http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/SyllabusCtrl?year=${likeItem.acadm_year}&term=${likeItem.acadm_term}&courseCode=${likeItem.course_code}&deptCode=${likeItem.dept_code}`}
                            target="_blank"
                            role="button"
                        >
                            Detial
                        </a>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
const  Like = () => {
    const [likeList, setLikeList] = useState(localStorage.getItem('LikeList') ? JSON.parse(localStorage.getItem('LikeList')) : [])
    console.log("like")
    return (
        <React.Fragment>
            <h3 className="text-center mb-4">Like</h3>
            <div className="row">
                {likeList.map(item => (
                    <List key={item.serial_no} likeItem={item} />
                ))}
            </div>
            
        </React.Fragment>
    )
}



export default Like;