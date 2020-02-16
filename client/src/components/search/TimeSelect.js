import React, { useState, useEffect, useContext } from 'react'


import Selection from '@simonwep/selection-js/dist/selection.min.js'

import './time.css';
const Timeselect = (prop) => {
    const [selection, setSelection] = useState(Selection.create({

        // Class for the selection-area
        class: 'selection',

        // All elements in this container can be selected
        selectables: ['.box-wrap > div.table'],

        // The container is also the boundary in this case
        boundaries: ['.box-wrap']
    }))
    useEffect(() => {
        // Initialize selectionjs
        // const selection = Selection.create({

        //     // Class for the selection-area
        //     class: 'selection',

        //     // All elements in this container can be selected
        //     selectables: ['.box-wrap > div'],

        //     // The container is also the boundary in this case
        //     boundaries: ['.box-wrap']
        // })
        selection.on('start', ({ inst, selected, oe }) => {

            // Remove class if the user isn't pressing the control key or ⌘ key
            // if (!oe.ctrlKey && !oe.metaKey) {

            //     // Unselect all elements
            //     for (const el of selected) {
            //         el.classList.remove('selected');
            //         inst.removeFromSelection(el);
            //     }

            //     // Clear previous selection
            //     inst.clearSelection();
            // }

        }).on('move', ({ changed: { removed, added } }) => {

            // console.log("added", added);
            // console.log("removed", removed);

            // Add a custom class to the elements that where selected.
            for (const el of added) {
                // console.log("added", el.classList)
                // console.log("?", el.classList.value.includes('selected'))
                if (el.classList.value.includes('selected')) {

                    // console.log("T")
                    el.classList.remove('selected');
                } else {
                    el.classList.add('selected');
                }
                // el.classList.add('selected');
            }
            // console.log(document.getElementsByName("1233"))

            // Remove the class from elements that where removed
            // since the last selection
            for (const el of removed) {
                // console.log("removed", el.classList.value)
                // console.log("?", el.classList.value.includes('selected'))
                if (el.classList.value.includes('selected')) {

                    // console.log("T")
                    el.classList.remove('selected');
                } else {
                    el.classList.add('selected');

                };
            }

        }).on('stop', ({ inst }) => {
            inst.keepSelection();
            // console.log('inst', inst)
            // setSelection(inst)
            let se = []
            inst.h.forEach((value, i) => {
                if (value.className == "table selected") {
                    // console.log(i)
                    
                    let c = (Math.floor(i / 6)).toString()
                    let w = ((i % 6) + 1).toString()
                    // console.log('w: ', w, 'c: ', c);
                    se.push("checkWkSection".concat(w).concat(c))
                    
                    // se.push(i)
                }
                
                // console.log(value.className, i)
            });
            // console.log(se)
            prop.setTimeList(se)
            return(()=>{
                prop.setTimeList([])
            })
        });
        // selection.on('stop', evt => {
        //     // for (i of evt.inst.h){
        //     //     console.log(i.className);
        //     // }
        //     let se = []
        //     evt.inst.h.forEach((value, i) => {
        //         if (value.className == "table selected") {
        //             // console.log(i)
        //             se.push(i)
        //         }
        //         // console.log(value.className, i)
        //     });
        //     console.log("select", se)
        //     // console.log("HH")
        //     // console.log('stop', evt.inst.h);
        // })
        // return(()=>{
        //     setSelection(null)
        // })
        return(()=>{})
    }, [])
    // console.log("TimeSelect Hello")
    return (
        <>
            <main>
                <section className="demo">
                    <section className="box-wrap boxes blue">

                        <div></div>
                        <div className="colrow">星期一(MON)</div>
                        <div className="colrow">星期二(TUE)</div>
                        <div className="colrow">星期三(WED)</div>
                        <div className="colrow">星期四(THU)</div>
                        <div className="colrow">星期五(FRI)</div>
                        <div className="colrow">星期六(SAT)</div>
                        <div className="colrow">00<br />07:10 - 08:00</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">01<br />08:10 - 09:00</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">02<br />09:10 - 10:00</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">03<br />10:20 - 11:10</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">04<br />11:20 - 12:10</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <hr style={{
                            color: '#43435e',
                            backgroundColor: '#43435e',
                            height: .2
                        }} />
                        <hr style={{
                            color: '#43435e',
                            backgroundColor: '#43435e',
                            height: .2
                        }} />
                        <hr style={{
                            color: '#43435e',
                            backgroundColor: '#43435e',
                            height: .2
                        }} />
                        <hr style={{
                            color: '#43435e',
                            backgroundColor: '#43435e',
                            height: .2
                        }} />
                        <hr style={{
                            color: '#43435e',
                            backgroundColor: '#43435e',
                            height: .2
                        }} />
                        <hr style={{
                            color: '#43435e',
                            backgroundColor: '#43435e',
                            height: .2
                        }} />
                        <hr style={{
                            color: '#43435e',
                            backgroundColor: '#43435e',
                            height: .2
                        }} />
                        <div className="colrow">05<br />12:20 - 13:10</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">06<br />13:20 - 14:10</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">07<br />14:20 - 15:10</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">08<br />15:30 - 16:20</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">09<br />16:30 - 17:20</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">10<br />17:30 - 18:20</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">A<br />18:40 - 19:30</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">B<br />19:35 - 20:25</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">C<br />20:30 - 21:20</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="colrow">D<br />21:25 - 22:15</div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                        <div className="table"></div>
                    </section>
                </section>
            </main>


        </>
    )
}
export default Timeselect;
