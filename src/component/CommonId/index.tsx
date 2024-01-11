import React,{useEffect, useState} from 'react'
import { Box ,Grid,Typography,Stack} from '@mui/material'
import Image from 'next/image'


interface Product {
  imageUrl: string;
  name: string;
  price: number;
  deliveryInfo: string;
  description: string;
  // ... other properties
}

interface PageProps {
  item: Product;
}
const Page: React.FC<PageProps> = ({ item }) =>  {

  return (
    <div>
      <Box sx={{paddingTop:"50px",paddingBottom:"50px"}}>
    
     
       <Grid container gap={4} >
         <Grid item xs={10} md={3} >
          <Box sx={{width:"100%"}}>
          <Image src={item.imageUrl} width={100} height={200} alt="this is image" layout="responsive"/>
          </Box>
       
         </Grid>
         <Grid item xs={12} md={7} >
            <Box>
              <Typography variant="h6" sx={{color:"white",fontWeight:"bold",fontSize:"24px"}}>{item.name}</Typography>

              <Stack direction="row">
                 <Typography sx={{color:"red",fontWeight:"bold",fontSize:"16px",marginTop:2}}>Starting from price {item.price}</Typography>
              
              </Stack>
               <Typography sx={{color:"white",fontWeight:"bold",fontSize:"14px",marginTop:2}}>Delivery : {item.deliveryInfo}</Typography>
              <Box>
                <Typography sx={{color:"red",fontWeight:"bold",fontSize:"20px",marginTop:2}}>Description</Typography>
                <Typography  sx={{color:"white",fontSize:"14px",lineHeight:"28px"}}>{item.description}</Typography>
              </Box>
            </Box>
          </Grid>
       </Grid>
      </Box>

    </div>
  )
}
export default Page