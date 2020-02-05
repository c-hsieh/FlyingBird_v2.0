import React, { useState, useEffect, useContext } from 'react'
import $ from "jquery";


import { Context } from '../../context/context'
import Form from './Form'
import DataTable from './DataTable'
import Spinner from '../layout/Spinner'

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';


const Search = () => {
    const [state, setState] = useContext(Context);
    const { class_list, heading } = state;
    let chi = undefined;
    
    console.log('class_list', class_list)
    console.log('heading', heading)
    // heading !== "Typing"
    useEffect(()=>{
        if (heading === "Inital"){
            setState({
                ...state,
                ['heading']: 'Typing'
            })
        }
    },[])
    useEffect(() => {
        
        chi = <DataTable />
    }, [class_list])
    if (heading === "Finish") {
        chi = <DataTable />
    }else if (heading === "Searching") {
        chi = <Spinner />
    }else {
        chi = undefined
    }
    return (
        <React.Fragment>
            <br />
            <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseFilter" aria-expanded="true" aria-controls="collapseFilter">
                    Filter
            </button>
            </p>
            <div className="collapse show" id="collapseFilter">
                <div className="card card-body">
                    <Form />
                </div>
            </div>
            <br />
            <div >
                {chi}
            </div>
        </React.Fragment>
    )

    
}



export default Search;