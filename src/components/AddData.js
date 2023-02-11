import React from "react";
import { useEffect, useState } from "react";
import "../Table.css";

const AddData = () => {
  const [addRow, setAddRow] = useState([]);
  const [rowData, setRowData] = useState({
    brand: '',
    transectionType: '',
    totalOrder:'',
    totalOrderValue: '',
    grossMargin: '',
  });

  function onSubmit(){

    fetch('http://localhost:5000/brand-sales-daily', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      rowData
    }).then(a=>{
      return a.json()
    }).then(data=>{
      console.log(data)
    })
  }
    
  function onChange(e,fname){
    e.preventDefault();
    console.log(e)
    setRowData({
      ...rowData,
      [fname]: e.target.value
    })
  }

  function addMultiRow() {
    setAddRow([...addRow, ""]);
  }

  function deleteRow(i) {
    const updatedListData = addRow.filter((ele, id) => {
      return i !== id;
    });
    setAddRow(updatedListData);
  }

  console.log('STATEDATA',rowData)
  return (
    <div>
      <table className="one">
        <tr>
          <th>Sr No</th>
          <th>Brand</th>
          <th>Transection Type</th>
          <th>Total Order</th>
          <th>Total Order Value</th>
          <th>Gross Margin</th>
          <th>Action</th>
        </tr>
        {addRow &&
          addRow.map((i, index) => {
            return (
              <tr>
                <td>1</td>
                <td><input className="inp" placeholder="enter value" name="brand" onChange={(e)=>onChange(e, 'brand')}></input> </td>
                <td>
                  <select name="cars" id="cars" onChange={(e)=>onChange(e, 'transectionType')}>
                    <option value="Trading">Trading</option>
                    <option value="Facilitaion">Facilitation</option>
                  </select>
                </td>
                <td><input className="inp" placeholder="enter value" onChange={(e)=>onChange(e, 'totalOrder')}></input> </td>
                <td><input className="inp" placeholder="enter value" onChange={(e)=>onChange(e, 'totalOrderValue')}></input> </td>
                <td><input className="inp" placeholder="enter value" onChange={(e)=>onChange(e, 'grossMargin')}></input> </td>
                <td>
                  <button onClick={() => deleteRow(i)}>
                    <i class="bi bi-trash">delete</i>
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
      <div className="btn">
        <button onClick={() => addMultiRow()}>Add</button>
      </div><div className="btn">
        <button onClick={() => onSubmit()}>Submit</button>
      </div>
    </div>
  );
};

export default AddData;
