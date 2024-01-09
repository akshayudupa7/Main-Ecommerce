import React from 'react'
import { Box, Typography ,Grid} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
export default function Index({item}:any) {

    console.log(item,'llf')
  return (
    <>
    <Link style={{textDecoration:"none"}} href={`/product/${item._id}`}>
    <Box>
       <Box sx={{position:"relative",width:"100%",marginBottom:2}}>
       <Image src={item.imageUrl} width="150" height={180} alt="this is image"  layout="responsive"/>
       </Box> 
       <Typography sx={{color:"red",textAlign:"center"}}> Name : {item?.name}</Typography>
      <Typography sx={{color:"#fff",fontSize:"15px",textAlign:"center",marginTop:3}}>Price : {item?.price}</Typography>
    </Box>
    </Link>
  
    
    </>
  )
}
