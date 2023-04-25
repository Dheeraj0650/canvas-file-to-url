import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts(props) {
  function closeAlert(){
    setTimeout(() => {
      props.closeAlert("");
    }, 3000); 
  }
  closeAlert();

  return (
    <div className='input-div'>
        <Stack sx={{width: '35%', marginTop:"1rem"}} spacing={2}>
            <Alert onClose={() => {props.closeAlert("")}} variant="outlined" severity={props.type}>
                {props.alert}
            </Alert>
        </Stack>
    </div>
  );
}