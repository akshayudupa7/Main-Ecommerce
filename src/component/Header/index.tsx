"use client";
import React, { useContext } from "react";
import { Box, Stack, Typography,Hidden} from "@mui/material";
import Link from "next/link";
import { adminNavOptions, navOptions } from "@/utils";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import Accord_A from "../Accordin";
function Nav({ isAdmin }: { isAdmin: boolean }) {
  return (
 
    <Box>
      <Stack direction="row">
        <Box  sx={{display:"flex"}}>
          {isAdmin
            ? adminNavOptions.map((item, i) => (
                <Box key={i}>
            
                    <Link  key={item.id} href={item.path} style={{color:"#fff",textDecoration:"none !important",marginRight:"30px"}}>{item.label}</Link>
                 
                </Box>
              ))
            : navOptions.map((item, i) => (
                <Stack key={i} direction="row">
                    <Link key={item.id}  href={item.path} style={{color:"#fff",textDecoration:"none !important",marginRight:"30px"}}>{item.label}</Link> 
                </Stack>
              ))}
        </Box>
      </Stack>
    </Box>
  );
}
export default function Index() {
  const { user, setUser, authuser, setAuthUser } =
    useContext(GlobalContext) || {};
  const onLogout = () => {
    console.log("sss");
    if (setAuthUser) {
      setAuthUser(false);
    }
    if (setUser) {
      setUser(null);
    }
    Cookies.remove("token");
    localStorage.clear();
  };
  const pathName = usePathname();
  const isAdmin = pathName.includes("admin-view");
  console.log(isAdmin, "ll");
  const router = useRouter();
  const users = {
    role: "admin",
  };

  return (
    <div style={{ backgroundColor: "black"}}>
         <Hidden mdDown>
      <Box sx={{paddingTop:"30px",width:"90%",margin:"auto",paddingBottom:4}}>
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{borderRadius:"20%"}}>
            <Link href="/"   style={{color:"#fff",fontSize:"26px",textDecoration:"none"}}>
             Ecommerce
            </Link>
          </Box>
         
          <Box>
              <Nav isAdmin={isAdmin} />
            </Box>
          <Stack direction="row" gap={2} justifyContent="space-between">
            <Box  >
              {!isAdmin && authuser ? (
                <Box sx={{display:"flex",gap:1}}>
                  <Typography>
                    <Link href="/account" style={{color:"#fff",fontSize:"30px"}}><MdAccountCircle /></Link>
                  </Typography>
                  <Typography>
                    <Link href="/cart"  style={{color:"#fff",fontSize:"30px"}}><FaShoppingCart /></Link>
                  </Typography>
                </Box>
              ) : null}
            </Box>
          
            <Box>
              {users && users?.role === "admin" ? (
                isAdmin ? (
                  <button style={{width:"100%",height:"20px",outline:"none",border:"none",color:"#000",fontWeight:"bold",background: `linear-gradient(to right, rgb(248, 187, 90) 0%, rgb(246, 215, 165) 25%, rgb(250, 222, 176) 45%, rgb(248, 187, 90) 100%)`}}  onClick={() => router.push("/")}>Client</button>
                ) : (
                  <button style={{width:"100%",height:"20px",outline:"none",border:"none",color:"#000",fontWeight:"bold",background: `linear-gradient(to right, rgb(248, 187, 90) 0%, rgb(246, 215, 165) 25%, rgb(250, 222, 176) 45%, rgb(248, 187, 90) 100%)`}}   onClick={() => router.push("/admin-view")}>
                    Admin 
                  </button>
                )
              ) : null}
            </Box>
            <Box>
              {authuser ? (
                <button onClick={onLogout} style={{}}><IoMdLogOut /></button>
              ) : (
                <button onClick={() => router.push("/login")} ><IoMdLogIn/></button>
              )}
            </Box>
          </Stack>
       
        </Stack>
     
      </Box>
      </Hidden>
      <Hidden mdUp>
          <Accord_A>
       
          </Accord_A>
      </Hidden>
    </div>
    
  );
}
