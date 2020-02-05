import React, { useState, useEffect } from "react";
// import axios from "axios";

export const Context = React.createContext();



export function ContextController({ children }) {
    let intialState = {
        class_list: [],
        heading: "Inital"
    };
    const [state, setState] = useState(intialState);

    console.log('state', state)
    

    // useEffect(() => {
        
    // }, []);

    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    );
}
