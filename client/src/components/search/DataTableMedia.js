import React, { useState, useEffect, useContext } from 'react'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

import { Context } from '../../context/context'
import Spinner from '../layout/Spinner'

import selectpicker from 'bootstrap-select/dist/js/bootstrap-select'

const { SearchBar } = Search;
const formatterChnName = (cell, row) => {
    // console.log('cell', cell)
    // console.log('row', row)

    const sp = cell.split('</br>')
    // const jo = sp.join(`</br >`)
    return (
        <span>
            <span class="badge badge-secondary" style={{ fontSize: "0.5em" }}>{row.serialNo}</span><br/>
            <a href={`http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/SyllabusCtrl?year=${row.acadmYear}&term=${row.acadmTerm}&courseCode=${row.courseCode}&deptCode=${row.deptCode}`} target="_blank"><strong>{sp[0]}</strong></a>
            <br />
            <span class="badge badge-pill badge-success" style={{ "backgroundColor": "#2ec4ff" }}>{Math.floor(row.credit)}</span>
            <span class="badge badge-pill badge-warning" style={row.optionCode == "必修" ? ({ "backgroundColor": "#ff5aaa" }) : ({ "backgroundColor": "##ffd92e" })}>{row.optionCode == "必修" ? ("必") : ("選")}</span>
            <span class="badge badge-pill badge-light" >{row.courseKind}</span>
            <br />
            <p>{sp[1]}</p>
        </span>

    )
}


const formatterCodeCredit = (cell, row) => {
    // console.log('cell', cell)
    // console.log('row', row)

    return (
        <span>
            <span class="badge badge-pill badge-success" style={{ "backgroundColor": "#2ec4ff" }}>{Math.floor(row.credit)}</span>
            <span class="badge badge-pill badge-warning" style={row.optionCode == "必修" ? ({ "backgroundColor": "#ff5aaa" }) : ({ "backgroundColor": "##ffd92e" })}>{row.optionCode == "必修" ? ("必") : ("選")}</span>
            <span class="badge badge-pill badge-light" >{row.courseKind}</span>
        </span>
    )
}
const formatterNoDept = (cell, row) => {
    const sp = [row.serialNo, row.v_deptChiabbr]
    const jo = sp.join(`</br >`)
    return (

        <span dangerouslySetInnerHTML={{ __html: jo }}>
        </span>
    )
}
const formatterStfseld = (cell, row) => {
    if (row.v_stfseld >= row.limitCountH) {
        return (<span><span className="badge badge-danger" style={{ fontSize: "0.5em" }}>{row.limitCountH}/{row.v_stfseld}</span> <span className="badge badge-pill badge-info" style={{ fontSize: "0.5em" }}> {row.authorizeP}</span></span>)
    } else if (row.limitCountH - row.v_stfseld < 11) {
        return (<span><span className="badge badge-warning" style={{ fontSize: "0.5em" }}>{row.limitCountH}/{row.v_stfseld}</span> <span className="badge badge-pill badge-info" style={{ fontSize: "0.5em" }}> {row.authorizeP}</span></span>)
    } else {
        return (<span><span className="badge badge-success" style={{ fontSize: "0.5em" }}>{row.limitCountH}/{row.v_stfseld}</span> <span className="badge badge-pill badge-info" style={{ fontSize: "0.5em" }}> {row.authorizeP}</span></span >)
    }

}
const formatterv_class1 = (cell, row) => {
    //'v_class1, courseGroup, formS
    if (row.courseGroup == "") {
        return (
            <span style={{ fontSize: "0.5em" }}>
                <span className="badge badge-danger" style={{ "backgroundColor": "#3bbaff" }}>{row.formS}{row.formS == "" ? ("") : ("年級")}</span>
                <span className="badge badge-pill badge-info" style={{ "backgroundColor": "#ffdb28", "color": "#000000" }}>{row.v_class1}</span>
            </span>)
    } else if (row.v_class1 == "") {
        return (
            <span style={{ fontSize: "0.5em" }}>
                <span className="badge badge-danger" style={{ "backgroundColor": "#3bbaff" }}>{row.formS}{row.formS == "" ? ("") : ("年級")}</span>
                <span className="badge badge-pill badge-info" style={{ "backgroundColor": "#ffdb28", "color": "#000000" }}>{row.courseGroup}</span>
            </span>)
    } else {
        return (
            <span style={{ fontSize: "0.5em" }}>
                <span className="badge badge-danger" style={{ "backgroundColor": "#3bbaff" }}>{row.formS}{row.formS == "" ? ("") : ("年級")}</span>
                <span className="badge badge-pill badge-info" style={{ "backgroundColor": "#ff5375" }}>{row.v_class1}</span>
                <span className="badge badge-pill badge-info" style={{ "backgroundColor": "#ffdb28", "color": "#000000" }}>{row.courseGroup}</span>
            </span>)
    }
}



