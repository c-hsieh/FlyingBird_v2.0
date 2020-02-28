import React, { useState, useEffect, useContext } from 'react'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone} from 'react-bootstrap-table2-paginator';

import { Context } from "../../flux/store";
import Spinner from '../layout/Spinner'
import { ReactComponent as Logo } from '../layout/google.svg';
import { addLike, deleteLike, getLikes } from "../../flux/actions/likeActions";

// import selectpicker from 'bootstrap-select/dist/js/bootstrap-select'

const { SearchBar } = Search;
const formatterChnName = (cell, row) =>{
    // console.log('cell', cell)
    // console.log('row', row)

    const sp = cell.split('</br>')
    // const jo = sp.join(`</br >`)
    return (
      <span>
        <a
          href={`http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/SyllabusCtrl?year=${row.acadm_year}&term=${row.acadm_term}&courseCode=${row.course_code}&deptCode=${row.dept_code}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {sp[0]}
        </a>
        <br />
        <p>{sp[1]}</p>
      </span>
    );
}

const formatterCodeCredit = (cell, row) => {
    // console.log('cell', cell)
    // console.log('row', row)
    const sp = [row.credit, row.option_code]
    const jo = sp.join(` `)
    return (
        <span dangerouslySetInnerHTML={{ __html: jo }}>
        </span>
    )
}
const formatterNoDept =(cell, row)=>{
    const sp = [row.serial_no, row.dept_chiabbr]
    const jo = sp.join(`</br >`)
    return (

        <span dangerouslySetInnerHTML={{ __html: jo }}>
        </span>
    )
}


const DataTable = () => {
    const { query, dispatch, auth, error, like } = useContext(Context);
    const [state, setState] = query;
    const { class_list, heading} = state;
    const [data, setData] = useState(class_list);
    // const [likeList, setLikeList] = useState(localStorage.getItem('LikeList') ? JSON.parse(localStorage.getItem('LikeList')) : [])
    const [likeList, setLikeList] = useState(like.likes)
    
    
    useEffect(() => {
      if (auth.isAuthenticated === true) {
        if (data[0].like === undefined) {
          // console.log("fistTime")
          let tdata = data;
          tdata = tdata.map(item1 => {
            return {
              ...item1,
              ["like"]: (like.likes).some(
                item => item.serial_no === item1.serial_no
              )
            };
          });
          setData([...tdata]);

          // console.log('dataInite', data)
        }
      }
    }, [auth]);
    const addToLike = (cell, row) => {
      // console.log("like.likes", like.likes);
      // console.log("like.likes type", typeof like.likes);
      console.log(
        "01",
        likeList.some(item => item.serial_no === row.serial_no)
      );
      // console.log("likes111111", like.likes);
      if (!likeList.some(item => item.serial_no === row.serial_no)) {
        // let cde = likeList;
        const likeItem = {
          acadm_year: row.acadm_year,
          acadm_term: row.acadm_term,
          serial_no: row.serial_no,
          course_code: row.course_code,
          dept_code: row.dept_code,
          chn_name: row.chn_name,
          time_inf: row.time_inf,
          isJoin: false
        };
        // console.log("likeItem", likeItem);
        // cde.push(likeItem);
        // setLikeList(cde);

        setLikeList([likeItem, ...likeList]);
        addLike(auth.user.email, likeItem, dispatch, auth);

        // console.log('likeListADD', likeList)
        // localStorage.setItem('LikeList', JSON.stringify(cde));
        // console.log('likeList', likeList)
      } else {
        // setLikeList(abc => abc.filter(li => li.serial_no !== row.serial_no));
        setLikeList(likeList.filter(li => li.serial_no !== row.serial_no));
        console.log("HI  deleteLike");
        deleteLike(auth.user.email, row.serial_no, dispatch, auth);
        // localStorage.setItem('LikeList', JSON.stringify(likeList));
      }
      // console.log('setData', data)
    //   console.log("likes222222", likeList);
      setData(data =>
        data.map(item => {
          if (item.serial_no === row.serial_no) {
            // console.log('item.serial_no', item.serial_no)
            return {
              ...item,
              ["like"]: !item.like
            };
          }
          return item;
        })
      );
    };
    useEffect(() => {
        // console.log("LikeListSETT")
        // console.log(likeList)
        // localStorage.setItem('LikeList', JSON.stringify(likeList));
    }, [data])
    const isMobileDevice = () => {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
 
    const formatterLike = (cell, row) => {
        // console.log('formatterLike', row)
        if (auth.isAuthenticated) {
            if (row.like) {
            return <a href='#' onClick={(e) => { e.preventDefault(); addToLike(cell, row) }} style={{ "color": "red", "fontSize":"0.8em"}}><i className="fas fa-heart"></i></a>
            } else {
                return <a href='#' onClick={(e) => { e.preventDefault(); addToLike(cell, row) }} style={{ "color": "red", "fontSize": "0.8em" }}><i className="far fa-heart"></i></a>
            }
        }else{
            return <p style={{ "fontSize": "0.5em" }}>Please Login...</p>;
        }
        
        
    }
    
    const columns = [{
        dataField: 'course_code',
        text: '開課序號 ID',
        sort: true,
        hidden: true
    }, {
        dataField: 'serial_no',
        text: '開課代碼',
        formatter: formatterNoDept,
        sort: true
    }, {
        dataField: 'option_code',
        text: '學分 必/選',
        formatter: formatterCodeCredit,
        sort: true
    }, {
        dataField: 'chn_name',
        text: '課程名稱',
        formatter: formatterChnName,
        style: { width: 'auto !important'},
        sort: true
    }, {
        dataField: 'eng_name',
        text: '課程英文名稱',
        formatter: formatterChnName,
        style: { width: 'auto !important'},
        sort: true,
        hidden: true
    }, {
        dataField: 'teacher',
        text: '教師',
        sort: true
    }, {
        dataField: 'time_inf',
        text: '時間地點',
        sort: true
    }, {
        dataField: 'limit_count_h',
        text: '限修人數',
        sort: true
    }, {
        dataField: 'authorize_p',
        text: '授權碼人數',
        sort: true
    }, {
        dataField: 'restrict',
        text: '限修',
        style:  {  width: 'auto'},
        sort: true,
        hidden: true
    }, {
        dataField: 'tcode',//serial_no
        text: 'Like',
        isDummyField: true,
        // style:  {  width: '10px'},
        formatter: formatterLike,
        sort: false,
        // `${auth.isAuthenticated} ? ${false} : ${true}`
        hidden: auth.isAuthenticated ? false : true,
        headerStyle: (colum, colIndex) => {
            return { width: '5em', textAlign: 'center', fontSize: "0.8em"};
        },
        style: {
            textAlign: 'center',
        }
    }];

    const expandRow = {
      renderer: (row, rowIndex) => (
        // console.log('rowIndexkkk', rowIndex)
        // <div>{`${row.credit === 2 ? 'This Expand row is belong to rowKey ' : ''}`}</div>
        <div>
          <p>
            {"Google 評價: "}
            <a
              href={`https://www.google.com/search?q=${encodeURI(
                "師大"
              )}+${encodeURI(row.chn_name.split("</br>")[0])}+${encodeURI(
                row.teacher
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <span classNames="badge badge-success" > GOOGLE~ </span> */}
              <Logo
                style={{
                  height: "1.4em",
                  width: "1.4em"
                }}
              />
            </a>
          </p>
          <p className="mt-1">
            <span style={{ "color": "#67d3fa" }}><i className="fab fa-facebook" style={{ "color": "#037FFF", "fontSize": "1.2em" }}></i>選課沒地雷</span>
            <strong style={{ "color": "#faba67" }}>{`[${row.chn_name.split("</br>")[0]}]`}</strong>
            <span style={{ "color": "#67d3fa" }}> 評價: </span>
            <a
              // href={`https://sites.google.com/site/ntnucourse/system/app/pages/search?scope=search-site&q=${encodeURI(row.chn_name.split("</br>")[0])}`}
              // href={`https://www.facebook.com/groups/143704482352660/search/?query=${encodeURI((row.chn_name.split("</br>")[0]).split("（")[0])}`}
              href={isMobileDevice() ? `https://m.facebook.com/groups/search/?groupID=143704482352660&query=${encodeURI((row.chn_name.split("</br>")[0]).split("（")[0])}`
                : `https://www.facebook.com/groups/143704482352660/search/?query=${encodeURI((row.chn_name.split("</br>")[0]).split("（")[0])}`
              }
              // +${encodeURI(row.teacher)}
              target="_blank"
              // onClick={(e) => { e.preventDefault() }}
              style={{ "fontSize": "1.5em","color": "black" }}
            >
              {/* <span classNames="badge badge-success" > GOOGLE~ </span> */}
              <i class="fas fa-bomb"></i>
              {console.log("isMobileDevice", isMobileDevice())}
            </a>
          </p>
          <p className="mt-1 mb-1">
            <span style={{ "color": "#67d3fa" }}><i className="fab fa-facebook" style={{ "color": "#037FFF", "fontSize": "1.2em"}}></i>選課沒地雷</span>
            <strong style={{ "color": "#faba67" }}>{`[${row.teacher}]`}</strong>
            <span style={{ "color": "#67d3fa" }}> 評價: </span>
            <a
              // href={`https://sites.google.com/site/ntnucourse/system/app/pages/search?scope=search-site&q=${encodeURI(row.teacher)}`}
              // href={`https://www.facebook.com/groups/143704482352660/search/?query=${encodeURI(row.teacher)}`}
              href={isMobileDevice() ? `https://m.facebook.com/groups/search/?groupID=143704482352660&query=${encodeURI(row.teacher)}`
                : `https://www.facebook.com/groups/143704482352660/search/?query=${encodeURI(row.teacher)}`
              }
              // +${encodeURI(row.teacher)}
              target="_blank"
              // onClick={(e) => { e.preventDefault() }}
              style={{ "fontSize": "1.5em", "color": "black" }}
            >
              {/* <span classNames="badge badge-success" > GOOGLE~ </span> */}
              <i class="fas fa-bomb"></i>
            </a>
          </p>
          <p>{row.restrict === "" ? "無限修條件" : `限修條件:`}</p>
          <p>{row.restrict === "" ? "" : row.restrict}</p>
        </div>
      ),
      className: (isExpanded, row, rowIndex) => {
        // if (rowIndex > 2) return 'foo';
        return "";
      },
      parentClassName: (isExpanded, row, rowIndex) => {
        if (rowIndex > 2) return "foo";
        return "";
      },
      // onlyOneExpanding: true,
      expanded: [1, 3]
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
            // console.log('rowIndex', rowIndex)
        }
    };
    
    const options = {
        custom: true,
        paginationSize: 4,
        pageStartIndex: 1,
        sizePerPage:11,
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

        <PaginationListStandalone
          {...paginationProps}
          style={{ "margin-right": "10px" }}
        />
        <ToolkitProvider
          keyField="serial_no"
          className="d-flex"
          columns={columns}
          data={data} //class_list
          columnToggle
          search
        >
          {toolkitprops => (
            <div>
              <CustomToggleList {...toolkitprops.columnToggleProps} />
              <SearchBar
                {...toolkitprops.searchProps}
                className="ml-auto"
                placeholder="Search..."
                style={{ "margin-right": "10px" }}
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
          )}
        </ToolkitProvider>
        <PaginationListStandalone {...paginationProps} className="ml-auto" />
      </div>
    );
    if (class_list === undefined || class_list.length === 0) {
        console.log("class_list", class_list)
        return <Spinner />;
    }else{
        return (
          <>
            <div className="mb-3">
              <a
                href="/search"
                // target="button "
                // rel="noopener noreferrer"
                style={{ "fontSize": "1.2em" }}
              >
                <i class="far fa-hand-point-left"></i>
                Go Back to Search
              </a>
            </div>

            {/* <h2>{heading}</h2> */}
            {/* <ColoredLine color="red" /> */}
            {/* <hr style={{
                    color: '#808080',
                    backgroundColor: '#808080',
                    height: .5
                }} /> */}
            <PaginationProvider
              bootstrap4
              pagination={paginationFactory(options)}
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
          </>
        );
    }
    
}


export default DataTable;