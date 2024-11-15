"use client"
import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Search } from 'lucide-react';

function ListTable({ data, colDef, title }) {

    const [rowData, setRowData] = useState(data);
    const [searchInput, setSearchInput] = useState();

    const gridOptions = {
        getRowHeight: () => 51,
    };
    return (
        <div className='p-7'>
            <h2 className='font-bold text-2xl'>{title}</h2>
            <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm my-7'>
                <Search />
                <input type='text' placeholder='Search...' className='outline-none w-full' onChange={(event) => setSearchInput(event.target.value)} />
            </div>
            <div
                className="ag-theme-quartz"
                style={{ maxHeight: '500px', overflowY: 'auto' }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDef}
                    quickFilterText={searchInput}
                    domLayout="autoHeight"
                    gridOptions={gridOptions}
                />
            </div>
        </div>
    )
}

export default ListTable
