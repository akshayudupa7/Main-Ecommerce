'use client'
import { Box,Grid ,Paper,Typography} from '@mui/material'
import React from 'react'
import ProductButton from "./ProductButton"
import ProductTile from "./ProductTile"

export default function Index({data}:any) {
  console.log(data,'nnn')
 
  return (
    <div>
      <Box>
      <Grid  container  spacing={2}>
        {
            data && data?.map((item:any)=>(
                   <>
                   
                   {console.log(item.name,'kkkk')}
                   
              
                         <Grid item xs={12}  md={4} sx={{width:'100%'}}>
                         <Box sx={{width:"50%",backgroundColor:"rgb(28,20, 20)"}} >
                         <ProductTile item={item}/>
                     <ProductButton item={item}/>
                         </Box>
                      
                         </Grid>
                   
                   
                   </>
                       
                 
            ))
        }
       </Grid>
  </Box>

    </div>
  )
}
