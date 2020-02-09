import React, { useState, useEffect, useContext } from 'react'

import TimeSelect from '../search/TimeSelect'
const List = (prop) => {
    const { likeItem, del } = prop;
    

    return (
        <React.Fragment>
            <div className="col-md-6">
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <div className="row ">
                            <div class="col-sm-10 col-12">
                                <h5 className="float-left">{likeItem.chn_name}</h5>
                            </div>
                            <div class="col-sm-2 col-12">
                                <button type="button" className="btn btn-sm btn-warning float-right" id={likeItem.serial_no} onClick={e => del(e.target.id)} >Delete</button>
                            </div>
                            
                            {/* <div className="float-right">
                                <button type="button" className="btn btn-warning btn-sm ">Delete</button>
                            </div> */}
                        </div>
                        
                        <br/>
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
    // console.log("like")

    const del = async (code) => {
        // console.log(code, code)
        setLikeList(likeList.filter((li) => li.serial_no != code));
    }
    useEffect(() => {
        // console.log('likeList', likeList)
        localStorage.setItem('LikeList', JSON.stringify(likeList))
    }, [likeList])
    return (
        <React.Fragment>
            <h3 className="text-center mt-2 mb-4"><i className="fas fa-heart"></i>Like</h3>
            <div className="row">
                {/* {console.log('maplikeList', likeList)} */}
                {likeList.map(item => (
                    <List key={item.serial_no} likeItem={item} del={del}/>
                ))}
            </div>
            
        </React.Fragment>
    )
}



export default Like;