const DataTable = (prop) => {
    const [state, setState] = useContext(Context);
    const { class_list, heading } = state;
    const [data, setData] = useState(class_list);
    const [likeList, setLikeList] = useState(localStorage.getItem('LikeList') ? JSON.parse(localStorage.getItem('LikeList')) : [])


    useEffect(() => {
        if (class_list[0].like == undefined) {
            console.log("fistTime")
            let tdata = data;
            tdata = tdata.map((item1 => {
                return {
                    ...item1,
                    ['like']: likeList.some((item) => item.serialNo == item1.serialNo)
                }
            }))
            setData([
                ...tdata
            ])

            console.log('dataInite', data)
        }
    }, [])
    const addToLike = (cell, row) => {

        if (!(likeList.some((item) => item.serialNo == row.serialNo))) {
            let cde = likeList
            const likeItem = {
                acadm_year: row.acadmYear,
                acadm_term: row.acadmTerm,
                serial_no: row.serialNo,
                course_code: row.courseCode,
                dept_code: row.deptCode,
                chn_name: row.chnName,
                time_inf: row.timeInfo
            }
            // console.log('likeItem', likeItem)
            cde.push(likeItem)
            setLikeList(cde)

            // console.log('likeListADD', likeList)
            localStorage.setItem('LikeList', JSON.stringify(cde));
            // console.log('likeList', likeList)

        } else {

            setLikeList(abc =>
                abc.filter((li) =>
                    li.serialNo != row.serialNo
                ))
            localStorage.setItem('LikeList', JSON.stringify(likeList));
        }
        console.log('setData', data)

        setData(data => data.map((item => {
            if (item.serialNo == row.serialNo) {
                console.log('item.serialNo', item.serialNo)
                return {
                    ...item,
                    ['like']: !(item.like)
                }
            }
            return item
        }))

        )
    }

    const formatterLike = (cell, row) => {
        console.log('formatterLike', row)

        if (row.like) {
            return <a href='#' onClick={(e) => { e.preventDefault(); addToLike(cell, row) }} style={{ "color": "red", "font-size": "0.8em" }}><i className="fas fa-heart"></i></a>
        } else {
            return <a href='#' onClick={(e) => { e.preventDefault(); addToLike(cell, row) }} style={{ "color": "red", "font-size": "0.8em" }}><i className="far fa-heart"></i></a>
        }
    }

    const columns = [{
        dataField: 'courseCode',
        text: '開課序號 ID',
        sort: true,
        hidden: true
    }, {
        dataField: 'serialNo',
        text: '開課代碼',
        formatter: formatterNoDept,
        sort: true,
        hidden: true
    }, {
        dataField: 'credit',//row.credit, row.optionCode, courseKind
        text: '學分',
        sort: true,
        hidden: true, headerStyle: (colum, colIndex) => {
            return { width: '4em', textAlign: 'center', fontSize: "1em" };
        }
    }, {
        dataField: 'optionCode',//row.credit, row.optionCode, courseKind
        text: '必/選',
        sort: true,
        hidden: true,
        hidden: true, headerStyle: (colum, colIndex) => {
            return { width: '4em', textAlign: 'center', fontSize: "1em" };
        }
        // dataField: 'courseKind',
        // text: '半/全',
        // style: { width: 'auto' },
        // sort: true,
        // hidden: true
    }, {
        dataField: 'formS',
        text: '開課年級',
        style: { width: 'auto' },
        sort: true,
        hidden: true,
        hidden: true,
        headerStyle: (colum, colIndex) => {
            return { width: '5em', textAlign: 'center', fontSize: "1em" };
        }
    }, {
        dataField: 'chnName',
        text: '課程名稱',
        formatter: formatterChnName,
        // style: { width: 'auto !important' },
        headerStyle: (colum, colIndex) => {
            return { width: '6.5em', textAlign: 'center', fontSize: "0.9em" };
        },
        sort: true
    }, {
        dataField: 'engName',
        text: '課程英文名稱',
        formatter: formatterChnName,
        style: { width: 'auto !important' },
        sort: true,
        hidden: true
    }, {
        dataField: 'v_class1',//courseGroup, formS
        text: '開課班級 / 年級 / 組別',
        style: { width: 'auto' },
        formatter: formatterv_class1,
        sort: true,
        headerStyle: (colum, colIndex) => {
            return { width: '6em', textAlign: 'center', fontSize: "0.7em" };
        },
        hidden: true
        // dataField: 'courseGroup',
        // text: '科目組別',
        // style: { width: 'auto' },
        // sort: true,
        // hidden: true
    }, {
        dataField: 'teacher',
        text: '教師',
        style:{ fontSize: "0.8em" },
        headerStyle: (colum, colIndex) => {
            return { width: '4em', textAlign: 'center', fontSize: "0.8em" };
        },
        sort: true
    }, {
        dataField: 'timeInfo',
        text: '時間地點',
        style:{ fontSize: "0.8em" },
        sort: true,
        headerStyle: (colum, colIndex) => {
            return { width: '8em', textAlign: 'center', fontSize: "0.8em" };
        }
    }, {
        dataField: 'limitCountH',
        text: '限修/選課人數 授權',
        sort: true,
        formatter: formatterStfseld,
        headerStyle: (colum, colIndex) => {
            return { width: '6em', textAlign: 'center', fontSize: "0.7em" };
        }
        // formatter: (cell, row) => (<span>{row.limitCountH}/{row.authorizeP}</span>)

        // dataField: 'v_stfseld_deal',
        // text: '已分發人數',
        // style:  {  width: 'auto'},
        // sort: true,
        // hidden: true

        // dataField: 'v_stfseld',//Here
        // text: '選課人數',
        // style:  {  width: 'auto'},
        // formatter: formatterStfseld,
        // sort: true,
        // hidden: true
    }, {
        dataField: 'authorizeP',
        text: '授權碼人數',
        sort: true,
        hidden: true
    }, {
        dataField: 'v_stfseld_undeal',
        text: '未分發人數',
        style: { width: 'auto' },
        sort: true,
        hidden: true
    }, {
        dataField: 'v_limitCourse',
        text: '限修',
        style: { width: 'auto' },
        sort: true,
        hidden: true
    }, {
        dataField: 'v_comment',
        text: '備註',
        style: { width: 'auto' },
        sort: true,
        hidden: true
    }, {
        dataField: 'applyCode',//serial_no
        text: 'Like',
        isDummyField: true,
        // style:  {  width: '10px'},
        formatter: formatterLike,
        sort: false,
        headerStyle: (colum, colIndex) => {
            return { width: '5em', textAlign: 'center', fontSize: "0.8em" };
        },
        style: {
            textAlign: 'center',
        }
    }];

    const expandRow = {

        renderer: (row, rowIndex) => (
            // console.log('rowIndexkkk', rowIndex)
            // <div>{`${row.credit == 2 ? 'This Expand row is belong to rowKey ' : ''}`}</div>
            <div>
                <span>Course Name: </span><a href={`http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/SyllabusCtrl?year=${row.acadmYear}&term=${row.acadmTerm}&courseCode=${row.courseCode}&deptCode=${row.deptCode}`} target="_blank"><strong>{row.engName}</strong></a>
                <br/>
                <a href={`https://www.google.com/search?q=${encodeURI("師大")}+${encodeURI(row.chnName)}+${encodeURI(row.teacher)}`} target="_blank"  ><span classNames="badge badge-success" > GOOGLE~ </span></a>
                <p>{`${row.v_limitCourse == '' ? '' : `限修條件:`}`}</p>
                <p>{`${row.v_limitCourse == '' ? '' : `${row.v_limitCourse}`}`}</p>
                <p>{`${row.v_comment == '' ? '' : `備註: `}`}</p>
                <p>{`${row.v_comment == '' ? '' : `${row.v_comment}`}`}</p>
                <p>{`${row.formS == '' ? '' : `年級:`}`}</p>
                <span className="badge badge-danger" style={{ "backgroundColor": "#3bbaff" }}>{row.formS}{row.formS == "" ? ("") : ("年級")}</span>
                <p>{`${row.v_class1 == '' ? '' : `開課班級:`}`}</p>
                <span className="badge badge-pill badge-info" style={{ "backgroundColor": "#ff5375" }}>{row.v_class1}</span>
                <p>{`${row.courseGroup == '' ? '' : `開課組別:`}`}</p>
                <span className="badge badge-pill badge-info" style={{ "backgroundColor": "#ffdb28", "color": "#000000" }}>{row.courseGroup}</span>
                
            </div>

        ),
        className: (isExpanded, row, rowIndex) => {
            // if (rowIndex > 2) return 'foo';
            return '';
        },
        parentClassName: (isExpanded, row, rowIndex) => {
            if (rowIndex > 2) return 'foo';
            return '';
        },
        // onlyOneExpanding: true,
        expanded: [1, 3],
        // onExpand: (row, isExpand, rowIndex, e) => {
        //     console.log('row', row, 'isExpand', isExpand, 'rowIndex', rowIndex, 'e', e)
        // },
        // expandColumnRenderer: ({ expanded, rowKey, expandable }) => (
        //     console.log('expanded', expanded, 'rowKey', rowKey, 'expandable', expandable)
        // )
    };
    // let ttable = <BootstrapTable keyField='id' data={class_list} columns={columns} />
    // useEffect(() => {
    //     // ttable = <BootstrapTable  keyField='id' data={class_list} columns={columns} />
    //     console.log('Hello')
    //     // effect
    //     // return () => {
    //     //     cleanup
    //     // };
    // }, [class_list])

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        hideSelectColumn: true,
        clickToExpand: true,
        // bgColor: '#00BFFF'
        onSelect: (row, isSelect, rowIndex, e) => {
            console.log('rowIndex', rowIndex)
        }
    };

    const options = {
        custom: true,
        paginationSize: 3,
        pageStartIndex: 1,
        sizePerPage: 8,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        totalSize: class_list.length
    };
    const CustomToggleList = ({
        columns,
        onColumnToggle,
        toggles
    }) => (
            <div className="btn-group btn-group-toggle" data-toggle="buttons">

                <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="far fa-check-circle"></i>
                </button>
                <div className="dropdown-menu" >
                    {/* <button className="dropdown-item" type="button">Action</button> */}
                    {
                        columns
                            .map(column => ({
                                ...column,
                                ['toggle']: toggles[column.dataField]
                            }))
                            .map(column => (
                                <button
                                    type="button"
                                    key={column.dataField}
                                    // ${column.toggle ? 'btn-primary' : 'btn-outline-primary'}
                                    className={`dropdown-item btn ${column.toggle ? 'active btn-outline-warning ' : 'btn-light'}`}
                                    type="button"
                                    data-toggle="button"
                                    aria-pressed={column.toggle ? 'true' : 'false'}
                                    onClick={() => onColumnToggle(column.dataField)}
                                >
                                    {column.text}
                                </button>
                            ))
                    }
                    {/* <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                        <label class="custom-control-label dropdown-item" for="customCheck1">checkbox</label>
                    </div> */}

                </div>
            </div>
        );

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div className="">
            {/* <SizePerPageDropdownStandalone
                {...paginationProps}
            /> */}

            <PaginationListStandalone  {...paginationProps} style={{ 'margin-right': '10px' }} />
            <ToolkitProvider
                keyField="id"
                className='d-flex'
                columns={
                    columns
                }
                data={data} //class_list
                columnToggle
                search
            >
                {
                    toolkitprops => (
                        <div>
                            <CustomToggleList {...toolkitprops.columnToggleProps} />
                            <SearchBar
                                {...toolkitprops.searchProps}
                                className='ml-auto'
                                placeholder="Search..."
                                style={{ 'margin-right': '10px' }}
                            />
                            <BootstrapTable
                                bootstrap4
                                striped
                                // hover
                                expandRow={expandRow}
                                // selectRow={selectRow}
                                {...toolkitprops.baseProps}
                                {...paginationTableProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} className='ml-auto' />
        </div>
    );
    if (class_list === undefined || class_list.length === 0) {
        console.log("class_list", class_list)
        return <Spinner />;
    } else {
        return (
            <>
                {/* <h2>{heading}</h2> */}
                {/* <ColoredLine color="red" /> */}
                {/* <hr style={{
                    color: '#808080',
                    backgroundColor: '#808080',
                    height: .5
                }} /> */}
                <PaginationProvider
                    bootstrap4
                    pagination={
                        paginationFactory(options)
                    }
                >
                    {contentTable}
                </PaginationProvider>
                {/* <BootstrapTable
                    keyField='id'
                    bootstrap4
                    // striped
                    // hover
                    expandRow={expandRow}
                    data={data}
                    columns={columns}
                /> */}
            </ >
        )
    }

}


export default DataTable;