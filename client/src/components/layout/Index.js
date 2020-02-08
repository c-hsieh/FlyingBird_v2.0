import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';

const Ap = (prop) => {
    return (<p>{prop.abc}</p>)
}
const Index = () => {
    

    return (
        <React.Fragment>
            <div className="container">
                <h1 className="  mt-5">NTNU Schedule of Course</h1>
                
                <p className="lead text-muted">
                    哈嘍～我是數學系謝長霖<a
                        href={'https://www.facebook.com/profile.php?viewas=100000686899395&privacy_source=timeline_gear_menu&entry_point=action_bar'} target="_blank"
                        target="button"
                        style={{ "font-size": "1.2em" }}
                    >
                        <i className="fab fa-facebook"></i></a>，由於選課網站不是很容易操作，所以做了一個選課搜尋網。希望大家能喜歡～
                </p>
                <h5 className="  mt-5">操作簡介：</h5>
                <p className="lead text-muted">
                    搜尋頁的搜尋方式與選課網雷同，比較特別的是：
                </p>
                <li className="lead text-muted">
                    選擇系所的旁邊多個 <input className="form-control w-25 d-inline " type="text" placeholder="Dept. Filter" />
                    ，輸入系所關鍵字能快速搜尋。
                </li>
                <li className="lead text-muted">
                    上方黃色按鈕 <button className="btn btn-warning btn-sm" type="button">Time Select</button> 按下後
                    會跑出時間表，可以滑鼠拖拉選取多個。
                </li>
                <li className="lead text-muted">
                    按下搜尋<button className="btn btn-primary btn-sm" type="button">Search...</button>
                    後，會跑出Data Table。
                </li>
                <li className="lead text-muted">
                    右上方<button type="button" className="btn btn-primary btn-sm" ><i className="far fa-check-circle"></i></button>
                    可以選取「欄」,右邊是分頁按鈕，下方有個搜尋
                    <input className="form-control w-25 d-inline mt-1" type="text" placeholder="Search..." />
                    可以搜尋全部的資料結果。
                </li>
                <li className="lead text-muted">
                    點擊Column Title可以<strong style={{ "color": "#000000" }}>排序</strong>
                </li>
                <li className="lead text-muted">
                    點擊每一欄資料會跑出更多Detial，且有個Ｇoogle關鍵字連結，可讓你快速搜尋評價。
                </li>
                <li className="lead text-muted">
                    <span className="badge badge-light">限修/選課人數 授權 </span> 那欄紅色
                    <span className="badge badge-danger">額滿</span> 顯示選課人數已額滿、
                    <span className="badge badge-warning">快滿</span> 顯示選課人數快額滿(剩下10以下)、
                    <span className="badge badge-success">很多</span> 顯示離限修人數還有一段距離。
                </li>
                <li className="lead text-muted">
                    最旁邊的愛心按鈕
                    <i className="fas fa-heart" style={{ "color": "red" }}></i>可以把自己喜歡的課程加到<strong style={{ "color": "#000000" }}>Like List</strong>
                    ，再藉由開課序號進到選課網進行選課
                </li>
                
                <div className="col d-flex justify-content-end">

                    <Link className="btn btn-primary" to="/search">
                        趕快試試~
                        <i className="fas fa-search"></i>
                    </Link>
                </div>
                <div className="col d-flex">
                    <a
                        href={'http://cos1.ntnu.edu.tw/AasEnrollStudent/LoginCheckCtrl?language=TW'} target="_blank"
                        target="button"
                        style={{ "font-size": "1.2em" }}
                    >
                        <i className="fas fa-link"></i>
                        學校選課連結   
                    </a>
                    <p>
                       {"    "}
                    </p>
                    <a
                        href={'http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/index.jsp'} target="_blank"
                        target="button"
                        style={{ "font-size": "1.2em" }}
                        className="ml-2"
                    >
                        <i className="fas fa-link"></i>
                        學校課程搜尋連結
                    </a>
                </div>

                <h5 className="  mt-5">建議與除錯：</h5>
                <li className="lead text-muted">
                    <button className="btn btn-warning btn-sm" type="button">Time Select</button>在最後要送出時在設定，且不要開關開關，會出錯....  
                    如果遇到不能使用請重新整理，再試一遍。
                </li>
                <li className="lead text-muted">
                    如果<strong style={{ "color": "#000000" }}>多次</strong>遇到
                    <span className="badge badge-danger">Error!</span>
                    {/* <div className="alert alert-danger d-inline mb-5 mt-2" role="alert">Error!</div> */}
                    ，可能是我跟學校連結的API掛掉，請連結
                    <Link className="btn btn-success btn-sm" to="/searchsim">
                        Simple Search
                        <i className="fas fa-search"></i>
                    </Link>這個使用。<strong style={{ "color": "#000000" }}>希望學校能給我穩定的API</strong>。
                </li>
                <li className="lead text-muted">
                    如果有其他問題歡迎連私密我
                    <a 
                    href={'https://www.facebook.com/profile.php?viewas=100000686899395&privacy_source=timeline_gear_menu&entry_point=action_bar'} target="_blank"
                    target="button"
                    style={{"font-size": "2em" }}
                    >
                        <i className="fab fa-facebook"></i></a>
                </li>
                <h5 className="  mt-5">未來：</h5>
                <p className="lead text-muted">
                    未來會希望能重網站登入學校課，並且在此加退選。如果有什麼建議的歡迎跟我說。
                </p>
                <br />
                
                
            </div>
        </React.Fragment>
    )
}
export default Index 