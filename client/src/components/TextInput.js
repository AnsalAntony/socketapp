import React, {  } from "react";
import { TextField } from '@mui/material';


const TextInput = ({onChange,value,placeholder,label,inputStyle}) => {

  return (
      <TextField
      style={inputStyle}
      variant="outlined"
      label={label}
      placeholder= {placeholder}
      value={value}
      onChange={onChange}
      />
  );
};

export default TextInput;
