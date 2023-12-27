'use client'
import { Stack, Typography,Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF,FaInstagram,FaTwitter } from "react-icons/fa";
import { Raleway} from 'next/font/google'

const Ral=Raleway({
    weight:'400'
    ,subsets:['latin']
  
  })

export default function index() {
  return (
    <div  className={Ral.className} style={{width:"100%",backgroundColor:"rgba(0,0,0,1)"}}>

      <Stack direction="row" justifyContent="space-around" sx={{paddingTop:4}}>
        <Stack direction="column">
            <Typography variant="h5" sx={{color:"#fff"}}>About Us</Typography>
            <Typography variant="h6" sx={{fontSize:"14px"}}><Link href="#" style={{color:"#fff",textDecoration:"none"}}>Terms and conditions</Link></Typography>
            <Typography variant="h6" sx={{fontSize:"14px"}}><Link href="#" style={{color:"#fff",textDecoration:"none"}}>Privacy and Policy</Link></Typography>
            <Typography variant="h6" sx={{fontSize:"14px"}}><Link href="#" style={{color:"#fff",textDecoration:"none"}}>Returns and Refunds</Link></Typography>
            <Typography variant="h6" sx={{fontSize:"14px"}}><Link href="#" style={{color:"#fff",textDecoration:"none"}}>Blog</Link></Typography>
        </Stack>
      <Stack>
        <Typography variant="h5" sx={{color:"#fff"}}>Follow Us</Typography>
        <Stack direction="row" gap={3}>
        <Link href="#" style={{color:"#fff",fontSize:20}}><FaFacebookF /></Link>
        <Link href="#"  style={{color:"#fff",fontSize:20}}><FaInstagram /></Link>
        <Link href="#"  style={{color:"#fff",fontSize:20}}><FaTwitter /></Link>
        </Stack>

      </Stack>
      </Stack>
      <Typography sx={{color:"#fff",textAlign:"center"}}>Copyright 2023 © Sangeetha Mobiles. All Rights Reserved.</Typography>
    </div>
  )
}
