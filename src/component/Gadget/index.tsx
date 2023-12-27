import React from 'react'
import {Box, Stack, Typography } from "@mui/material"
import Link from 'next/link'
import Grid from '@mui/material/Grid';
import Image from 'next/image';


export default function Index() {

  return (
    <div>
     <Box>
      <Stack direction="row">
   
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
           <Image src="https://assets.sangeethamobiles.com/category_img/cat_1665136357-308-cat_1662104456-1-120x120.jpg" width={100} height={100} alt="this is image"/>
           <Typography>Smart Phones</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
        <Image src="https://assets.sangeethamobiles.com/category_img/cat_1669186027-19-lap-icon.jpg" width={100} height={100} alt="this is image"/>
           <Typography>Laptops</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
        <Image src="https://assets.sangeethamobiles.com/category_img/cat_1659158007-3-tv.png" width={100} height={100} alt="this is image"/>
           <Typography>Television</Typography>
      
        </Grid>
        <Grid item xs={12} md={2}>
        <Image src="https://assets.sangeethamobiles.com/category_img/cat_1662115047-5-120x120-accesories.jpg" width={100} height={100} alt="this is image"/>
           <Typography>Accessories</Typography>
      </Grid>
      <Grid item xs={12} md={2}>
      <Image src="https://assets.sangeethamobiles.com/category_img/cat_1662104690-120-120x120-Smartwatch.jpg" width={100} height={100} alt="this is image"/>
           <Typography>Smart Watches</Typography>
      
      </Grid>
      <Grid item xs={12} md={2}>
      <Image src="https://assets.sangeethamobiles.com/category_img/cat_1665640448-8-PC.png" width={100} height={100} alt="this is image"/>
           <Typography>Trimmer</Typography>
      
      </Grid>
      </Grid>
    </Box>
      </Stack>
     </Box>
    </div>
  )
}
