"use client";
import React, { useContext } from 'react'
import {Box, Stack, Typography } from "@mui/material"
import Link from 'next/link'
import { adminNavOptions ,navOptions} from '@/utils'
import { GlobalContext } from '@/context'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'



function Nav({ isAdmin }: { isAdmin: boolean }){
    return(
          <Box>
            <Stack>
                <Box>
                    {
                        isAdmin?(adminNavOptions.map((item,i)=>(
                              <Box key={i}>
                                <li key={item.id}>
                                     <Link href={item.path}>{item.label}</Link>
                                </li>
                            </Box>
                        ))):(
                            navOptions.map((item,i)=>(
                                <Box key={i}>
                                   <li key={item.id}>
                                   <Link href={item.path}>{item.label}</Link>
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

    const {user,setUser,authuser,setAuthUser}=useContext(GlobalContext) || {}
    const onLogout=()=>{
        console.log('sss')
        if(setAuthUser){
            setAuthUser(false)
        }
        if(setUser){
            setUser(null)
        }
        Cookies.remove('token')
        localStorage.clear()
    }
    const pathName=usePathname()
    const isAdmin=pathName.includes('admin-view')
    console.log(isAdmin,'ll')
  const router=useRouter()
  const users={
    role:'admin'
}

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
                    !isAdmin && authuser?(
                       <Box>
                        <Typography><Link href="">Account</Link></Typography>
                        <Typography><Link href="">Cart</Link></Typography>
                       </Box>

                    ):null
                }
             </Box> 
             <Box>
                <Nav isAdmin={isAdmin}/>
             </Box>
             <Box>
                {
                 
                 users && users?.role === 'admin'?(isAdmin?<button  onClick={()=>router.push('/')}>Client View</button>:<button onClick={()=>router.push('/admin-view')}>Admin View</button>):null
                }
             </Box>
             <Box>
                {
                    authuser?<button onClick={onLogout}>Logout</button>:<button  onClick={() => router.push("/login")}>Login</button>
                }
             </Box>
         </Stack>
      </Stack>
     </Box>
    </div>
  )
}
