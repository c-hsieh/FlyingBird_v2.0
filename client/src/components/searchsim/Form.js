import React, { useState, useEffect, useContext } from 'react'
import customData from './listdep.json';
import { Context } from '../../context/context'
import Timeselect from './TimeSelect';
import { CSSTransitionGroup } from 'react-transition-group'

import './time.css'

const Form = (prop) => {
    const [depFilter, setDepFilter] = useState("");
    const [dep, setDep] = useState(Object.keys(customData[0]));
    const [SUBmit, setSUBmit] = useState(false);
    const [state, setState] = useContext(Context);

    const FormValueInite = {
        'acadmYear': '108',
        'acadmTerm': '2',
        'chn': "",
        'engTeach': "",
        'moocs': 'N',
        'remoteCourse': 'N',
        'digital': 'N',
        'adsl': 'N',
        'deptCode': "",
        // 'deptCode': 'SU40',
        'classCode': "",
        'teacher': "",
        'serial_number': "",
        'course_code': "",
        'language': 'chinese',
        'action': 'showGrid',
        'start': '0',
        'limit': '99999',
        'page': '1'
    }
    const [formValue, setFormValue] = useState(FormValueInite);
    // console.log(dep)

    const classLevel = {
        "": "",
        "甲班": "1",
        "乙班": "2",
        "丙班": "3",
        "丁班": "4",
        "大碩博合開": "7",
        "碩博合開": "8",
        "大碩合開": "9",
    };
    

    useEffect(() => {
        if(SUBmit){
            if (formValue.chn == "" && formValue.engTeach == "" && formValue.deptCode == "" 
                && formValue.classCode == "" && formValue.teacher == "" && formValue.serial_number == ""
                && formValue.course_code == ""){
                    console.log('emepty')
                    // alert = <p>Try again</p> 
                prop.setAlert(prop.alertFun('warning','Warning! ',' Please enter something...'))
                window.setTimeout(() => { prop.setAlert(null) }, 2500)
            }else{
                prop.handleBlock();
                console.log('formValue', formValue)
                console.log('FormValueInite', FormValueInite)
                console.log('get a submit')
                setState({ class_list: [], heading: "Searching" });
                // setState({ 
                //     ...state,
                //     ['class_list']: [] 
                // });
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValue)
                };
                fetch('/post', options).then(res => {
                    return res.json()
                }).then((j) => {
                    
                    if (j.err == undefined) {
                        if (j.length == 0) {
                            console.log(j.length)
                            setState({ class_list: [], heading: "Empty" })
                        }else{
                            setState({ class_list: j, heading: "Finish" })
                        }
                    }else {
                        setState({ class_list: [], heading: "Err" })
                    }

                    // console.log(j)

                })
                    .catch(err => {
                        console.error(err)
                    })
            }
            
            setSUBmit(false)
        }
    }, [formValue, alert])

    const setvalue = async(e) => {
        console.log("Hello", e.target.id)
        if (e.target.id === "engTeach") {
            setFormValue({
                ...formValue,
                [e.target.id]: e.target.checked === "on" ? "Y" : "N",
                ['course_code']: '',
                ['serial_number']: ''
            })
        } else if (e.target.id === "teacher" || e.target.id === "chn") {
            setFormValue({
                ...formValue,
                [e.target.id]: encodeURI(e.target.value),
                ['course_code']: '',
                ['serial_number']: ''
            })
        } else if (e.target.id === "formsubmit") {
            setFormValue({
                ...formValue,
                [e.target.id]: encodeURI(e.target.value)
            })
        }else {
            setFormValue({
                ...formValue,
                [e.target.id]: e.target.value,
                ['course_code']: '',
                ['serial_number']: ''
            })
        }
    }
    const findClass = async(e) => {

        e.preventDefault();
        setvalue(e)
        
        setSUBmit(true)
    }
    const onChangeFilter = (e) => {
        
        let depRes = Object.keys(customData[0]).filter(x => x.indexOf(e.target.value) > -1)
        setDep(depRes)

        setDepFilter(e.target.value);
        setFormValue({
            ...formValue,
            ["deptCode"]: customData[0][depRes[0]]
        })
    };
    // useEffect(() => {
    //     console.log('formValue', formValue)
    // }, [formValue])
    const onChange = (e) => {
        // setvalue(e)
        // console.log(e.target.id )
        if (e.target.id == 'course_code' || e.target.id == 'serial_number'){
            setFormValue({
                ...FormValueInite,
                [e.target.id]: e.target.value
            })
        }else{
            setvalue(e)
        }
        
        // console.log('e.target.value', e.target.value)
        // console.log('e.target.id', e.target.id)
    };
    // console.log(customData);
    const reSetasd = (e) => {
        e.preventDefault()
        setFormValue({
            ...FormValueInite
        })
        console.log(prop);
        
    }
    // let abc = alert
    console.log('alert', alert)
    // const ccc = (e) =>{
    //     e.preventDefault()
    //     return (<p>Hey success</p>)
    // }
    // useEffect(() => {
    //     console.log(alert)
    // })
    // window.setTimeout(() => {}, 2000)
    
    
    return (
        <React.Fragment>
            
            {/* {alert} */}
            
            <div className="row ">
                <div className="form-group col d-flex justify-content-end">
                    <button className="btn btn-primary btn-sm " onClick={reSetasd}>
                        Reset
                        </button>
                </div>
            </div>
            <form onSubmit={findClass} id="formsubmit">
                
                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="acadmYear">Acadm Year</label>
                        <input type="text" className="form-control" id="acadmYear" onChange={onChange} value={formValue.acadmYear} readOnly/>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="acadmTerm">Acadm Term</label>
                        <input type="text" className="form-control" id="acadmTerm" onChange={onChange} value={formValue.acadmTerm} readOnly/>
                    </div>
                </div>

                <div className="form-check" >
                    <input className="form-check-input" type="checkbox" onChange={onChange} checked={formValue.engTeach} id="engTeach" />
                    <label className="form-check-label" htmlFor="engTeach">
                        Coures taught in english
                    </label>
                </div>
                <div className="row">
                    <div className="form-group col-xs-7 col-sm-3 pr-sm-0 pr-xs-1" >
                        <label htmlFor="depFilter">Dept. Filter:</label>
                        <input type="text" className="form-control" id="acadmTerm" onChange={onChangeFilter} value={depFilter}/>
                    </div>
                    <div className="form-group col-xs-7 col-sm-3 pl-sm-0 pl-xs-1">
                        <label htmlFor="deptCode">Dept. Select:</label>
                        <select className="form-control select2 "id="deptCode" onChange={onChange} value={formValue.deptCode}>
                            {Object.keys(dep).map(i => <option key={customData[0][dep[i]]} value={customData[0][dep[i]]}>{dep[i]}</option>)}
                        </select>
                    </div>
                    <div className="clearfix visible-xs"></div>
                    <div className="form-group col-xs-7 col-sm-6">
                        <label htmlFor="classCode">Class Select:</label>
                        <select className="form-control form-control" id="classCode" onChange={onChange} value={formValue.classCode}>
                            {Object.keys(classLevel).map(i => <option key={classLevel[i]} value={classLevel[i]}>{i}</option>)}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="teacher">Teacher:</label>
                        <input type="text" className="form-control" id="teacher" placeholder="" onChange={onChange} value={decodeURI(formValue.teacher)}/>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="chn">Course Name</label>
                        <input type="text" className="form-control" id="chn" placeholder="" onChange={onChange} value={decodeURI(formValue.chn)}/>
                     </div>
                </div>
                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="serial_number">Serial Number</label>
                        <input type="text" className="form-control" id="serial_number" placeholder="" onChange={onChange} value={formValue.serial_number}/>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="course_code">Course Code</label>
                        <input type="text" className="form-control" id="course_code" placeholder="" onChange={onChange} value={formValue.course_code}/>
                    </div>
                </div>
                
                
                

                <button className="btn btn-primary btn-lg btn-block mb-5" >
                    Search...
                </button>
            </form>
            {/* <Timeselect /> */}

            
        </React.Fragment>
    )
}



export default Form;