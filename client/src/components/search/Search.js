import React, { useState, useEffect, useContext } from 'react'
import $ from "jquery";


import { Context } from '../../context/context'
import Form from './Form'
import DataTable from './DataTable'
import DataTableMedia from './DataTableMedia'
import Spinner from '../layout/Spinner'
import { CSSTransitionGroup } from 'react-transition-group'

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import './time.css'

const Search = () => {
    const [state, setState] = useContext(Context);
    const { class_list, heading } = state;
    const [ block, setBlock ] = useState(true);
    const [alert, setAlert] = useState();
    const [size, setSize] = useState(window.innerWidth);
    // const [alert, setAlert] = useState();
    let chi = undefined;

    // console.log('class_list', class_list)
    console.log('heading', heading)
    const handleBlock = () => {
        if (block == true) {
            setBlock(false)
        } else {
            setBlock(true)
        }
    }
    const alertFun = (art, str, text) => {
        return (
            <div className={`alert alert-${art}`} role="alert">
                <strong>{str}</strong> {text}
            </div>
        )
    }
    // heading !== "Typing"
    useEffect(() => {
        if (heading === "Inital") {
            setState({
                ...state,
                ['heading']: 'Typing'
            })
        }
        window.addEventListener("resize", updateSize);
        // console.log('class_list', class_list.lenth)
        if (class_list.length != 0){
            setBlock(false)
        }
    }, [])
    const updateSize = ()=>{
        // console.log(window.innerWidth)
        // size = window.innerWidth
        setSize(window.innerWidth)
    }
    
    // const abc = (heading) => {
    //     if (heading === "Finish") {
    //         chi = <DataTable />
    //     } else if (heading === "Searching") {
    //         chi = <Spinner />
    //     } else if (heading === "Err") {
    //         console.log('Please Try Again')
    //         chi = <p>Please Try Again</p>
    //     } else {
    //         console.log('sfwfewfwe Try Again')
    //         chi = undefined
    //     }
    //     return(chi)
    // }
    if (heading === "Finish") {
        // DataTableMedia
        if (size > 750){
            chi = <DataTable />
        }else{
            chi = <DataTableMedia />
        }
    }else if (heading === "Searching") {
        chi = <Spinner />
    } else if (heading === "Err") {
        // console.log('Please Try Again')
        // handleBlock()
        // window.setTimeout(() => { handleBlock() }, 1000)
        // chi = <h1>Please Try Again</h1>
        chi = undefined
    }else {
        chi = undefined
    }
    useEffect(() => {
        if (heading === "Err") {
            console.log('Please Try Again')
            handleBlock()
            // window.setTimeout(() => { handleBlock() }, 1000)
            // chi = <h1>Please Try Again</h1>
            setAlert(alertFun('danger', 'Error! ', ' Please try again...'))
            window.setTimeout(() => { setAlert(null) }, 2700)
            chi = undefined
        } else if (heading === "Empty") {
            console.log('Result is Empty')
            handleBlock()
            // window.setTimeout(() => { handleBlock() }, 1000)
            // chi = <h1>Please Try Again</h1>
            setAlert(alertFun('warning', 'Empty! ', ' Result Is Empty. Please try again...'))
            window.setTimeout(() => { setAlert(null) }, 2700)
            chi = undefined
        }else {
            chi = undefined
        }
        
    }, [heading])


    return (
        <React.Fragment>
            {/* <br /> */}
            {/* {console.log(size)} */}
            <button className="btn btn-primary mb-3 mt-3" type="button"  onClick={handleBlock}>
                Filter
            </button>
            {alert}
            {block ? (
                // 
                <CSSTransitionGroup
                    transitionName="formblock"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    >
                    <div className="card card-body">
                        <Form handleBlock={handleBlock} alertFun={alertFun} alert={alert} setAlert={setAlert}/>
                    </div>
                </CSSTransitionGroup>
                // <div className="" id="collapseFilter" style={{ "transition": "visibility 5s linear 5s, opacity 5s linear" }}>
                // <div className="card card-body" style={{ "transition": "visibility 5s linear 5s, opacity 5s linear" }}>
                //     <Form handleBlock={handleBlock} />
                // </div>
                // </div>
            ) : (
                    <p></p>
                )}
            <br />
            <div >
                {chi}
                {/* {console.log('chi', chi)} */}
                
                {/* {console.log('abc', abc(heading))} */}
            </div>
            

        </React.Fragment>
    )


}



export default Search;