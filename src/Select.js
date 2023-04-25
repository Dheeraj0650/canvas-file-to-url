import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const buttons = [
  <Button key="files">Files</Button>,
  <Button key="folder">Folder</Button>,
];

export default function GroupOrientation(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
        onClick={props.handleSelect}
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}