'use client'
import React from 'react'
import { Grid ,Typography,Box} from '@mui/material'
import Image from 'next/image'


export default function Index() {
  return (
    <div style={{paddingTop:"100px",paddingBottom:"100px",margin:"auto"}}>
        <Typography variant="h4" sx={{textAlign:'center',marginBottom:"50px",color:"#fff"}}>Smart Living for you</Typography>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Image src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1675417962_71.jpg" alt="this is image" width={300} height={300}/>
          <Typography variant='h6' sx={{color:"#fff",fontSize:"16px",marginTop:2}}>Air purifiers, Lamps and more....</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
        <Image src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1675750634_92.jpg" alt="this is image" width={300} height={300}/>
          <Typography variant='h6' sx={{color:"#fff",fontSize:"16px",marginTop:2}}>Dashcam, Car Chargers and more...</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
        <Image src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1675750599_95.jpg" alt="this is image" width={300} height={300}/>
          <Typography variant='h6' sx={{color:"#fff",fontSize:"16px",marginTop:2}}>Trimmers, Dryers and more .....</Typography>
        </Grid>
   
      </Grid>
    </Box>
 
    </div>
  )
}


/*   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Image src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1675417962_71.jpg" alt="this is image" width={300} height={300}/>
          <Typography variant='h3'>Air purifiers, Lamps and more....</Typography>
        </Grid>
        <Grid item xs={4}>
        <Image src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1675750634_92.jpg" alt="this is image" width={300} height={300}/>
          <Typography variant='h3'>Dashcam, Car Chargers and more...</Typography>
        </Grid>
        <Grid item xs={4}>
        <Image src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1675750599_95.jpg" alt="this is image" width={300} height={300}/>
          <Typography variant='h3'>Trimmers, Dryers and more .....</Typography>
        </Grid>
   
      </Grid>
    </Box>*/