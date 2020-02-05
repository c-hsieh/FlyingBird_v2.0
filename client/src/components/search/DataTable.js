import React, { useState, useEffect, useContext } from 'react'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone} from 'react-bootstrap-table2-paginator';

import { Context } from '../../context/context'
import Spinner from '../layout/Spinner'



const { SearchBar } = Search;
const formatterChnName = (cell, row) =>{
    console.log('cell', cell)
    console.log('row', row)

    const sp = cell.split('</br >')
    const jo = sp.join(`</br >`)
    return(
        
        <span dangerouslySetInnerHTML={{ __html: jo }}>
        </span>
    )
}

const DataTable = () => {
    const [state, setState] = useContext(Context);
    const { class_list, heading} = state;

    // {
    //     dataField: 'course_code',
    //         text: '開課序號 ID'
    // }, 
    const columns = [{
        dataField: 'serial_no',
        text: '開課代碼',
        sort: true
    }, {
        dataField: 'dept_chiabbr',
        text: '開課單位',
        sort: true
    }, {
        dataField: 'option_code',
        text: '必/選',
        sort: true
    }, {
        dataField: 'credit',
        text: '學分',
        sort: true
    }, {
        dataField: 'chn_name',
        text: '課程名稱',
        formatter: formatterChnName,
        style: { width: 'auto !important'},
        sort: true
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
        sort: true
    }];
    // let ttable = <BootstrapTable keyField='id' data={class_list} columns={columns} />
    useEffect(() => {
        // ttable = <BootstrapTable  keyField='id' data={class_list} columns={columns} />
        console.log('Hello')
        // effect
        // return () => {
        //     cleanup
        // };
    }, [class_list])


    
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
    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div className="">
            {/* <SizePerPageDropdownStandalone
                {...paginationProps}
            /> */}
            <PaginationListStandalone  {...paginationProps} style={{ 'margin-right': '10px' }}/>
            <ToolkitProvider
                keyField="id"
                className='d-flex'
                columns={columns}
                data={class_list}
                search
            >
                {
                    toolkitprops => (
                        <div>
                            <SearchBar
                            {...toolkitprops.searchProps}
                            className='ml-auto'
                            placeholder="Search Something!!!"
                            style={{'margin-right': '10px'}}
                            />
                            <BootstrapTable
                                bootstrap4
                                striped
                                hover
                                {...toolkitprops.baseProps}
                                {...paginationTableProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} className='ml-auto'/>
        </div>
    );
    if (class_list === undefined || class_list.length === 0) {
        console.log("class_list", class_list)
        return <Spinner />;
    }else{
        return (
            <>
                {/* <h2>{heading}</h2> */}
                {/* <ColoredLine color="red" /> */}
                <hr style={{
                    color: '#808080',
                    backgroundColor: '#808080',
                    height: .5
                }} />
                <PaginationProvider
                    bootstrap4
                    pagination={
                        paginationFactory(options)
                    }
                >
                    {contentTable}
                </PaginationProvider>
                {/* <Code>{sourceCode}</Code> */}
            </ >
        )
    }
    
}


export default DataTable;