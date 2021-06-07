import React from 'react';
import '../App.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import  {useState , useEffect } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {Line} from 'react-chartjs-2';

function History() {

    const [Symbols ,setSymbols] = useState([]);
    const [Selection ,SetSelection] = useState("A");
    const [Entryitem ,SetEntryitem] = useState([]);
    const [SelectedDate ,SetSelectedDate] = useState("");
    const [ChartData,SetChartData] = useState({});
    const [Dates,SetDates] = useState([])
    const [Closing,SetClosing] = useState([])
    //const [DataLoaded ,SetDataLoaded] = useState(false);

    function  GetHistBySymbol(){
        var tempdate  = []
        var tempclosing=[]
        fetch(`http://131.181.190.87:3001/history?symbol=${Selection}`)
          .then(res => res.json())
          .then(data => data)
          .then(data =>
            data.map(item => {
            item.timestamp = item.timestamp.substring(0,10);
            tempdate.push(parseInt(item.timestamp))
            tempclosing.push(parseFloat(item.close))

            return {
                date : item.timestamp,
                open : item.open,
                high : item.high,
                low : item.low,
                close : item.close,
                volumes : item.volumes
              }
              
            })
          )   
          .then(symbols => SetEntryitem(symbols));
          tempdate = tempdate.reverse();
          tempclosing =tempclosing.reverse();
          SetDates(tempdate);
          SetClosing(tempclosing);
    };

    function GetPriceTable(){
        const columns  = [
    
            {headerName: "Date" , field:"date" , sortable : true , filter : true, resizable: true,width:130},
            {headerName: "Opening Price" , field:"open", sortable : true, filter : true, resizable: true,width:120},
            {headerName: "Highest  Price" , field:"high", sortable : true, filter : true, resizable: true,width:120},
            {headerName: "Lowest Price" , field:"low", sortable : true, filter : true, resizable: true,width:120},
            {headerName: "Closing Price" , field:"close", sortable : true, filter : true, resizable: true,width:120},
            {headerName: "Volumes " , field:"volumes", sortable : true, filter : true, resizable: true,width:120},
          ];


        return (<div className="ag-theme-balham"
      style={{
        height:"347px",
        width: "732px",
        paddingLeft: "31%",          
      }}
        >
        <AgGridReact 
        columnDefs= {columns}
        rowData={Entryitem}
        pagination = {true}
        paginationPageSize={10}
        />  
    </div>)
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
              }
            })
          )
          .then(items => setSymbols(items))
      }, []);

    useEffect(()=>{
        GetHistBySymbol();
    },[Selection]);

    useEffect(()=>{
        //console.log(Closing)
        SetChartData({
            labels:Dates,
            datasets: [
                {
                    label:'DATES',
                    data:Closing,
                    borderWidth:3
                }
            ]

        }) 
        
    },[Selection,Entryitem]);

    useEffect(()=>{
      console.log(SelectedDate)
      var date=toString(SelectedDate)
      date = date.substring(4,15)
      console.log(date)
  },[SelectedDate]);

  return (
    <div className="App">
      <h1>HISTORY PAGE</h1>
      <h4>Selecct From the below Drop-Down list to view different Stock</h4>
      <select  onChange={val => SetSelection(val.target.value)} >
        {
            Symbols.map(x=>
            <option key={x.name} value={x.symbol}>{x.symbol} ---  {x.name}</option>)
        }
      </select>       
      <div>
      <p>Please Select Date From the Date picker</p>
        {/* <input type="date" id="datepicker" onChange={GetDate()}/> */}
      <DatePicker placeholderText="SELECT DATE HERE" 
      selected={SelectedDate} 
      onChange={date => SetSelectedDate(date)}
      dateFormat = 'yyyy-MM-dd' 
      />
      </div>
      <p>Showing Stocks For {Selection} </p>
      <GetPriceTable/>
      <p></p>
      <div style={{ width:"732px",height:"1000px",paddingLeft:"31%"}} >
            <Line data={ChartData} options ={{
                responsive:true, 
                title:{text:"CLOSING PRICE CHART",display:true},
                scales:{
                    yAxes:[{
                        scaleLabel: {
                          display: true,
                          labelString: 'Closing Prices (in $)'
                        }
                      }],
                      xAxes:[{
                        scaleLabel: {
                          display: true,
                          labelString: 'DATES'
                        }
                      }]
                }
            }}/>
      </div>
      {console.log(SelectedDate)}
    </div>
  );
}

export default History;
