import React from 'react';
import './App.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import  {useState , useEffect } from 'react';
import {Link} from 'react-router-dom';

function All_stocks() {
  

  const [rawData ,setRawData] = useState([]);
  const [keydata ,setKeydata] = useState([]);
  const [symbol_key ,setsymbol_key] = useState("");
  const [IndKey ,setIndKey] = useState("");

  const columns = [
    
    {headerName: "Stock Symbol" , field:"symbol" , sortable : true , filter : true},
    {headerName: "Company Name" , field:"name", sortable : true, filter : true},
    {headerName: "Industry" , field:"industry", sortable : true, filter : true},
  ];

  function GetTable(){
      if(keydata.length===0 && 
        symbol_key==="" &&
        IndKey===""){
      return (<div className="ag-theme-balham"
      style={{
        height:"347px",
        width: "602px",
        paddingLeft: "33%"          
      }}
      
      >
       
       <AgGridReact 
        columnDefs= {columns}
        
        rowData={rawData}
        pagination = {true}
        paginationPageSize={10}
      />  
     </div>)  
      }
    
    else
    {
    return (<div className="ag-theme-balham"
        style={{
          height:"347px",
          width: "602px",
          paddingLeft: "33%"          
        }}
        > 
         <AgGridReact 
          columnDefs= {columns}
          rowData={keydata}
          pagination = {true}
          paginationPageSize={10}
        />  
       </div>)
    }
  }

  function SearchSymbol(){
    document.getElementById('Ind_search_textbox').value=""
    const result = rawData.map((a)=>{
      if(a.symbol.toUpperCase().includes(symbol_key.toUpperCase())){
        return a
      }
      return null
    }
    )
    var filtered = result.filter(function (el) {
      return el != null;
    });
    
    result.filter(item => item);
    setKeydata(filtered)
  }

  function SearchIndustry(){
    document.getElementById('Symb_search_textbox').value=""
    const result = rawData.map((a)=>{
      if(a.industry.toUpperCase().includes(IndKey.toUpperCase())){
        return a
      }
      return null
    }
    )
    var filtered = result.filter(function (el) {
      return el != null;
    });
    result.filter(item => item);
    setKeydata(filtered)
  };

  useEffect(() => {
    fetch("http://131.181.190.87:3001/all")
      .then(res => res.json())
      .then(data => data)
      .then(data =>
        data.map(stock => {
          return {
            symbol: stock.symbol,
            name: stock.name,
            industry: stock.industry,
          };
        })
      )
      .then(stocks => setRawData(stocks))
      
  }, []);

  useEffect(()=>{
    SearchSymbol();
    
  },[symbol_key]);

  useEffect(()=>{
    SearchIndustry();
  },[IndKey]);

  return (
    <div className="App">
      <h1>VIEW ALL STOCKS PAGE</h1>
      <p>Start typing the value in the Textbox</p><p> to reflect the changes in the table</p>
      <p>----------------------------</p>
        <div></div>
        <p>Search by Stock Symbol: </p>
        <input type="text" id="Symb_search_textbox" onChange={val => setsymbol_key(val.target.value)} placeholder="eg. AAPL"/> 

        <p>Search by Indusry Type: </p>
        <input type="text" id="Ind_search_textbox" onChange={val => setIndKey(val.target.value)} placeholder="eg. Health Care"/> 
        <p/>

        <GetTable/> 

        {/* <Link to="./">HOME</Link> */}
    </div>
  );
}
export default All_stocks;
