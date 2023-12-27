import React from 'react'
import {Box, Stack, Typography } from "@mui/material"
import Link from 'next/link'
import { adminNavOptions ,navOptions} from '@/utils'

const isAuthUser=true
const isAdmin=false
  

const user={
    role:'admin'
}


function Nav(){
    return(
          <Box>
            <Stack>
                <Box>
                    {
                        isAdmin?(adminNavOptions.map((item,i)=>(
                              <Box key={i}>
                                <li key={item.id}>
                                     {item.label}
                                </li>
                            </Box>
                        ))):(
                            navOptions.map((item,i)=>(
                                <Box key={i}>
                                   <li key={item.id}>
                                         {item.label}
                                   </li>
                                    
                                </Box>

                            ))

                        )
                    }
                </Box>
            </Stack>

          </Box>
    )
}
export default function Index() {

  return (
    <div>
     <Box>
      <Stack direction="row">
        <Box>
        <Typography><Link href="/">Electronics</Link></Typography>
        </Box>
        <Box>
           
        </Box>
         <Stack direction="row">
            <Box>
                {
                    !isAdmin && isAuthUser?(
                       <Box>
                        <Typography><Link href="">Account</Link></Typography>
                        <Typography><Link href="">Cart</Link></Typography>
                       </Box>

                    ):null
                }
             </Box> 
             <Box>
                <Nav/>
             </Box>
             <Box>
                {
                    user?.role==='admin'?
                    isAdmin?<button>Client View</button>:<button>Admin View</button>:null
                }
             </Box>
             <Box>
                {
                    isAuthUser?<Link href="">Logout</Link>:<Link href="">Login</Link>
                }
             </Box>
         </Stack>
      </Stack>
     </Box>
    </div>
  )
}
