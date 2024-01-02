'use client'
import { Box,Grid ,Paper,Typography} from '@mui/material'
import React from 'react'
import ProductButton from "./ProductButton"
import ProductTile from "./ProductTile"

export default function Index({data}:any) {
  console.log(data,'nnn')
   const dummy=[
    {
        _id:'3',
        name:"TV Electronics",
        description:"intro our",
        price:97,
        category:'men',
        deliveryInfo:"free",
        onSale:"yes",
        priceDrop:15,
        imageUrl:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    },
    {
        _id:'3',
        name:"TV Electronics",
        description:"intro our",
        price:97,
        category:'men',
        deliveryInfo:"free",
        onSale:"yes",
        priceDrop:15,
        imageUrl:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    },
    {
        _id:'3',
        name:"TV Electronics",
        description:"intro our",
        price:97,
        category:'men',
        deliveryInfo:"free",
        onSale:"yes",
        priceDrop:15,
        imageUrl:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    },
    {
        _id:'3',
        name:"TV Electronics",
        description:"intro our",
        price:97,
        category:'men',
        deliveryInfo:"free",
        onSale:"yes",
        priceDrop:15,
        imageUrl:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    }
   ]
  return (
    <div>
      <Box>
      <Grid  container  spacing={2}>
        {
            data && data?.map((item:any)=>(
                   <>
                   
                   {console.log(item.name,'kkkk')}
                   
                    <Typography sx={{color:"red"}}>{item?.name}</Typography>
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
