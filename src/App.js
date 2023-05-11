// import './App.css';
import Table from './Table.js'
import Input from './Input.js'
import Select from './Select.js'
import Alert from './Alert.js'
import React, { useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Loader from './Loader.js'

function App() {

  var dispatch = useDispatch();

  var [select, setSelect] = useState("FOLDER");
  var [alert, setAlert] = useState("");
  var [alertType, setAlertType] = useState("");

  var [loader, setLoader] = useState(false);

  var [courseId, setCourseId] = useState("");
  var [folderId, setFolderId] = useState("");
  var [folderName, setFolderName] = useState("");


  function handleSelect(event, value){
    setAlertType("success");
    setAlert("Selected search type " + event.target.innerText);
    setSelect(event.target.innerText);
  }

  function handleCourseId(event, value){
    console.log(event.target.value);
    setCourseId(event.target.value);
  }

  function handleFolderId(event, value){
    console.log(event.target.value);
    setFolderId(event.target.value);
  }

  function handleFolderName(event, value){
    console.log(event.target.value);
    setFolderName(event.target.value);
  }

  function isInteger(str) {
    return /^-?\d+$/.test(str);
  }

  function handleSearchClick(){
    var data = {};
    if(select === "FILES"){
      if(courseId === "" || folderId === ""){
        setAlertType("error");
        setAlert("Please enter all the details");
        return;
      }
      else if(!isInteger(courseId) && !isInteger(folderId)){
        setAlertType("error");
        setAlert("Please enter valid values");
        return;
      }
      data = {
        courseId: courseId,
        folderId: folderId,
        method: 'file'
      }
    }
    else {
      if(courseId === "" || folderName === ""){
        setAlertType("error");
        setAlert("Please enter all the details");
        return;
      }
      else if(!isInteger(courseId) && !isInteger(folderName)){
        setAlertType("error");
        setAlert("Please enter valid values");
        return;
      }
      data = {
        courseId: courseId,
        folderName: folderName,
        method: 'folder'
      }
    }

    setLoader(true);

    axios({
      method:'post',
      url:`https://hhlijs69gc.execute-api.us-east-1.amazonaws.com/default/getData`,
      data: data,
    })
    .then(response => {
      // handle success
      console.log(response.data);
      dispatch({
        type: 'add',
        data: response.data
      });
      setLoader(false);
    })
    .catch(error => {
      // handle error
      console.log(error.message);
      setLoader(false);
      setAlertType("error");
      setAlert(error.message);
    });
  }

  return (
    <div className="container-fluid main-page">
        {alert !== "" && <Alert alert={alert} type={alertType} closeAlert={setAlert}/>}
        <div className='container-fluid input-div'>
          <Select handleSelect={handleSelect}/>

          {select === "FOLDER" && 
              <>
                <Input name = "Course Id" handleEvent = {handleCourseId}/>
                <Input name = "Folder Name" handleEvent = {handleFolderName}/>
              </>
          }

          {select === "FILES" && 
              <>
                <Input name = "Course Id" handleEvent = {handleCourseId}/>
                <Input name = "Root Folder Id" handleEvent = {handleFolderId}/>
              </>
          }

          <button type="button" class="btn btn-outline-primary" style = {{marginLeft:"1rem"}} onClick={handleSearchClick}><i className="fa-brands fa-searchengin fa-2x"></i></button>
          {loader && <Loader />}
        </div>
        <Table setAlert={setAlert} setAlertType={setAlertType}/>
    </div>
  );
}

export default App;
