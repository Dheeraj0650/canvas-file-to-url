import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

export default function EnhancedTable(props) {
  function handleURLClick(event){
    navigator.clipboard.writeText(event.target.innerText);
    props.setAlertType("success");
    props.setAlert("Copied URL to clipboard");
  };

  const rows = useSelector(state => state.data);

  return (
    <div className='url-table'>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" style={{textAlign:"center", fontSize:"larger"}}>Name</th>
            <th scope="col" style={{textAlign:"center", fontSize:"larger"}}>Folder Id</th>
            <th scope="col" style={{textAlign:"center", fontSize:"larger"}}>URL</th>
          </tr>
        </thead>
          {
            rows.map((row, index) => (
                <tbody className='row-table'>
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{row.display_name}</td>
                    <td>{row.folder_id}</td>
                    {/* <td><a href="row.url">{row.url}</a></td> */}
                    <td><button id="copy-btn" clipboardText={row.url} onClick={handleURLClick}><span class="link">{row.url}</span></button></td>
                  </tr>
                </tbody>
                )
              )
          }
      </table>
    </div>
  );
}
