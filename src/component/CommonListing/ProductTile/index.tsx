import React from 'react'
import { Box, Typography ,Grid} from '@mui/material'
import Image from 'next/image'
export default function Index({item}:any) {

    console.log(item,'llf')
  return (
    <>
     
    <Box>
       <Box sx={{position:"relative",width:"100%"}}>
       <Image src={item.imageUrl} width="150" height={180} alt="this is image"  layout="responsive"/>
       </Box> 

      <Typography sx={{color:"#fff",fontSize:"15px",textAlign:"center",marginTop:3}}>Price : {item?.price}</Typography>
    </Box>
    
    </>
  )
}
