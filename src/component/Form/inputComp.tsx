import React from 'react'
import {Box,Typography} from "@mui/material"

interface InputCompProps {
    type?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    label?: string;
  }
  
const InputComp:React.FC<InputCompProps>=({type,placeholder,onChange,value,label})=> {
  return (
    <div style={{marginTop:"20px"}}>
       <Typography sx={{color:"#fff"}}>{label}</Typography>
       <Box sx={{marginTop:"10px"}}>
        <input
        style={{padding:"5px",border: "3px solid rgb(172, 172, 172)",width:"100%",height:"30px",borderRadius:"4px"}}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={onChange}
        value={value}/>
       </Box>

    </div>
  )
}

export default InputComp