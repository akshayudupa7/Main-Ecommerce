import React from 'react'
import {Box, Stack, Typography } from "@mui/material"
import Link from 'next/link'
import Grid from '@mui/material/Grid';
import Image from 'next/image';


export default function Index() {

  return (
    <div  style={{paddingTop:"80px",width:"90%",margin:"auto"}}>
     <Box>
      <Stack direction="row">
   
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={2} justifyContent="center" alignItems="center">
           <Image src="https://assets.sangeethamobiles.com/category_img/cat_1665136357-308-cat_1662104456-1-120x120.jpg" width={100} height={100} alt="this is image"/>
           <Typography variant='h6' sx={{fontSize:"15px",color:"#fff",marginTop:2}}>Smart Phones</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
        <Image src="https://assets.sangeethamobiles.com/category_img/cat_1669186027-19-lap-icon.jpg" width={100} height={100} alt="this is image"/>
           <Typography variant='h6' sx={{fontSize:"15px",color:"#fff",marginTop:2}}>Laptops</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
        <Image src="https://assets.sangeethamobiles.com/category_img/cat_1659158007-3-tv.png" width={100} height={100} alt="this is image"/>
           <Typography variant='h6' sx={{fontSize:"15px",color:"#fff",marginTop:2}}>Television</Typography>
      
        </Grid>
        <Grid item xs={12} md={2}>
        <Image src="https://assets.sangeethamobiles.com/category_img/cat_1662115047-5-120x120-accesories.jpg" width={100} height={100} alt="this is image"/>
           <Typography variant='h6' sx={{fontSize:"15px",color:"#fff",marginTop:2}}>Accessories</Typography>
      </Grid>
      <Grid item xs={12} md={2}>
      <Image src="https://assets.sangeethamobiles.com/category_img/cat_1662104690-120-120x120-Smartwatch.jpg" width={100} height={100} alt="this is image"/>
           <Typography variant='h6' sx={{fontSize:"15px",color:"#fff",marginTop:2}}>Smart Watches</Typography>
      
      </Grid>
      <Grid item xs={12} md={2}>
      <Image src="https://assets.sangeethamobiles.com/category_img/cat_1665640448-8-PC.png" width={100} height={100} alt="this is image"/>
           <Typography variant='h6' sx={{fontSize:"15px",color:"#fff",marginTop:2}}>Trimmer</Typography>
      
      </Grid>
      </Grid>
    </Box>
      </Stack>
     </Box>
    </div>
  )
}