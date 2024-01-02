import { Typography } from '@mui/material';
import React, { ChangeEvent } from 'react';


interface Option {
    id: string;
    label: string;
  }

  interface SelectCompProps {
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options?: Option[];
    label?: string; 
    value:string;
  }

const SelectComp: React.FC<SelectCompProps> =({onChange,label,value,options=[]})=> {
  return (
    <div style={{marginTop:"20px"}}>
        <Typography sx={{color:"#fff",marginBottom:2}}>{label}</Typography>
        <select
        value={value}
        onChange={onChange}
        style={{width:"100%",height:"40px"}}
        >
        {options && options.length ? (
          options.map((optionItem) => (
            <option 
              id={optionItem.id}
              value={optionItem.id}
              key={optionItem.id}
              style={{width:"100%",height:"140px"}}
            >
              {optionItem.label}
            </option>
          ))
        ) : (
          <option id="" value={""}>
            Select
          </option>
        )}
      </select>

    </div>
  )
}

export default SelectComp
