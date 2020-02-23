import React, { useState, useEffect, useContext } from "react";

import { Context } from "../../flux/store";
import Form from "./Form";
import DataTable from "./DataTable";
import DataTableMedia from "./DataTableMedia";
import Spinner from "../layout/Spinner";
import { CSSTransitionGroup } from "react-transition-group";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import "./time.css";

const Search = () => {
  const { query } = useContext(Context);
  const [state, setState] = query;
  const { class_list, heading } = state;
  const [block, setBlock] = useState(true);
  const [alert, setAlert] = useState();
  const [size, setSize] = useState(window.innerWidth);
  // const [alert, setAlert] = useState();
  const [chi, setChi] = useState(<span></span>)

  // console.log('class_list', class_list)
  const handleBlock = () => {
    if (block === true) {
      setBlock(false);
    } else {
      setBlock(true);
    }
  };
  const alertFun = (art, str, text) => {
    return (
      <div className={`alert alert-${art}`} role="alert">
        <strong>{str}</strong> {text}
      </div>
    );
  };
  
  useEffect(() => {
    window.addEventListener("resize", () => {setSize(window.innerWidth); console.log('setSize')});
    if (class_list.length !== 0) {
      setBlock(false);
    }
  }, []);
  useEffect(() => {
    console.log("heading", heading);
    if (heading === "Inital") {
      setState({
        ...state,
        ['heading']: "Typing"
      });
    }
    if (heading === "Finish") {
      // DataTableMedia
      if (size > 750) {
        // chi = <DataTable />;
        setChi(<DataTable />);
      } else {
        // chi = <DataTableMedia />;
        setChi(<DataTableMedia />);
      }
    } else if (heading === "Searching") {
    //   chi = <Spinner />;
      setChi(<Spinner />);
    } else if (heading === "Err") {
      console.log("Please Try Again");
      handleBlock();
      // window.setTimeout(() => { handleBlock() }, 1000)
      // chi = <h1>Please Try Again</h1>
      setAlert(alertFun("danger", "Error! ", " Please try again..."));
      window.setTimeout(() => {
        setAlert(null);
      }, 2700);
    //   chi = undefined;
      setChi(<span></span>)
    } else if (heading === "Empty") {
      console.log("Result is Empty");
      handleBlock();
      // window.setTimeout(() => { handleBlock() }, 1000)
      // chi = <h1>Please Try Again</h1>
      setAlert(
        alertFun("warning", "Empty! ", " Result Is Empty. Please try again...")
      );
      window.setTimeout(() => {
        setAlert(null);
      }, 2700);
    //   chi = undefined;
      setChi(<span></span>);
    } else {
    //   chi = undefined;
      setChi(<span></span>);
    }
  }, [heading, size]);

  return (
    <React.Fragment>
      {/* {console.log(size)} */}
      <button
        className="btn btn-primary mb-3 mt-3"
        type="button"
        onClick={handleBlock}
      >
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
            <Form
              handleBlock={handleBlock}
              alertFun={alertFun}
              alert={alert}
              setAlert={setAlert}
            />
          </div>
        </CSSTransitionGroup>
      ) : (
        // <div className="" id="collapseFilter" style={{ "transition": "visibility 5s linear 5s, opacity 5s linear" }}>
        // <div className="card card-body" style={{ "transition": "visibility 5s linear 5s, opacity 5s linear" }}>
        //     <Form handleBlock={handleBlock} />
        // </div>
        // </div>
        <p></p>
      )}
      <br />
      <div>
        {chi}
        {/* {console.log('chi', chi)} */}

        {/* {console.log('abc', abc(heading))} */}
      </div>
    </React.Fragment>
  );
};

export default Search;
